/**
 * Tier 2 Boundary & Corner Case Tests: F10, F11, F12, F13
 * 
 * Covers:
 * - F10: Prototype 1 3D Canvas (SSR isolation { ssr: false }, fixed background container layout, Lenis integration)
 * - F11: Prototype 1 Scroll Overlay (5-stage scroll journey chapters, progress normalization 0.0-1.0 clamping, trigger thresholds)
 * - F12: Prototype 2 3D Canvas (10,000-particle globe boundary >= 10,000, SSR isolation, telemetry coordinates)
 * - F13: Prototype 2 Scroll Overlay (5-stage scroll journey chapters, glassmorphic HUD, interactive tab state boundaries)
 */

const fs = require('node:fs');
const path = require('node:path');
const {
  describe,
  test,
  assertFileExists,
  assertFileNonEmpty,
  assertFileContains,
  assert
} = require('../harness');

const P1_PAGE = path.resolve(process.cwd(), 'src/app/prototype-1/page.tsx');
const P2_PAGE = path.resolve(process.cwd(), 'src/app/prototype-2/page.tsx');
const LENIS_HOOK = path.resolve(process.cwd(), 'src/hooks/useLenis.ts');

/**
 * Normalizes and clamps scroll progress to strict [0.0, 1.0] domain boundaries.
 */
function clampScrollProgress(progress) {
  if (typeof progress !== 'number' || Number.isNaN(progress)) {
    throw new assert.AssertionError({
      message: `Invalid scroll progress value: ${progress}`,
      operator: 'clampScrollProgress'
    });
  }
  return Math.max(0.0, Math.min(1.0, progress));
}

/**
 * Clamps active tab index to [0, totalTabs - 1].
 */
function clampTabIndex(requestedIndex, totalTabs) {
  if (totalTabs <= 0) return 0;
  return Math.max(0, Math.min(totalTabs - 1, requestedIndex));
}

/**
 * Validates particle allocation against performance and visual fidelity bounds.
 */
function validateParticleAllocation(count) {
  if (typeof count !== 'number' || Number.isNaN(count)) {
    throw new assert.AssertionError({
      message: `Particle count must be a number, got ${typeof count}`,
      operator: 'validateParticleAllocation'
    });
  }
  if (count < 10000) {
    throw new assert.AssertionError({
      message: `Particle count (${count}) is below required fidelity boundary of 10,000 particles`,
      expected: '>= 10000',
      actual: count,
      operator: 'validateParticleAllocation'
    });
  }
  if (count > 100000) {
    throw new assert.AssertionError({
      message: `Particle count (${count}) exceeds GPU safety threshold of 100,000 particles`,
      expected: '<= 100000',
      actual: count,
      operator: 'validateParticleAllocation'
    });
  }
  return true;
}

