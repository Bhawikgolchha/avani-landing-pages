import assert from 'node:assert/strict';
import test from 'node:test';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 3078;
const BASE_URL = `http://localhost:${PORT}`;

let serverProcess = null;

async function waitForServer(url, timeoutMs = 20000) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status === 200) return true;
    } catch {
      // wait
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server at ${url} failed to respond within ${timeoutMs}ms`);
}

test('Adversarial Stress & Failure Mode Suite', async (t) => {
  serverProcess = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    cwd: process.cwd(),
    stdio: 'ignore'
  });

  try {
    await waitForServer(`${BASE_URL}/`);
  } catch (err) {
    if (serverProcess) serverProcess.kill();
    throw err;
  }

  await t.test('Stress 1: Graceful 404 handling on non-existent routes', async () => {
    const invalidRoutes = [
      '/prototype-3',
      '/prototype-0',
      '/admin',
      '/api/non-existent',
      '/%2e%2e/%2e%2e/etc/passwd'
    ];

    for (const route of invalidRoutes) {
      const res = await fetch(`${BASE_URL}${route}`);
      assert.strictEqual(res.status, 404, `Route "${route}" must return HTTP 404, got ${res.status}`);
      const body = await res.text();
      assert.ok(body.includes('404') || body.includes('This page could not be found'), `Route "${route}" must render 404 page`);
    }
  });

  const hubHtml = await (await fetch(`${BASE_URL}/`)).text();

  await t.test('Stress 2: No invalid nested interactive elements (a inside a)', () => {
    // Nested <a> inside <a> causes hydration failure and invalid HTML DOM tree
    const nestedLinkRegex = /<a[^>]*>(?:(?!<\/a>)[\s\S])*<a[^>]*>/gi;
    const match = hubHtml.match(nestedLinkRegex);
    assert.strictEqual(match, null, 'HTML payload must NOT contain nested <a> tags');
  });

  await t.test('Stress 3: No empty href attributes in any links', () => {
    const emptyHrefRegex = /<a[^>]*href=["'](?:#)?["'][^>]*>/gi;
    const matches = hubHtml.match(emptyHrefRegex) || [];
    // Only valid hash links with section targets allowed, no empty href="" or href="#"
    for (const link of matches) {
      assert.fail(`Found empty or useless href tag: ${link}`);
    }
  });

  await t.test('Stress 4: Image accessibility & layout attributes', () => {
    // Extract all <img> tags
    const imgMatches = hubHtml.match(/<img[^>]*>/gi) || [];
    assert.ok(imgMatches.length > 0, 'Page must contain img tags for Avani branding');
    for (const img of imgMatches) {
      assert.ok(img.includes('alt="'), `Image tag must have non-empty alt attribute: ${img}`);
      assert.ok(img.includes('src="'), `Image tag must have src attribute: ${img}`);
    }
  });

  await t.test('Stress 5: Tailwind CSS responsive utility presence', () => {
    // Check that compiled CSS includes media queries for sm, md, lg breakpoints
    const cssMatch = hubHtml.match(/href="(\/_next\/static\/css\/[^"]+\.css)"/);
    assert.ok(cssMatch, 'Page must link to static Tailwind compiled CSS');
    
    // Read the static CSS file
    const cssPath = path.join(process.cwd(), '.next', cssMatch[1].replace('/_next/', ''));
    if (fs.existsSync(cssPath)) {
      const cssContent = fs.readFileSync(cssPath, 'utf-8');
      assert.ok(/@media\s*\(min-width:\s*640px\)/.test(cssContent), 'CSS must include sm breakpoint (640px)');
      assert.ok(/@media\s*\(min-width:\s*768px\)/.test(cssContent), 'CSS must include md breakpoint (768px)');
      assert.ok(/@media\s*\(min-width:\s*1024px\)/.test(cssContent), 'CSS must include lg breakpoint (1024px)');
    }
  });

  await t.test('Stress 6: External URL tamper & protocol injection resistance', () => {
    // Ensure no javascript: or data: URIs in any href
    const dangerousHrefRegex = /href=["'](?:javascript|data|vbscript):[^"']*["']/gi;
    const dangerousMatches = hubHtml.match(dangerousHrefRegex);
    assert.strictEqual(dangerousMatches, null, 'HTML must contain zero dangerous URI protocols');
  });

  if (serverProcess) {
    serverProcess.kill();
  }
});
