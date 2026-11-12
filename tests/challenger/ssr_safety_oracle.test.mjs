import assert from 'node:assert/strict';
import test from 'node:test';
import { spawn } from 'node:child_process';
import http from 'node:http';

const PORT = 3088;
const BASE_URL = `http://localhost:${PORT}`;

function makeRequest(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${urlPath}`, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body,
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function waitForServer(maxAttempts = 30, intervalMs = 500) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await makeRequest('/');
      if (res.statusCode === 200) {
        return true;
      }
    } catch {
      // Server not ready yet
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error(`Server at ${BASE_URL} failed to respond within ${maxAttempts * intervalMs}ms`);
}

test('SSR Safety & Production Runtime Suite', async (t) => {
  let serverProcess = null;

  await t.test('Step 0: Start Next.js production server on port 3088', async () => {
    serverProcess = spawn('npx', ['next', 'start', '-p', String(PORT)], {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: false,
    });

    let stderrData = '';
    serverProcess.stderr.on('data', (chunk) => {
      stderrData += chunk.toString();
    });

    const isReady = await waitForServer();
    assert.strictEqual(isReady, true, 'Next.js server should start and respond with HTTP 200');
  });

  await t.test('Test 1: Route HTTP status codes', async () => {
    const routes = [
      { path: '/', expectedStatus: 200 },
      { path: '/prototype-1', expectedStatus: 200 },
      { path: '/prototype-2', expectedStatus: 200 },
      { path: '/invalid-test-route-404', expectedStatus: 404 },
    ];

    for (const route of routes) {
      const res = await makeRequest(route.path);
      assert.strictEqual(
        res.statusCode,
        route.expectedStatus,
        `Route ${route.path} should return HTTP ${route.expectedStatus}, got ${res.statusCode}`
      );
    }
  });

  await t.test('Test 2: Prerendered HTML integrity & absence of hydration error signatures', async () => {
    const targetRoutes = ['/', '/prototype-1', '/prototype-2'];

    const forbiddenErrorMarkers = [
      'Minified React error #418',
      'Minified React error #423',
      'Text content does not match server-rendered HTML',
      'Hydration failed because the initial UI does not match',
      'There was an error while hydrating',
      'ReferenceError: window is not defined',
      'ReferenceError: document is not defined',
      'Error: WebGL',
      'react-error-overlay',
      'Unhandled Runtime Error',
    ];

    for (const route of targetRoutes) {
      const res = await makeRequest(route);
      assert.strictEqual(res.statusCode, 200, `${route} must return 200`);
      
      // Check HTML doctype and tags
      assert.ok(res.body.includes('<!DOCTYPE html>'), `${route} must contain <!DOCTYPE html>`);
      assert.ok(res.body.includes('<html'), `${route} must contain <html tag`);
      assert.ok(res.body.includes('Avani'), `${route} must contain Avani branding`);

      // Verify absence of React hydration mismatch or SSR errors
      for (const marker of forbiddenErrorMarkers) {
        assert.strictEqual(
          res.body.includes(marker),
          false,
          `Route ${route} HTML unexpectedly contains SSR error marker: "${marker}"`
        );
      }
    }
  });

  await t.test('Test 3: SSR Isolation — dynamic import with { ssr: false } prevents WebGL context execution on server', async () => {
    const p1Res = await makeRequest('/prototype-1');
    const p2Res = await makeRequest('/prototype-2');

    // In Next.js App Router, dynamic imports with { ssr: false } are omitted from the server HTML payload
    // and only rendered on client hydration.
    // Verify that the inner text of P1ScenePlaceholder ("Procedural Tree of Life, Translucent Foliage") 
    // is NOT present in the initial static server HTML response.
    const p1PlaceholderText = 'Procedural Tree of Life, Translucent Foliage';
    const p2PlaceholderText = '10,000-particle holographic Earth globe';

    const p1RenderedOnServer = p1Res.body.includes(p1PlaceholderText);
    const p2RenderedOnServer = p2Res.body.includes(p2PlaceholderText);

    assert.strictEqual(
      p1RenderedOnServer,
      false,
      'P1ScenePlaceholder must NOT be rendered during SSR when { ssr: false } is active'
    );
    assert.strictEqual(
      p2RenderedOnServer,
      false,
      'P2ScenePlaceholder must NOT be rendered during SSR when { ssr: false } is active'
    );

    // However, the static content (Navbar, chapters, footer) MUST be rendered in the SSR HTML
    assert.ok(
      p1Res.body.includes('Prototype 1: The Living Canopy'),
      'P1 page static content must be prerendered in SSR'
    );
    assert.ok(
      p2Res.body.includes('Eco-Tech Biosphere'),
      'P2 page static content must be prerendered in SSR'
    );
  });

  // Teardown
  if (serverProcess) {
    serverProcess.kill('SIGTERM');
  }
});
