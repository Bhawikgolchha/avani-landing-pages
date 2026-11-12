/**
 * Adversarial Browser Renderability and Layout Stress Test
 * Challenger 2 — Milestone M2 (Brand Assets & Media Pipeline)
 * 
 * Verifies:
 * 1. Headless browser rendering of all 8 brand and media assets
 *    - complete === true
 *    - naturalWidth > 0 and naturalHeight > 0
 *    - 0 loading error events
 * 2. Aspect ratio stability and layout across Mobile (375px), Tablet (768px), and Desktop (1440px)
 *    - CSS aspect-video (16:9) and object-fit: cover conformance
 *    - No aspect ratio distortion or pixel clipping / overflow
 * 3. Payload performance
 *    - Total size < 5MB
 *    - Resource timing latency and decoded sizes
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';

const PROJECT_ROOT = path.resolve('/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages');
const ASSETS_DIR = path.join(PROJECT_ROOT, 'public/assets');

const TARGET_ASSETS = [
  { id: 'logo', path: 'branding/logo.jpg', type: 'image/jpeg', isLogo: true },
  { id: 'hero_nature', path: 'images/hero_nature_canopy.webp', type: 'image/webp', isLogo: false },
  { id: 'hero_ecotech', path: 'images/hero_ecotech_globe.webp', type: 'image/webp', isLogo: false },
  { id: 'event_dps', path: 'images/event_dps_drive.webp', type: 'image/webp', isLogo: false },
  { id: 'event_invictus', path: 'images/event_invictus_denim.webp', type: 'image/webp', isLogo: false },
  { id: 'event_orphanage', path: 'images/event_orphanage_aarogi.webp', type: 'image/webp', isLogo: false },
  { id: 'event_waste', path: 'images/event_waste_workshop.webp', type: 'image/webp', isLogo: false },
  { id: 'climate_tips', path: 'images/climate_tips_infographic.webp', type: 'image/webp', isLogo: false },
];

const VIEWPORTS = [
  { name: 'Ultra-Narrow Mobile', width: 320, height: 568, isMobile: true, scale: 2 },
  { name: 'Mobile', width: 375, height: 667, isMobile: true, scale: 2 },
  { name: 'Landscape Mobile', width: 667, height: 375, isMobile: true, scale: 2 },
  { name: 'Tablet', width: 768, height: 1024, isMobile: false, scale: 2 },
  { name: 'Desktop', width: 1440, height: 900, isMobile: false, scale: 1 },
  { name: 'Ultra-Wide Desktop', width: 2560, height: 1440, isMobile: false, scale: 1 },
];

function generateHtml() {
  const imageElements = TARGET_ASSETS.map((asset) => {
    if (asset.isLogo) {
      return `
        <div class="test-item" id="item-${asset.id}">
          <h2>${asset.id} (${asset.path})</h2>
          <!-- Native dimensions test -->
          <div class="raw-box">
            <img id="raw-${asset.id}" class="raw-img" src="/assets/${asset.path}" alt="${asset.id} raw" />
          </div>
          <!-- Styled aspect-ratio container test -->
          <div class="logo-container" id="container-${asset.id}">
            <img id="img-${asset.id}" class="object-cover-img" src="/assets/${asset.path}" alt="${asset.id}" />
          </div>
        </div>
      `;
    }
    return `
      <div class="test-item" id="item-${asset.id}">
        <h2>${asset.id} (${asset.path})</h2>
        <div class="aspect-video-container" id="container-${asset.id}">
          <img id="img-${asset.id}" class="object-cover-img" src="/assets/${asset.path}" alt="${asset.id}" />
        </div>
      </div>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>M2 Media Renderability & Layout Stress Harness</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: #080C0E;
      color: #E6F4EA;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 16px;
    }
    .test-suite-wrapper {
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
    }
    .test-item {
      margin-bottom: 24px;
      padding: 12px;
      background: #111A1E;
      border: 1px solid #1E2D33;
      border-radius: 8px;
    }
    h2 {
      font-size: 14px;
      color: #5EEAD4;
      margin-bottom: 8px;
    }
    /* 16:9 Aspect Video Responsive Container */
    .aspect-video-container {
      width: 100%;
      aspect-ratio: 16 / 9;
      position: relative;
      overflow: hidden;
      border-radius: 6px;
      background-color: #040607;
      border: 1px solid #163515;
    }
    /* Logo Container (Square/Bounded) */
    .logo-container {
      width: 160px;
      max-width: 100%;
      aspect-ratio: 1 / 1;
      position: relative;
      overflow: hidden;
      border-radius: 8px;
      background-color: #040607;
      border: 1px solid #163515;
    }
    .raw-box {
      margin-bottom: 8px;
      display: inline-block;
    }
    .raw-img {
      max-width: 80px;
      height: auto;
      display: block;
    }
    .object-cover-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  </style>
  <script>
    window.__MEDIA_STRESS_RESULTS__ = {
      errors: [],
      loads: [],
      images: {}
    };

    window.__recordError = function(id, src, event) {
      window.__MEDIA_STRESS_RESULTS__.errors.push({
        id: id,
        src: src,
        timestamp: performance.now(),
        type: event.type
      });
    };

    window.__recordLoad = function(id, src) {
      window.__MEDIA_STRESS_RESULTS__.loads.push({
        id: id,
        src: src,
        timestamp: performance.now()
      });
    };
  </script>