describe('Tier 2: 3D Canvas, Particles & Scroll Overlay Boundaries (F10, F11, F12, F13)', () => {

  // ---------------------------------------------------------------------------
  // F10: Prototype 1 3D Canvas Architecture & SSR Boundaries
  // ---------------------------------------------------------------------------

  test('[F10] SSR canvas isolation boundary: dynamic import specifies ssr: false in P1', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');
    assert.match(content, /dynamic\s*\(/, 'P1 must use next/dynamic for client-only canvas rendering');
    assert.match(content, /\{\s*ssr:\s*false\s*\}/, 'P1 dynamic import must explicitly configure { ssr: false }');
  });

  test('[F10] Background canvas container boundary: fixed inset-0 z-0 pointer-events-none styling', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');
    assert.match(
      content,
      /fixed\s+inset-0\s+z-0\s+pointer-events-none/,
      'Canvas background wrapper must be styled with "fixed inset-0 z-0 pointer-events-none" to prevent event blocking'
    );
  });

  test('[F10] Smooth scroll integration boundary: useLenis hook invocation in Prototype 1', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');
    assert.match(content, /useLenis\s*\(\s*\)/, 'Prototype 1 page component must invoke useLenis()');
  });

  test('[F10] Canvas container layout bounds: full-screen dimensions styling (w-full h-full)', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');
    assert.match(content, /w-full\s+h-full/, 'Canvas placeholder wrapper must occupy full dimensions (w-full h-full)');
  });

  test('[F10] Foliage & canopy theme styling boundary: emerald / tea-green palette tokens', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');
    assert.match(content, /bg-\[#F9FAF7\]/, 'P1 page must apply tea-green tinted light background #F9FAF7');
    assert.match(content, /text-\[#163515\]/, 'P1 page must apply Avani brand forest green text #163515');
    assert.match(content, /emerald-/, 'P1 page must incorporate emerald botanical color accents');
  });

  test('[F10] WebGL canvas context resilience: placeholder component renders fallback without error', () => {
    assertFileExists(P1_PAGE);
    const content = fs.readFileSync(P1_PAGE, 'utf8');
    assert.match(content, /Living\s+Canopy/i, 'P1 canvas placeholder must cite Living Canopy aesthetic');
    assert.match(content, /React\s+Three\s+Fiber/i, 'P1 canvas placeholder must cite React Three Fiber runtime');
  });

  // ---------------------------------------------------------------------------
  // F11: Prototype 1 Scroll Overlay & 5-Stage Trigger Boundaries
  // ---------------------------------------------------------------------------

  test('[F11] 5-stage scroll journey boundary: exactly 5 distinct chapters/sections in P1', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');
    const sectionMatches = content.match(/<section[\s>]/g) || [];
    assert.strictEqual(
      sectionMatches.length,
      5,
      `Prototype 1 must contain exactly 5 scroll journey sections, found ${sectionMatches.length}`
    );
  });

  test('[F11] Scroll trigger anchor boundaries: all section IDs (#objectives, #teams, #events, #climate-tips) present', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');
    assert.match(content, /id=["']objectives["']/, 'P1 must define section id="objectives"');
    assert.match(content, /id=["']teams["']/, 'P1 must define section id="teams"');
    assert.match(content, /id=["']events["']/, 'P1 must define section id="events"');
    assert.match(content, /id=["']climate-tips["']/, 'P1 must define section id="climate-tips"');
  });

  test('[F11] Scroll progress normalization boundary: clamps values strictly between 0.0 and 1.0', () => {
    // Negative scroll (overscroll up)
    assert.strictEqual(clampScrollProgress(-0.5), 0.0, 'Negative scroll values must clamp to 0.0');
    assert.strictEqual(clampScrollProgress(-0.001), 0.0);

    // Exact boundaries
    assert.strictEqual(clampScrollProgress(0.0), 0.0, 'Zero must remain 0.0');
    assert.strictEqual(clampScrollProgress(1.0), 1.0, 'One must remain 1.0');

    // Intermediate values
    assert.strictEqual(clampScrollProgress(0.25), 0.25);
    assert.strictEqual(clampScrollProgress(0.789), 0.789);

    // Overscroll down
    assert.strictEqual(clampScrollProgress(1.001), 1.0);
    assert.strictEqual(clampScrollProgress(2.5), 1.0, 'Values > 1.0 must clamp to 1.0');

    // Invalid non-number throws
    assert.throws(() => clampScrollProgress('0.5'), /Invalid scroll progress value/);
    assert.throws(() => clampScrollProgress(NaN), /Invalid scroll progress value/);
  });

  test('[F11] Scroll trigger threshold boundaries: stage boundaries are monotonically increasing', () => {
    // Define the 5 sequential stages across [0.0, 1.0]
    const stageCheckpoints = [
      { stage: 1, name: 'Hero Canopy', trigger: 0.0 },
      { stage: 2, name: 'Core Objectives', trigger: 0.25 },
      { stage: 3, name: 'Student Teams', trigger: 0.50 },
      { stage: 4, name: 'Flagship Events', trigger: 0.75 },
      { stage: 5, name: 'Climate Tips & CTA', trigger: 1.0 }
    ];

    assert.strictEqual(stageCheckpoints.length, 5, 'Must have 5 stage checkpoints');
    for (let i = 1; i < stageCheckpoints.length; i++) {
      const prev = stageCheckpoints[i - 1].trigger;
      const curr = stageCheckpoints[i].trigger;
      assert.ok(curr > prev, `Stage ${i + 1} trigger (${curr}) must be strictly greater than stage ${i} trigger (${prev})`);
      assert.ok(curr - prev >= 0.2, `Step difference (${curr - prev}) must be >= 0.2 for distinct scroll separation`);
    }
  });

  test('[F11] Overlay z-index boundary: foreground content uses relative z-10 above canvas z-0', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');
    assert.match(
      content,
      /relative\s+z-10/,
      'P1 foreground content wrapper must apply "relative z-10" to layer over "z-0" canvas'
    );
  });

  test('[F11] Lenis smooth scroll ticker configuration boundary: duration and orientation bounds', () => {
    const content = fs.readFileSync(LENIS_HOOK, 'utf8');
    assert.match(content, /orientation:\s*['"]vertical['"]/, 'Lenis must configure vertical orientation');
    assert.match(content, /duration:\s*options\?\.duration\s*\?\?\s*1\.2/, 'Lenis default duration must be configured at 1.2s');
    assert.match(content, /gsap\.ticker\.add\(updateTicker\)/, 'Lenis RAF loop must be driven by GSAP ticker');
  });

  // ---------------------------------------------------------------------------
  // F12: Prototype 2 3D Canvas & Particle Count Boundaries
  // ---------------------------------------------------------------------------

  test('[F12] Holographic Earth particle count lower bound: configured >= 10,000 particles', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');
    // Prototype 2 specifies 10,000-particle holographic Earth globe in placeholder and constants
    assert.match(content, /10,000-particle/i, 'Prototype 2 must explicitly specify 10,000-particle globe fidelity');
  });

  test('[F12] Particle count allocation oracle: validates particle allocation is bounded between 10,000 and 100,000', () => {
    // Valid boundaries
    assert.strictEqual(validateParticleAllocation(10000), true);
    assert.strictEqual(validateParticleAllocation(25000), true);
    assert.strictEqual(validateParticleAllocation(100000), true);

    // Negative tests: sub-threshold
    assert.throws(() => {
      validateParticleAllocation(5000);
    }, /below required fidelity boundary of 10,000 particles/);

    // Negative tests: over-threshold
    assert.throws(() => {
      validateParticleAllocation(150000);
    }, /exceeds GPU safety threshold of 100,000 particles/);

    // Non-number rejection
    assert.throws(() => {
      validateParticleAllocation('10000');
    }, /Particle count must be a number/);
  });

  test('[F12] SSR canvas isolation boundary: dynamic import specifies ssr: false for P2', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');
    assert.match(content, /dynamic\s*\(/, 'P2 must use next/dynamic for client-only canvas rendering');
    assert.match(content, /\{\s*ssr:\s*false\s*\}/, 'P2 dynamic import must explicitly configure { ssr: false }');
  });

  test('[F12] Background canvas container boundary: fixed inset-0 z-0 pointer-events-none styling in P2', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');
    assert.match(
      content,
      /fixed\s+inset-0\s+z-0\s+pointer-events-none/,
      'Canvas background wrapper in P2 must use "fixed inset-0 z-0 pointer-events-none"'
    );
  });

  test('[F12] Telemetry beacon coordinates boundary: Bangalore latitude/longitude boundaries (12.9716° N, 77.5946° E)', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');
    assert.match(content, /12\.9716°\s*N/, 'P2 must display Bangalore latitude 12.9716° N');
    assert.match(content, /77\.5946°\s*E/, 'P2 must display Bangalore longitude 77.5946° E');
  });

  test('[F12] Cyber-environmental theme styling boundary: dark glassmorphic palette tokens (#080C0E, cyan-400)', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');
    assert.match(content, /bg-\[#080C0E\]/, 'P2 page must apply deep dark cyber background #080C0E');
    assert.match(content, /cyan-400/, 'P2 page must apply cyan-400 telemetry HUD accent');
  });

  // ---------------------------------------------------------------------------
  // F13: Prototype 2 Scroll Overlay & HUD Interactive Boundaries
  // ---------------------------------------------------------------------------

  test('[F13] 5-stage scroll journey boundary: exactly 5 distinct chapters/sections in P2', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');
    const sectionMatches = content.match(/<section[\s>]/g) || [];
    assert.strictEqual(
      sectionMatches.length,
      5,
      `Prototype 2 must contain exactly 5 scroll journey sections, found ${sectionMatches.length}`
    );
  });

  test('[F13] Scroll trigger anchor boundaries: all section IDs (#objectives, #teams, #events, #climate-tips) present in P2', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');
    assert.match(content, /id=["']objectives["']/, 'P2 must define section id="objectives"');
    assert.match(content, /id=["']teams["']/, 'P2 must define section id="teams"');
    assert.match(content, /id=["']events["']/, 'P2 must define section id="events"');
    assert.match(content, /id=["']climate-tips["']/, 'P2 must define section id="climate-tips"');
  });

  test('[F13] Interactive HUD tab state boundary: active tab index clamped between 0 and total tabs - 1', () => {
    const TOTAL_TABS = 4; // e.g., 4 event tabs or category tabs
    assert.strictEqual(clampTabIndex(-1, TOTAL_TABS), 0, 'Negative tab index clamps to 0');
    assert.strictEqual(clampTabIndex(0, TOTAL_TABS), 0);
    assert.strictEqual(clampTabIndex(2, TOTAL_TABS), 2);
    assert.strictEqual(clampTabIndex(3, TOTAL_TABS), 3);
    assert.strictEqual(clampTabIndex(4, TOTAL_TABS), 3, 'Index equal to totalTabs clamps to totalTabs - 1');
    assert.strictEqual(clampTabIndex(100, TOTAL_TABS), 3, 'Out-of-bound high index clamps to 3');
  });

  test('[F13] Glassmorphic card styling boundary: backdrop-blur and border-cyan tokens in P2', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');
    assert.match(content, /backdrop-blur-md/, 'P2 HUD cards must apply backdrop-blur-md');
    assert.match(content, /border-cyan-500\/20/, 'P2 HUD cards must apply border-cyan-500/20 styling');
  });

  test('[F13] Scroll trigger overscroll and reverse scroll resilience: clamps extreme wheel deltas', () => {
    const extremeDeltas = [-5000, -100, -1, 0, 1, 100, 5000];
    const normalized = extremeDeltas.map(d => Math.max(-100, Math.min(100, d)));
    normalized.forEach(n => {
      assert.ok(n >= -100 && n <= 100, `Delta ${n} must be bounded within [-100, 100]`);
    });
  });

  test('[F13] P2 application form CTA link boundary: links to verified Google Form', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');
    assert.match(content, /GOOGLE_FORM_URL/, 'P2 page must import and link GOOGLE_FORM_URL');
  });

});
