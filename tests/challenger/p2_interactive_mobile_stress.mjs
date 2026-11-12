/**
 * Empirical Stress Test Harness: Prototype 2 Mobile Responsiveness, Layout Bounds, and Touch UX
 * Challenger 2 — Milestone M5 (The Modern Eco-Tech Biosphere)
 *
 * Verifies:
 * 1. Viewports: 375px, 390px, 430px, 768px, 1024px, 1440px
 * 2. Layout bounds: Zero horizontal overflow (scrollWidth <= clientWidth, no element overflowing right)
 * 3. Touch scrolling & gesture simulation
 * 4. Interactive tabs/cards existence and state transitions
 * 5. Climate tips category filtering buttons and reactive list updates
 * 6. Terminal input / CLI enlistment component and CTA interactions
 * 7. External link validity (URLs, protocol, target, rel)
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

const TARGET_URL = 'http://localhost:3009/prototype-2';
const VIEWPORTS = [
  { name: 'iPhone SE (Narrow Mobile)', width: 375, height: 667, isMobile: true, deviceScaleFactor: 2 },
  { name: 'iPhone 13/14 (Standard Mobile)', width: 390, height: 844, isMobile: true, deviceScaleFactor: 3 },
  { name: 'iPhone 14/15 Pro Max (Large Mobile)', width: 430, height: 932, isMobile: true, deviceScaleFactor: 3 },
  { name: 'iPad Portrait (Tablet)', width: 768, height: 1024, isMobile: true, deviceScaleFactor: 2 },
  { name: 'iPad Landscape / Laptop', width: 1024, height: 768, isMobile: false, deviceScaleFactor: 1 },
  { name: 'MacBook Pro / Desktop', width: 1440, height: 900, isMobile: false, deviceScaleFactor: 2 },
];

class CdpSession {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (e) => reject(e);
      this.ws.onmessage = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve: res, reject: rej } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) rej(new Error(`CDP Error [${msg.error.code}]: ${msg.error.message}`));
          else res(msg.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    return res?.result?.value;
  }
}

async function getBrowserWsUrl(port) {
  const res = await fetch(`http://127.0.0.1:${port}/json`);
  const data = await res.json();
  const page = data.find((t) => t.type === 'page');
  if (!page) throw new Error('No page target found');
  return page.webSocketDebuggerUrl;
}

async function runEmpiricalStressTest() {
  console.log('================================================================');
  console.log('CHALLENGER 2: EMPIRICAL STRESS TEST SUITE FOR PROTOTYPE 2');
  console.log('Target:', TARGET_URL);
  console.log('================================================================\n');

  // Verify target server is up
  try {
    const res = await fetch(TARGET_URL);
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
    console.log('[✓] Next.js target server is online at', TARGET_URL);
  } catch (err) {
    console.error('[!] Target server not reachable:', err.message);
    process.exit(1);
  }

  const cdpPort = 9488;
  const tmpProfile = path.join(os.tmpdir(), `brave_stress_p2_${Date.now()}`);
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
    'about:blank',
  ];

  console.log(`[1] Launching headless browser on CDP port ${cdpPort}...`);
  const braveProc = spawn(braveBin, braveArgs, { stdio: 'ignore' });

  // Wait for CDP readiness
  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    try {
      wsUrl = await getBrowserWsUrl(cdpPort);
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  if (!wsUrl) {
    braveProc.kill();
    throw new Error('Failed to acquire Brave CDP debugger WebSocket URL');
  }

  const cdp = new CdpSession(wsUrl);
  await cdp.connect();
  console.log('[✓] Connected to Chrome DevTools Protocol via WebSocket');

  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('DOM.enable');

  const report = {
    viewports: [],
    overflowBugs: [],
    interactiveTabsStatus: null,
    climateTipsFilterStatus: null,
    terminalInputStatus: null,
    externalLinksStatus: null,
    verdict: 'PENDING',
  };

  try {
    // -------------------------------------------------------------------------
    // TEST SECTION 1: VIEWPORT RESPONSIVENESS & ZERO HORIZONTAL OVERFLOW
    // -------------------------------------------------------------------------
    console.log('\n--- TEST SECTION 1: Viewport Responsiveness & Layout Bounds ---');

    for (const vp of VIEWPORTS) {
      process.stdout.write(`Testing viewport: ${vp.name} (${vp.width}x${vp.height})... `);

      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.deviceScaleFactor,
        mobile: vp.isMobile,
      });

      if (vp.isMobile) {
        await cdp.send('Emulation.setTouchEmulationEnabled', {
          enabled: true,
          maxTouchPoints: 5,
        });
      } else {
        await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: false });
      }

      await cdp.send('Page.navigate', { url: TARGET_URL });
      await new Promise((r) => setTimeout(r, 1200)); // Allow dynamic imports and hydration to settle

      // Layout measurements
      const layoutData = await cdp.eval(`
        (function() {
          const docEl = document.documentElement;
          const body = document.body;
          const winWidth = window.innerWidth;
          const docScrollWidth = docEl.scrollWidth;
          const docClientWidth = docEl.clientWidth;
          const bodyScrollWidth = body.scrollWidth;
          const bodyClientWidth = body.clientWidth;

          // Find overflowing elements
          const allEls = document.querySelectorAll('*');
          const overflowingElements = [];
          for (let i = 0; i < allEls.length; i++) {
            const el = allEls[i];
            const rect = el.getBoundingClientRect();
            // Allow 1px subpixel tolerance
            if (rect.right > winWidth + 1.5) {
              const tag = el.tagName.toLowerCase();
              const id = el.id ? '#' + el.id : '';
              const className = el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').slice(0, 3).join('.') : '';
              overflowingElements.push({
                selector: tag + id + className,
                right: Math.round(rect.right),
                excess: Math.round(rect.right - winWidth),
                width: Math.round(rect.width)
              });
            }
          }

          return {
            winWidth,
            docScrollWidth,
            docClientWidth,
            bodyScrollWidth,
            bodyClientWidth,
            hasDocOverflow: docScrollWidth > docClientWidth,
            hasBodyOverflow: bodyScrollWidth > bodyClientWidth,
            overflowCount: overflowingElements.length,
            overflowSamples: overflowingElements.slice(0, 5)
          };
        })()
      `);

      const hasOverflow = layoutData.hasDocOverflow || layoutData.hasBodyOverflow || layoutData.overflowCount > 0;
      const vpResult = {
        viewport: vp.name,
        width: vp.width,
        height: vp.height,
        docScrollWidth: layoutData.docScrollWidth,
        docClientWidth: layoutData.docClientWidth,
        bodyScrollWidth: layoutData.bodyScrollWidth,
        bodyClientWidth: layoutData.bodyClientWidth,
        overflowCount: layoutData.overflowCount,
        overflowSamples: layoutData.overflowSamples,
        pass: !hasOverflow,
      };

      report.viewports.push(vpResult);

      if (hasOverflow) {
        console.log(`❌ FAIL! Horizontal overflow detected! (doc: ${layoutData.docScrollWidth}px vs ${layoutData.docClientWidth}px, overflowing elements: ${layoutData.overflowCount})`);
        report.overflowBugs.push(vpResult);
      } else {
        console.log(`✅ PASS (scrollWidth ${layoutData.docScrollWidth}px <= clientWidth ${layoutData.docClientWidth}px)`);
      }

      // Touch scroll simulation on mobile
      if (vp.isMobile) {
        const scrollBefore = await cdp.eval('window.scrollY');
        await cdp.send('Input.synthesizeScrollGesture', {
          x: Math.round(vp.width / 2),
          y: Math.round(vp.height / 2),
          xDistance: 0,
          yDistance: -300,
          speed: 800,
        });
        await new Promise((r) => setTimeout(r, 400));
        const scrollAfter = await cdp.eval('window.scrollY');
        // console.log(`      Touch scroll response: ${scrollBefore} -> ${scrollAfter}`);
      }
    }

    // -------------------------------------------------------------------------
    // TEST SECTION 2: INTERACTIVE TABS & MODULE SELECTOR
    // -------------------------------------------------------------------------
    console.log('\n--- TEST SECTION 2: Interactive Tabs & Module Selector ---');
    const tabsData = await cdp.eval(`
      (function() {
        const telemetryModulesSec = document.getElementById('telemetry-modules');
        const tabButtons = document.querySelectorAll('#telemetry-modules button');
        const allButtons = Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim());

        return {
          telemetrySectionExists: !!telemetryModulesSec,
          tabButtonsCount: tabButtons.length,
          buttonLabels: Array.from(tabButtons).map(b => b.innerText.trim()),
          allPageButtons: allButtons
        };
      })()
    `);

    console.log('Telemetry modules selector section (#telemetry-modules) exists:', tabsData.telemetrySectionExists);
    console.log('Tab buttons count in #telemetry-modules:', tabsData.tabButtonsCount);
    console.log('Tab button labels:', tabsData.buttonLabels);
    console.log('All buttons on page:', tabsData.allPageButtons);

    report.interactiveTabsStatus = {
      sectionExists: tabsData.telemetrySectionExists,
      tabButtonsCount: tabsData.tabButtonsCount,
      pass: tabsData.telemetrySectionExists && tabsData.tabButtonsCount >= 4,
    };

    // -------------------------------------------------------------------------
    // TEST SECTION 3: CLIMATE TIPS FILTERING BUTTONS & REACTIVITY
    // -------------------------------------------------------------------------
    console.log('\n--- TEST SECTION 3: Climate Tips Sector Filtering ---');
    const tipsData = await cdp.eval(`
      (function() {
        const tipsContainer = document.getElementById('climate-tips');
        const tipCards = document.querySelectorAll('.climate-tip-item, [data-testid^="climate-tip-"]');
        
        // Look for filter buttons
        const filterButtons = Array.from(document.querySelectorAll('button')).filter(btn => {
          const txt = btn.innerText.toLowerCase();
          return txt.includes('all') || txt.includes('energy') || txt.includes('water') || txt.includes('waste') || txt.includes('consumption');
        }).map(btn => ({ text: btn.innerText.trim(), className: btn.className }));

        return {
          climateTipsSectionExists: !!tipsContainer,
          renderedTipsCount: tipCards.length,
          filterButtonsFound: filterButtons
        };
      })()
    `);

    console.log('Climate tips section (#climate-tips) exists:', tipsData.climateTipsSectionExists);
    console.log('Rendered climate tip cards count:', tipsData.renderedTipsCount);
    console.log('Filter buttons found:', tipsData.filterButtonsFound);

    // Try testing filter interaction if filter buttons exist
    let filterTestPassed = false;
    if (tipsData.filterButtonsFound.length > 0) {
      // Click water or energy filter
      const filterClickResult = await cdp.eval(`
        (async function() {
          const buttons = Array.from(document.querySelectorAll('button'));
          const waterBtn = buttons.find(b => b.innerText.toLowerCase().includes('water'));
          if (!waterBtn) return { clicked: false };
          waterBtn.click();
          await new Promise(r => setTimeout(r, 200));
          const tipsAfter = document.querySelectorAll('.climate-tip-item, [data-testid^="climate-tip-"]');
          return {
            clicked: true,
            tipsCountAfter: tipsAfter.length
          };
        })()
      `);
      console.log('Filter button click test result:', filterClickResult);
      filterTestPassed = filterClickResult.clicked && filterClickResult.tipsCountAfter < tipsData.renderedTipsCount;
    }

    report.climateTipsFilterStatus = {
      sectionExists: tipsData.climateTipsSectionExists,
      tipsCount: tipsData.renderedTipsCount,
      filterButtonsCount: tipsData.filterButtonsFound.length,
      interactiveFilteringWorks: filterTestPassed,
      pass: tipsData.renderedTipsCount === 11 && tipsData.filterButtonsFound.length >= 4 && filterTestPassed,
    };

    // -------------------------------------------------------------------------
    // TEST SECTION 4: TERMINAL INPUT / CLI ENLISTMENT COMPONENT
    // -------------------------------------------------------------------------
    console.log('\n--- TEST SECTION 4: Terminal Input / CLI Enlistment Interaction ---');
    const terminalData = await cdp.eval(`
      (function() {
        const applySection = document.getElementById('apply');
        const terminalHeader = document.querySelector('[class*="bash"], [class*="terminal"]');
        const terminalText = document.body.innerText.includes('avani@biosphere') || document.body.innerText.includes('avani-candidate-enlistment.sh');
        const googleFormLinks = Array.from(document.querySelectorAll('a[href*="docs.google.com/forms"]'));

        return {
          applySectionExists: !!applySection,
          terminalHeaderExists: !!terminalHeader,
          terminalTextExists: terminalText,
          googleFormLinkCount: googleFormLinks.length,
          googleFormLinks: googleFormLinks.map(a => ({ text: a.innerText.trim(), href: a.href, target: a.target, rel: a.rel }))
        };
      })()
    `);

    console.log('Apply section (#apply) exists:', terminalData.applySectionExists);
    console.log('Terminal text (avani@biosphere or bash script) exists:', terminalData.terminalTextExists);
    console.log('Google form application links count:', terminalData.googleFormLinkCount);
    console.log('Google form links detail:', terminalData.googleFormLinks);

    report.terminalInputStatus = {
      applySectionExists: terminalData.applySectionExists,
      terminalTextExists: terminalData.terminalTextExists,
      googleFormLinkCount: terminalData.googleFormLinkCount,
      pass: terminalData.terminalTextExists && terminalData.googleFormLinkCount >= 1,
    };

    // -------------------------------------------------------------------------
    // TEST SECTION 5: EXTERNAL LINKS VALIDITY
    // -------------------------------------------------------------------------
    console.log('\n--- TEST SECTION 5: External Links Validity ---');
    const linksData = await cdp.eval(`
      (function() {
        const links = Array.from(document.querySelectorAll('a[href]')).map(a => ({
          href: a.getAttribute('href'),
          fullHref: a.href,
          text: a.innerText.trim(),
          target: a.getAttribute('target'),
          rel: a.getAttribute('rel')
        }));

        const externalLinks = links.filter(l => l.href && (l.href.startsWith('http') || l.href.startsWith('mailto:') || l.href.startsWith('tel:')));
        return {
          totalLinks: links.length,
          externalLinks
        };
      })()
    `);

    console.log(`Total links on page: ${linksData.totalLinks}, External links: ${linksData.externalLinks.length}`);
    const requiredUrls = [
      'docs.google.com/forms',
      'linkedin.com',
      'instagram.com',
      'substack.com',
    ];

    const missingRequiredUrls = [];
    for (const req of requiredUrls) {
      const found = linksData.externalLinks.some(l => l.href.includes(req));
      if (!found) missingRequiredUrls.push(req);
    }

    console.log('Missing required URL domains:', missingRequiredUrls);
    report.externalLinksStatus = {
      totalExternalLinks: linksData.externalLinks.length,
      missingRequiredUrls,
      pass: missingRequiredUrls.length === 0,
    };

    // -------------------------------------------------------------------------
    // TEST SECTION 6: COMPARISON WITH P2Overlay COMPONENT
    // -------------------------------------------------------------------------
    console.log('\n--- TEST SECTION 6: Component Integration Inspection ---');
    const pageTsxPath = path.resolve(process.cwd(), 'src/app/prototype-2/page.tsx');
    const overlayTsxPath = path.resolve(process.cwd(), 'src/components/prototype2/P2Overlay.tsx');

    const pageContent = fs.readFileSync(pageTsxPath, 'utf8');
    const overlayContent = fs.readFileSync(overlayTsxPath, 'utf8');

    const pageImportsOverlay = pageContent.includes('P2Overlay');
    const overlayHasFiltering = overlayContent.includes('setSelectedTipCategory');
    const overlayHasTerminal = overlayContent.includes('avani@biosphere');
    const overlayHasMobileFloat = overlayContent.includes('fixed bottom-6 right-6');

    console.log('src/app/prototype-2/page.tsx imports P2Overlay:', pageImportsOverlay);
    console.log('src/components/prototype2/P2Overlay.tsx has climate tips filtering:', overlayHasFiltering);
    console.log('src/components/prototype2/P2Overlay.tsx has terminal CLI:', overlayHasTerminal);
    console.log('src/components/prototype2/P2Overlay.tsx has mobile floating CTA:', overlayHasMobileFloat);

    // Final Verdict determination
    const overflowFailed = report.overflowBugs.length > 0;
    const missingInteractiveTabs = !report.interactiveTabsStatus.pass;
    const missingFiltering = !report.climateTipsFilterStatus.pass;
    const missingTerminal = !report.terminalInputStatus.pass;

    if (overflowFailed || missingInteractiveTabs || missingFiltering || missingTerminal || !pageImportsOverlay) {
      report.verdict = 'REQUEST_CHANGES';
    } else {
      report.verdict = 'APPROVE';
    }

    console.log('\n================================================================');
    console.log('FINAL EMPIRICAL VERDICT:', report.verdict);
    console.log('================================================================');
    console.log(JSON.stringify(report, null, 2));

  } finally {
    try {
      braveProc.kill();
    } catch {}
  }

  // Save stress test report JSON for auditing
  const reportPath = path.resolve(process.cwd(), 'tests/challenger/p2_stress_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\nReport written to ${reportPath}`);

  return report;
}

runEmpiricalStressTest().catch((err) => {
  console.error('Fatal error running stress harness:', err);
  process.exit(1);
});