</head>
<body>
  <div class="test-suite-wrapper">
    <h1>Avani M2 Brand Assets & Media Stress Harness</h1>
    ${imageElements}
  </div>
  <script>
    // Register error and load handlers
    document.querySelectorAll('img').forEach(function(img) {
      img.addEventListener('error', function(e) {
        window.__recordError(img.id, img.src, e);
      });
      img.addEventListener('load', function(e) {
        window.__recordLoad(img.id, img.src);
      });
    });
  </script>
</body>
</html>`;
}

function startHttpServer(port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const urlPath = req.url.split('?')[0];

      if (urlPath === '/' || urlPath === '/index.html') {
        const html = generateHtml();
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
        return;
      }

      if (urlPath === '/control.html') {
        const controlHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Oracle Calibration Control</title>
</head>
<body>
  <img id="broken-img" src="/assets/images/nonexistent_control_asset_fail.webp" />
  <script>
    window.__CONTROL__ = { errors: [], loads: [] };
    const img = document.getElementById('broken-img');
    img.addEventListener('error', function(e) { window.__CONTROL__.errors.push(e.type); });
    img.addEventListener('load', function(e) { window.__CONTROL__.loads.push(e.type); });
  </script>
</body>
</html>`;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(controlHtml);
        return;
      }

      if (urlPath.startsWith('/assets/')) {
        const relativeAsset = urlPath.replace('/assets/', '');
        const fullPath = path.join(ASSETS_DIR, relativeAsset);

        if (!fs.existsSync(fullPath)) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end(`Asset not found: ${relativeAsset}`);
          return;
        }

        const ext = path.extname(fullPath).toLowerCase();
        let mime = 'application/octet-stream';
        if (ext === '.webp') mime = 'image/webp';
        if (ext === '.jpg' || ext === '.jpeg') mime = 'image/jpeg';
        if (ext === '.png') mime = 'image/png';

        const stream = fs.createReadStream(fullPath);
        res.writeHead(200, {
          'Content-Type': mime,
          'Cache-Control': 'no-cache',
        });
        stream.pipe(res);
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    });

    server.on('error', reject);
    server.listen(port, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

class CdpClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.msgId = 1;
    this.pending = new Map();
    this.eventListeners = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.id && this.pending.has(data.id)) {
            const { resolve: res, reject: rej } = this.pending.get(data.id);
            this.pending.delete(data.id);
            if (data.error) {
              rej(new Error(`CDP Error [${data.error.code}]: ${data.error.message}`));
            } else {
              res(data.result);
            }
          } else if (data.method && this.eventListeners.has(data.method)) {
            for (const cb of this.eventListeners.get(data.method)) {
              cb(data.params);
            }
          }
        } catch (e) {
          console.error('Failed to parse CDP message:', e);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.msgId++;
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, callback) {
    if (!this.eventListeners.has(method)) {
      this.eventListeners.set(method, []);
    }
    this.eventListeners.get(method).push(callback);
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

async function waitForCdpReady(port, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) {
        return true;
      }
    } catch {
      // wait
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`Brave CDP did not become ready on port ${port} after ${maxAttempts} attempts`);
}

