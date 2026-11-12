import assert from 'node:assert/strict';
import test from 'node:test';
import { spawn } from 'node:child_process';
import { 
  AVANI_OBJECTIVES, 
  AVANI_TEAMS, 
  AVANI_EVENTS, 
  CLIMATE_TIPS, 
  EXTERNAL_LINKS,
  AVANI_ORGANIZATION
} from '../../src/lib/avaniContent.ts';

const PORT = 3077;
const BASE_URL = `http://localhost:${PORT}`;

let serverProcess = null;

function htmlContains(html, text) {
  if (html.includes(text)) return true;
  // Replace & with &amp; FIRST, then replace apostrophes so &#x27; does not get mutated
  const withAmp = text.replace(/&/g, '&amp;');
  if (html.includes(withAmp)) return true;

  const withApos1 = text.replace(/&/g, '&amp;').replace(/'/g, '&#x27;');
  if (html.includes(withApos1)) return true;

  const withApos2 = text.replace(/&/g, '&amp;').replace(/'/g, '&apos;');
  if (html.includes(withApos2)) return true;

  return false;
}

// Helper to wait for port readiness
async function waitForServer(url, timeoutMs = 20000) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status === 200) return true;
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server at ${url} failed to become ready within ${timeoutMs}ms`);
}

test('DOM & Routing Oracle: Complete Suite', async (t) => {
  // Setup: spawn next start on port 3077
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

  await t.test('1. HTTP 200 and Content-Type on all three routes', async () => {
    const routes = ['/', '/prototype-1', '/prototype-2'];
    for (const route of routes) {
      const res = await fetch(`${BASE_URL}${route}`);
      assert.strictEqual(res.status, 200, `Route ${route} must return HTTP 200`);
      const contentType = res.headers.get('content-type') || '';
      assert.ok(contentType.includes('text/html'), `Route ${route} must return text/html`);
    }
  });

  const hubHtml = await (await fetch(`${BASE_URL}/`)).text();
  const p1Html = await (await fetch(`${BASE_URL}/prototype-1`)).text();
  const p2Html = await (await fetch(`${BASE_URL}/prototype-2`)).text();

  await t.test('2. DOM Hub (/): Verify all 5 Objectives verbatim and metrics', () => {
    assert.strictEqual(AVANI_OBJECTIVES.length, 5);
    for (const obj of AVANI_OBJECTIVES) {
      assert.ok(htmlContains(hubHtml, obj.title), `Hub DOM must contain objective title: "${obj.title}"`);
      assert.ok(htmlContains(hubHtml, obj.verbatimCopy), `Hub DOM must contain verbatim copy for "${obj.title}"`);
      if (obj.metric) {
        assert.ok(htmlContains(hubHtml, obj.metric), `Hub DOM must contain objective metric: "${obj.metric}"`);
      }
    }
  });

  await t.test('3. DOM Hub (/): Verify all 5 Specialized Teams, descriptions, and tags', () => {
    assert.strictEqual(AVANI_TEAMS.length, 5);
    for (const team of AVANI_TEAMS) {
      assert.ok(htmlContains(hubHtml, team.name), `Hub DOM must contain team name: "${team.name}"`);
      assert.ok(htmlContains(hubHtml, team.tag), `Hub DOM must contain team tag: "${team.tag}"`);
      assert.ok(htmlContains(hubHtml, team.keyFocus), `Hub DOM must contain team keyFocus: "${team.keyFocus}"`);
      assert.ok(htmlContains(hubHtml, team.role), `Hub DOM must contain team role: "${team.role}"`);
      assert.ok(htmlContains(hubHtml, team.description), `Hub DOM must contain team description for "${team.name}"`);
    }
  });

  await t.test('4. DOM Hub (/): Verify all 4 Flagship Events, verbatim copy, locations, and metrics', () => {
    assert.strictEqual(AVANI_EVENTS.length, 4);
    for (const ev of AVANI_EVENTS) {
      assert.ok(htmlContains(hubHtml, ev.title), `Hub DOM must contain event title: "${ev.title}"`);
      assert.ok(htmlContains(hubHtml, ev.location), `Hub DOM must contain event location: "${ev.location}"`);
      assert.ok(htmlContains(hubHtml, ev.timeframe), `Hub DOM must contain event timeframe: "${ev.timeframe}"`);
      assert.ok(htmlContains(hubHtml, ev.verbatimCopy), `Hub DOM must contain event verbatim copy for "${ev.title}"`);
      if (ev.metrics) {
        for (const m of ev.metrics) {
          assert.ok(htmlContains(hubHtml, m.value), `Hub DOM must contain event metric value: "${m.value}"`);
        }
      }
    }
  });

  await t.test('5. DOM Hub (/): Verify all 11 Climate Tips actions and short titles', () => {
    assert.strictEqual(CLIMATE_TIPS.length, 11);
    for (const tip of CLIMATE_TIPS) {
      assert.ok(htmlContains(hubHtml, tip.action), `Hub DOM must contain tip action: "${tip.action}"`);
      assert.ok(htmlContains(hubHtml, tip.shortTitle), `Hub DOM must contain tip shortTitle: "${tip.shortTitle}"`);
      assert.ok(htmlContains(hubHtml, tip.category), `Hub DOM must contain tip category: "${tip.category}"`);
    }
  });

  await t.test('6. DOM Hub (/): Comparison Hub navigation cards and color preview tokens', () => {
    assert.ok(hubHtml.includes('href="/prototype-1"'), 'Hub must have direct link to /prototype-1');
    assert.ok(hubHtml.includes('href="/prototype-2"'), 'Hub must have direct link to /prototype-2');
    
    // Check palette tokens
    const p1Palette = ['#163515', '#DCE7D4', '#F4EFEA', '#1A4B4E'];
    const p2Palette = ['#080C0E', '#06B6D4', '#10B981', '#0D200C'];
    for (const hex of [...p1Palette, ...p2Palette]) {
      assert.ok(hubHtml.includes(hex), `Hub must contain palette preview code ${hex}`);
    }

    // Check comparison feature matrix
    assert.ok(htmlContains(hubHtml, 'Feature Matrix & Creative Parameters'), 'Must contain feature matrix table');
    assert.ok(htmlContains(hubHtml, '10,000-particle holographic Earth globe'), 'Must describe P2 3D scene in matrix');
    assert.ok(htmlContains(hubHtml, 'Procedural 3D Tree of Life'), 'Must describe P1 3D scene in matrix');
  });

  await t.test('7. DOM Navbar across routes: Switcher, Logo, Active Routes & Anchors', () => {
    for (const [name, html] of [['Hub', hubHtml], ['P1', p1Html], ['P2', p2Html]]) {
      // Avani branding
      assert.ok(html.includes('/assets/branding/logo.jpg'), `${name} Navbar must render Avani logo`);
      assert.ok(html.includes('Avani'), `${name} Navbar must render Avani brand title`);
      
      // Prototype switcher links
      assert.ok(html.includes('href="/"'), `${name} Navbar switcher must have href="/"`);
      assert.ok(html.includes('href="/prototype-1"'), `${name} Navbar switcher must have href="/prototype-1"`);
      assert.ok(html.includes('href="/prototype-2"'), `${name} Navbar switcher must have href="/prototype-2"`);

      // Section anchor links
      assert.ok(html.includes('href="/#about"'), `${name} Navbar must have href="/#about"`);
      assert.ok(html.includes('href="/#objectives"'), `${name} Navbar must have href="/#objectives"`);
      assert.ok(html.includes('href="/#teams"'), `${name} Navbar must have href="/#teams"`);
      assert.ok(html.includes('href="/#events"'), `${name} Navbar must have href="/#events"`);
      assert.ok(html.includes('href="/#climate-tips"'), `${name} Navbar must have href="/#climate-tips"`);

      // Mobile toggle button
      assert.ok(html.includes('aria-label="Toggle navigation drawer"'), `${name} Navbar must have mobile drawer toggle`);
    }
  });

  await t.test('8. DOM Footer across routes: Contacts, Substack articles & Socials', () => {
    for (const [name, html] of [['Hub', hubHtml], ['P1', p1Html], ['P2', p2Html]]) {
      // Direct contacts
      assert.ok(html.includes('href="mailto:avaniyocc@gmail.com"'), `${name} Footer must have mailto link`);
      assert.ok(html.includes('avaniyocc@gmail.com'), `${name} Footer must display email text`);
      assert.ok(html.includes('href="tel:+918050931769"'), `${name} Footer must have tel link`);
      assert.ok(html.includes('+91 80509 31769'), `${name} Footer must display formatted phone`);

      // Social channels
      assert.ok(html.includes('href="https://www.linkedin.com/company/avaniyocc/"'), `${name} Footer must have LinkedIn link`);
      assert.ok(htmlContains(html, 'href="https://open.substack.com/pub/avaniyocc?r=5wu68m&utm_medium=ios"'), `${name} Footer must have Substack link`);
      assert.ok(html.includes('href="https://www.instagram.com/avani_yocc"'), `${name} Footer must have clean Instagram link`);

      // Substack articles (all 3)
      for (const art of EXTERNAL_LINKS.substackArticles) {
        assert.ok(htmlContains(html, art.url), `${name} Footer must have link to Substack article: ${art.url}`);
        assert.ok(htmlContains(html, art.title), `${name} Footer must display title for article: ${art.title}`);
      }

      // Back to top button
      assert.ok(html.includes('aria-label="Scroll back to top"'), `${name} Footer must have back to top button`);
    }
  });

  await t.test('9. Security & Vulnerability Check: Target _blank rel="noopener noreferrer"', () => {
    // Check that every target="_blank" has rel="noopener noreferrer"
    const targetBlankMatches = hubHtml.match(/<a[^>]*target="_blank"[^>]*>/g) || [];
    assert.ok(targetBlankMatches.length >= 5, `Expected multiple external links with target="_blank", found ${targetBlankMatches.length}`);
    for (const tag of targetBlankMatches) {
      assert.ok(tag.includes('rel="noopener noreferrer"'), `Security audit: External anchor "${tag}" must have rel="noopener noreferrer" to prevent window.opener hijacking`);
    }
  });

  await t.test('10. Anchor IDs Existence on Hub (/)', () => {
    const requiredAnchorIds = ['about', 'objectives', 'teams', 'events', 'climate-tips'];
    for (const id of requiredAnchorIds) {
      assert.ok(
        hubHtml.includes(`id="${id}"`), 
        `Hub must contain element with id="${id}" matching Navbar jump links`
      );
    }
  });

  await t.test('11. Prototype 1 and Prototype 2 content preservation', () => {
    // P1 contains all 5 objectives, 5 teams, 4 events, 11 tips
    for (const obj of AVANI_OBJECTIVES) {
      assert.ok(htmlContains(p1Html, obj.title), `P1 must contain objective: ${obj.title}`);
    }
    for (const team of AVANI_TEAMS) {
      assert.ok(htmlContains(p1Html, team.name), `P1 must contain team: ${team.name}`);
    }
    for (const ev of AVANI_EVENTS) {
      assert.ok(htmlContains(p1Html, ev.title), `P1 must contain event: ${ev.title}`);
    }
    for (const tip of CLIMATE_TIPS) {
      assert.ok(htmlContains(p1Html, tip.action), `P1 must contain tip: ${tip.action}`);
    }

    // P2 contains all 5 objectives, 5 teams, 4 events, 11 tips
    for (const obj of AVANI_OBJECTIVES) {
      assert.ok(htmlContains(p2Html, obj.title), `P2 must contain objective: ${obj.title}`);
    }
    for (const team of AVANI_TEAMS) {
      assert.ok(htmlContains(p2Html, team.name), `P2 must contain team: ${team.name}`);
    }
    for (const ev of AVANI_EVENTS) {
      assert.ok(htmlContains(p2Html, ev.title), `P2 must contain event: ${ev.title}`);
    }
    for (const tip of CLIMATE_TIPS) {
      assert.ok(htmlContains(p2Html, tip.action), `P2 must contain tip: ${tip.action}`);
    }
  });

  // Teardown
  if (serverProcess) {
    serverProcess.kill();
  }
});