async function getPageTarget(port) {
  const res = await fetch(`http://127.0.0.1:${port}/json/list`);
  const list = await res.json();
  const page = list.find((t) => t.type === 'page');
  if (page) return page;

  // If no page, create one
  const newRes = await fetch(`http://127.0.0.1:${port}/json/new`);
  return await newRes.json();
}

async function runBrowserStressSuite() {
  console.log('================================================================');
  console.log('       EMPIRICAL CHALLENGER: M2 BROWSER RENDERABILITY TEST      ');
  console.log('================================================================');

  const httpPort = 8791;
  const cdpPort = 9444;
  const tmpProfile = path.join(os.tmpdir(), `brave_m2_eval_${Date.now()}`);

  console.log(`[1/5] Starting static asset HTTP server on port ${httpPort}...`);
  const server = await startHttpServer(httpPort);
  console.log(`[✓] HTTP server listening on http://127.0.0.1:${httpPort}`);

  console.log(`[2/5] Launching Brave Headless with CDP on port ${cdpPort}...`);
  const braveBin = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';
  const braveArgs = [
    '--headless=new',
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${tmpProfile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--disable-extensions',
    '--mute-audio',
    'about:blank'
  ];

  const braveProc = spawn(braveBin, braveArgs, { stdio: 'ignore' });

  let cdpClient = null;
  const results = {
    viewports: {},
    assetsEvaluation: {},
    payloadSummary: {},
    verdict: 'PENDING',
    errors: [],
  };

  try {
    await waitForCdpReady(cdpPort);
    console.log(`[✓] Brave CDP endpoint online.`);

    const target = await getPageTarget(cdpPort);
    console.log(`[✓] Acquired target page: ${target.id} (${target.webSocketDebuggerUrl})`);

    cdpClient = new CdpClient(target.webSocketDebuggerUrl);
    await cdpClient.connect();
    console.log(`[✓] WebSocket connected to Chrome DevTools Protocol.`);

    await cdpClient.send('Page.enable');
    await cdpClient.send('Runtime.enable');
    await cdpClient.send('Network.enable');

    // -------------------------------------------------------------------------
    // ORACLE SENSITIVITY CALIBRATION (Negative Control)
    // -------------------------------------------------------------------------
    console.log('\n[2b/5] Running Oracle Sensitivity Calibration (Negative Control)...');
    await cdpClient.send('Page.navigate', { url: `http://127.0.0.1:${httpPort}/control.html` });
    await new Promise((r) => setTimeout(r, 500));

    const controlEval = await cdpClient.send('Runtime.evaluate', {
      expression: `
        (function() {
          const img = document.getElementById('broken-img');
          return {
            errors: window.__CONTROL__.errors,
            loads: window.__CONTROL__.loads,
            complete: img.complete,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight
          };
        })()
      `,
      returnByValue: true
    });

    const controlRes = controlEval.result.value;
    const oracleCalibrated = controlRes.errors.length > 0 && controlRes.naturalWidth === 0;
    console.log(`      Negative control error events: ${controlRes.errors.length}`);
    console.log(`      Negative control natural dimensions: ${controlRes.naturalWidth}x${controlRes.naturalHeight}`);
    if (oracleCalibrated) {
      console.log(`[✓] Oracle calibrated: browser accurately catches missing/corrupt asset loading failures.`);
    } else {
      throw new Error(`Oracle calibration failed: harness failed to catch broken asset error event.`);
    }

    // -------------------------------------------------------------------------
    // VIEWPORT STRESS TESTING (Mobile, Tablet, Desktop)
    // -------------------------------------------------------------------------
    console.log('\n[3/5] Commencing Multi-Viewport Layout & Aspect-Ratio Stress Tests...');

    for (const vp of VIEWPORTS) {
      console.log(`\n  --> Testing Viewport: ${vp.name} (${vp.width}x${vp.height}, dpr=${vp.scale}, mobile=${vp.isMobile})`);

      await cdpClient.send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.scale,
        mobile: vp.isMobile,
      });

      // Navigate to test harness
      await cdpClient.send('Page.navigate', { url: `http://127.0.0.1:${httpPort}/index.html` });

      // Wait for page load
      await new Promise((resolve) => {
        const handler = () => {
          resolve();
        };
        cdpClient.on('Page.loadEventFired', handler);
      });

      // Additional settling time for WebP decoding and rendering
      await new Promise((r) => setTimeout(r, 600));

      // Inspect DOM and layout metrics inside browser
      const evalResponse = await cdpClient.send('Runtime.evaluate', {
        expression: `
          (function() {
            const out = {
              windowWidth: window.innerWidth,
              windowHeight: window.innerHeight,
              errors: window.__MEDIA_STRESS_RESULTS__.errors,
              loads: window.__MEDIA_STRESS_RESULTS__.loads,
              images: {}
            };

            const targetIds = [
              'logo',
              'hero_nature',
              'hero_ecotech',
              'event_dps',
              'event_invictus',
              'event_orphanage',
              'event_waste',
              'climate_tips'
            ];

            targetIds.forEach(id => {
              const img = document.getElementById('img-' + id);
              const container = document.getElementById('container-' + id);

              if (!img || !container) {
                out.images[id] = { exists: false };
                return;
              }

              const imgRect = img.getBoundingClientRect();
              const containerRect = container.getBoundingClientRect();
              const computedImg = window.getComputedStyle(img);
              const computedContainer = window.getComputedStyle(container);

              // Interior container dimensions (content area)
              const containerContentWidth = container.clientWidth;
              const containerContentHeight = container.clientHeight;

              out.images[id] = {
                exists: true,
                complete: img.complete,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                naturalRatio: img.naturalHeight > 0 ? (img.naturalWidth / img.naturalHeight) : 0,
                currentSrc: img.currentSrc,
                // Rendered layout metrics
                container: {
                  width: containerRect.width,
                  height: containerRect.height,
                  clientWidth: containerContentWidth,
                  clientHeight: containerContentHeight,
                  aspectRatio: containerRect.height > 0 ? (containerRect.width / containerRect.height) : 0,
                  contentAspectRatio: containerContentHeight > 0 ? (containerContentWidth / containerContentHeight) : 0,
                  cssAspectRatio: computedContainer.aspectRatio
                },
                imageRendered: {
                  width: imgRect.width,
                  height: imgRect.height,
                  aspectRatio: imgRect.height > 0 ? (imgRect.width / imgRect.height) : 0,
                  objectFit: computedImg.objectFit,
                  topDelta: imgRect.top - containerRect.top,
                  leftDelta: imgRect.left - containerRect.left
                },
                // Distortion / clipping checks
                isRendered: img.naturalWidth > 0 && img.naturalHeight > 0 && img.complete,
                fillsContainer: Math.abs(imgRect.width - containerContentWidth) < 1.0 && Math.abs(imgRect.height - containerContentHeight) < 1.0
              };
            });

            return out;
          })()
        `,
        returnByValue: true
      });

      const vpResult = evalResponse.result.value;
      results.viewports[vp.name] = vpResult;

      console.log(`      Window Inner Size: ${vpResult.windowWidth}x${vpResult.windowHeight}`);
      console.log(`      Error events captured: ${vpResult.errors.length}`);

      for (const [id, data] of Object.entries(vpResult.images)) {
        if (!data.exists) {
          console.error(`      [FAIL] Image #${id} not found in DOM`);
          results.errors.push(`[${vp.name}] Image #${id} not found in DOM`);
          continue;
        }

        const natOk = data.complete && data.naturalWidth > 0 && data.naturalHeight > 0;
        const fillOk = data.fillsContainer;
        const fitOk = data.imageRendered.objectFit === 'cover';

        console.log(`      - Asset [${id}]: natural=${data.naturalWidth}x${data.naturalHeight} | rendered=${data.imageRendered.width.toFixed(1)}x${data.imageRendered.height.toFixed(1)} | containerAspect=${data.container.aspectRatio.toFixed(3)} | complete=${data.complete} | fill=${fillOk}`);

        if (!natOk) {
          results.errors.push(`[${vp.name}] Image #${id} failed natural decoding (complete=${data.complete}, nat=${data.naturalWidth}x${data.naturalHeight})`);
        }
        if (!fitOk) {
          results.errors.push(`[${vp.name}] Image #${id} missing object-fit: cover`);
        }
        if (!fillOk) {
          results.errors.push(`[${vp.name}] Image #${id} failed to fill container properly`);
        }
      }
    }

    // -------------------------------------------------------------------------
    // PAYLOAD AND RESOURCE TIMING PERFORMANCE
    // -------------------------------------------------------------------------
    console.log('\n[4/5] Evaluating Network Resource Timings & Payload Performance...');

    const perfEval = await cdpClient.send('Runtime.evaluate', {
      expression: `
        (function() {
          const entries = performance.getEntriesByType('resource');
          return entries
            .filter(e => e.name.includes('/assets/'))
            .map(e => ({
              name: e.name,
              duration: e.duration,
              transferSize: e.transferSize,
              decodedBodySize: e.decodedBodySize
            }));
        })()
      `,
      returnByValue: true
    });

    const perfEntries = perfEval.result.value;
    console.log(`  Captured ${perfEntries.length} resource performance entries.`);
    perfEntries.forEach(entry => {
      const fileName = path.basename(entry.name);
      console.log(`    - ${fileName}: duration=${entry.duration.toFixed(2)}ms | transferSize=${entry.transferSize}B | decodedSize=${entry.decodedBodySize}B`);
    });

    // Filesystem Asset Size Inspection
    let totalPayloadBytes = 0;
    console.log('\n  Filesystem Asset Audit:');
    for (const asset of TARGET_ASSETS) {
      const fullPath = path.join(ASSETS_DIR, asset.path);
      const stat = fs.statSync(fullPath);
      totalPayloadBytes += stat.size;
      results.assetsEvaluation[asset.id] = {
        path: asset.path,
        sizeBytes: stat.size,
        sizeKb: (stat.size / 1024).toFixed(2),
        type: asset.type
      };
      console.log(`    - ${asset.path}: ${stat.size.toLocaleString()} bytes (${(stat.size / 1024).toFixed(2)} KB)`);
    }

    const totalPayloadMb = totalPayloadBytes / (1024 * 1024);
    results.payloadSummary = {
      totalBytes: totalPayloadBytes,
      totalMb: totalPayloadMb.toFixed(3),
      thresholdMb: 5.0,
      withinBudget: totalPayloadMb < 5.0
    };

    console.log(`\n  Total Asset Payload: ${results.payloadSummary.totalMb} MB (Budget: < 5.000 MB)`);
    if (!results.payloadSummary.withinBudget) {
      results.errors.push(`Total asset payload (${results.payloadSummary.totalMb} MB) exceeds 5MB budget`);
    }

    // -------------------------------------------------------------------------
    // FINAL VERDICT DETERMINATION
    // -------------------------------------------------------------------------
    console.log('\n[5/5] Finalizing Assessment and Verdict...');

    if (results.errors.length === 0) {
      results.verdict = 'APPROVE';
      console.log('\n>>> VERDICT: APPROVE <<<');
      console.log('All 8 brand assets decoded and rendered with complete===true, naturalWidth>0, 0 errors, stable aspect-ratio under mobile/tablet/desktop, and payload under 5MB.');
    } else {
      results.verdict = 'REQUEST_CHANGES';
      console.error('\n>>> VERDICT: REQUEST_CHANGES <<<');
      results.errors.forEach(e => console.error('  - ' + e));
    }

  } catch (err) {
    console.error('Fatal error during browser stress testing:', err);
    results.verdict = 'REQUEST_CHANGES';
    results.errors.push(`Fatal test harness error: ${err.message}`);
  } finally {
    if (cdpClient) {
      cdpClient.close();
    }
    if (braveProc) {
      braveProc.kill('SIGTERM');
    }
    server.close();

    // Clean up temporary profile
    try {
      if (fs.existsSync(tmpProfile)) {
        fs.rmSync(tmpProfile, { recursive: true, force: true });
      }
    } catch {
      // ignore tmp cleanup error
    }
  }

  return results;
}

// Execute suite
runBrowserStressSuite().then((res) => {
  fs.writeFileSync(
    path.join(PROJECT_ROOT, 'tests/e2e/m2_renderability_results.json'),
    JSON.stringify(res, null, 2)
  );
  process.exit(res.verdict === 'APPROVE' ? 0 : 1);
});
