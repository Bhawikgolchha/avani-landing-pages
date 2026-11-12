/**
 * Avani Interactive Landing Pages — Tier 3: Cross-Feature Pairwise Interactions
 * 
 * Tests the combinatorial interaction points and contractual interfaces between
 * all 16 major system features (F1 through F16) defined in PROJECT.md and TEST_INFRA.md.
 * 
 * Verifies that independent subsystems (Stitch MCP exports, Google Flow media, Next.js App Router,
 * Three.js 3D SSR isolation, GSAP ScrollTrigger overlay scrub coordination, and shared
 * avaniContent.ts copy contracts) coordinate synchronously without regressions.
 */

const fs = require('node:fs');
const path = require('node:path');
const {
  describe,
  test,
  it,
  assertFileExists,
  assertFileNonEmpty,
  assertFileContains,
  assertJsonMatches,
  assertValidUrl,
  assertColorContrast,
  calculateContrastRatio,
  assert
} = require('../harness');

const PROJECT_ROOT = path.resolve(__dirname, '../../..');

// Helper to resolve paths relative to repository root
const repoPath = (rel) => path.resolve(PROJECT_ROOT, rel);

describe('Tier 3: Pairwise Subsystem Interactions (F1-F16 Combinations)', () => {

  // ---------------------------------------------------------------------------
  // Pair 1 (F1 x F3): P1 Stitch Mockup generation x Local HTML/PNG export integrity
  // ---------------------------------------------------------------------------
  test('Pair 1 (F1 x F3): P1 Stitch Mockup generation x Local HTML/PNG export integrity', { feature: 'F1', tier: 3 }, async () => {
    const metaPath = repoPath('mockups/prototype_1/metadata.json');
    const htmlPath = repoPath('mockups/prototype_1/mockup.html');
    const pngPath = repoPath('mockups/prototype_1/mockup.png');

    // 1. Verify metadata schema, screen ID, dimensions, and Stitch project association
    assertFileExists(metaPath, 'P1 Stitch metadata.json must exist');
    const meta = assertJsonMatches(metaPath, {
      projectId: '18170970693892025815',
      deviceType: 'DESKTOP'
    }, 'P1 metadata must match declared Stitch project and desktop device');

    assert.ok(
      meta.screenId && meta.screenId.startsWith('projects/18170970693892025815/screens/'),
      `P1 screenId must belong to project 18170970693892025815, got: ${meta.screenId}`
    );
    assert.strictEqual(meta.dimensions.width, 2560, 'P1 mockup virtual width must be 2560px');
    assert.strictEqual(meta.dimensions.height, 12980, 'P1 mockup virtual height must be 12980px');
    assert.match(meta.theme, /Living Canopy|Canva Mood Board Idea 5/i, 'P1 theme must reference Canva Idea 5 Living Canopy');

    // 2. Verify exported HTML markup integrity
    assertFileNonEmpty(htmlPath, 50000, 'P1 exported HTML must be >= 50KB');
    assertFileContains(htmlPath, ['<!DOCTYPE html>', 'Avani'], 'P1 HTML must be valid HTML5 referencing Avani');

    // 3. Verify exported PNG binary header and valid image size
    assertFileNonEmpty(pngPath, 500000, 'P1 exported PNG must be >= 500KB');
    const pngBuffer = fs.readFileSync(pngPath);
    const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    assert.ok(
      pngBuffer.subarray(0, 8).equals(pngMagic),
      'P1 mockup.png must have valid PNG magic signature bytes'
    );
    const pixelWidth = pngBuffer.readUInt32BE(16);
    const pixelHeight = pngBuffer.readUInt32BE(20);
    assert.ok(pixelWidth > 0 && pixelHeight > 0, `P1 PNG dimensions must be non-zero (got ${pixelWidth}x${pixelHeight})`);
  });

  // ---------------------------------------------------------------------------
  // Pair 2 (F2 x F3): P2 Stitch Mockup generation x Local HTML/PNG export integrity
  // ---------------------------------------------------------------------------
  test('Pair 2 (F2 x F3): P2 Stitch Mockup generation x Local HTML/PNG export integrity', { feature: 'F2', tier: 3 }, async () => {
    const metaPath = repoPath('mockups/prototype_2/metadata.json');
    const htmlPath = repoPath('mockups/prototype_2/mockup.html');
    const pngPath = repoPath('mockups/prototype_2/mockup.png');

    // 1. Verify metadata schema, screen ID, dimensions, and Stitch project association
    assertFileExists(metaPath, 'P2 Stitch metadata.json must exist');
    const meta = assertJsonMatches(metaPath, {
      projectId: '12011247087668392922',
      deviceType: 'DESKTOP'
    }, 'P2 metadata must match declared Stitch project and desktop device');

    assert.ok(
      meta.screenId && meta.screenId.startsWith('projects/12011247087668392922/screens/'),
      `P2 screenId must belong to project 12011247087668392922, got: ${meta.screenId}`
    );
    assert.strictEqual(meta.dimensions.width, 2560, 'P2 mockup virtual width must be 2560px');
    assert.strictEqual(meta.dimensions.height, 15438, 'P2 mockup virtual height must be 15438px');
    assert.match(meta.theme, /Modern Eco-Tech|Interactive Biosphere/i, 'P2 theme must reference Eco-Tech Biosphere');

    // 2. Verify exported HTML markup integrity
    assertFileNonEmpty(htmlPath, 50000, 'P2 exported HTML must be >= 50KB');
    assertFileContains(htmlPath, ['<!DOCTYPE html>', 'Avani'], 'P2 HTML must be valid HTML5 referencing Avani');

    // 3. Verify exported PNG binary header and valid image size
    assertFileNonEmpty(pngPath, 500000, 'P2 exported PNG must be >= 500KB');
    const pngBuffer = fs.readFileSync(pngPath);
    const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    assert.ok(
      pngBuffer.subarray(0, 8).equals(pngMagic),
      'P2 mockup.png must have valid PNG magic signature bytes'
    );
    const pixelWidth = pngBuffer.readUInt32BE(16);
    const pixelHeight = pngBuffer.readUInt32BE(20);
    assert.ok(pixelWidth > 0 && pixelHeight > 0, `P2 PNG dimensions must be non-zero (got ${pixelWidth}x${pixelHeight})`);
  });

  // ---------------------------------------------------------------------------
  // Pair 3 (F4 x F11): Google Flow generated media x P1 scroll overlay card rendering
  // ---------------------------------------------------------------------------
  test('Pair 3 (F4 x F11): Google Flow generated media x P1 scroll overlay card rendering', { feature: 'F4', tier: 3 }, async () => {
    // 1. Verify hero canopy asset generated by Google Flow
    const heroCanopyPath = repoPath('public/assets/images/hero_nature_canopy.webp');
    assertFileNonEmpty(heroCanopyPath, 100000, 'P1 Hero canopy webp must be >= 100KB');
    const heroBuffer = fs.readFileSync(heroCanopyPath);
    assert.strictEqual(heroBuffer.subarray(0, 4).toString('ascii'), 'RIFF', 'Hero image must be RIFF container');
    assert.strictEqual(heroBuffer.subarray(8, 12).toString('ascii'), 'WEBP', 'Hero image must be WEBP format');

    // 2. Verify all 4 event assets exist and resolve to valid WEBP headers
    const eventAssetKeys = [
      'event_dps_drive.webp',
      'event_invictus_denim.webp',
      'event_orphanage_aarogi.webp',
      'event_waste_workshop.webp'
    ];

    for (const key of eventAssetKeys) {
      const assetPath = repoPath(`public/assets/images/${key}`);
      assertFileNonEmpty(assetPath, 50000, `Event asset "${key}" must be >= 50KB`);
      const b = fs.readFileSync(assetPath);
      assert.strictEqual(b.subarray(0, 4).toString('ascii'), 'RIFF', `${key} must have RIFF container`);
      assert.strictEqual(b.subarray(8, 12).toString('ascii'), 'WEBP', `${key} must have WEBP signature`);
    }

    // 3. Verify P1 implementation imports and embeds events and objectives in scroll overlay
    const p1PagePath = repoPath('src/app/prototype-1/page.tsx');
    assertFileContains(p1PagePath, [
      'AVANI_OBJECTIVES',
      'AVANI_TEAMS',
      'AVANI_EVENTS',
      'CLIMATE_TIPS',
      'useLenis'
    ], 'P1 page must import all core content models and smooth scrolling hook');
  });

  // ---------------------------------------------------------------------------
  // Pair 4 (F4 x F13): Google Flow media x P2 dark glassmorphic HUD tabs rendering
  // ---------------------------------------------------------------------------
  test('Pair 4 (F4 x F13): Google Flow media x P2 dark glassmorphic HUD tabs rendering', { feature: 'F4', tier: 3 }, async () => {
    // 1. Verify P2 hero globe asset and climate tips infographic generated by Google Flow
    const heroGlobePath = repoPath('public/assets/images/hero_ecotech_globe.webp');
    const tipsInfographicPath = repoPath('public/assets/images/climate_tips_infographic.webp');

    assertFileNonEmpty(heroGlobePath, 100000, 'P2 Hero globe webp must be >= 100KB');
    assertFileNonEmpty(tipsInfographicPath, 100000, 'Climate tips infographic webp must be >= 100KB');

    const globeBuffer = fs.readFileSync(heroGlobePath);
    assert.strictEqual(globeBuffer.subarray(0, 4).toString('ascii'), 'RIFF');
    assert.strictEqual(globeBuffer.subarray(8, 12).toString('ascii'), 'WEBP');

    // 2. Verify P2 overlay implementation uses dark glassmorphic telemetry classes
    const p2PagePath = repoPath('src/app/prototype-2/page.tsx');
    assertFileContains(p2PagePath, [
      'bg-[#080C0E]',
      'backdrop-blur-md',
      'border-cyan-500',
      'Bangalore Beacon Telemetry',
      '12.9716° N, 77.5946° E'
    ], 'P2 page must implement dark glassmorphic styling and Bangalore telemetry beacon');

    // 3. Verify color harmony: Cyan accents (#22D3EE) on dark background (#080C0E)
    const ratio = assertColorContrast('#22D3EE', '#080C0E', 4.5, 'P2 HUD cyan text must contrast with dark background');
    assert.ok(ratio >= 7.0, `P2 HUD contrast ratio (${ratio}:1) must satisfy WCAG AAA (>= 7.0:1)`);
  });

  // ---------------------------------------------------------------------------
  // Pair 5 (F5 x F8): Brand logo asset x Universal Navbar rendering and brand link
  // ---------------------------------------------------------------------------
  test('Pair 5 (F5 x F8): Brand logo asset x Universal Navbar rendering and brand link', { feature: 'F5', tier: 3 }, async () => {
    // 1. Verify Avani brand logo file integrity
    const logoPath = repoPath('public/assets/branding/logo.jpg');
    assertFileNonEmpty(logoPath, 20000, 'Avani logo must be >= 20KB');
    const logoBuf = fs.readFileSync(logoPath);
    const jpegMagic = Buffer.from([0xff, 0xd8, 0xff]);
    assert.ok(logoBuf.subarray(0, 3).equals(jpegMagic), 'Logo must have valid JPEG header');

    // 2. Verify Navbar.tsx mounts logo, links to "/", and includes accessibility tags
    const navbarPath = repoPath('src/components/common/Navbar.tsx');
    assertFileContains(navbarPath, [
      '/assets/branding/logo.jpg',
      'alt="Avani Logo"',
      'href="/"',
      'Earth In Our Hands',
      'Youth Org'
    ], 'Navbar must render Avani logo inside root link with brand badge');
  });

  // ---------------------------------------------------------------------------
  // Pair 6 (F5 x F9): Brand logo asset x Central Comparison Hub (/) header rendering
  // ---------------------------------------------------------------------------
  test('Pair 6 (F5 x F9): Brand logo asset x Central Comparison Hub (/hub) header rendering', { feature: 'F5', tier: 3 }, async () => {
    const hubPagePath = repoPath('src/app/hub/page.tsx');

    // Hub page must mount Navbar (which embeds logo) and feature Avani branding in hero
    assertFileContains(hubPagePath, [
      '<Navbar />',
      'AVANI_ORGANIZATION.name',
      '#163515',
      'Explore Prototype 1 (Living Canopy)',
      'Explore Prototype 2 (Eco-Tech Biosphere)'
    ], 'Comparison Hub must embed Navbar and showcase both prototypes');

    // Primary brand green (#163515) on Hub background (#FDFEFC) must meet WCAG AAA
    const contrastRatio = assertColorContrast('#163515', '#FDFEFC', 7.0, 'Hub brand color must meet WCAG AAA contrast');
    assert.ok(contrastRatio > 10.0, 'Hub brand contrast ratio must be exceptionally high');
  });

  // ---------------------------------------------------------------------------
  // Pair 7 (F6 x F10): Next.js App Router layout x P1 3D Canvas SSR isolation
  // ---------------------------------------------------------------------------
  test('Pair 7 (F6 x F10): Next.js App Router layout x P1 3D Canvas SSR isolation', { feature: 'F6', tier: 3 }, async () => {
    // 1. Verify Root Layout App Router configuration
    const layoutPath = repoPath('src/app/layout.tsx');
    assertFileContains(layoutPath, [
      'export const metadata',
      'Avani',
      '<html',
      'lang="en"',
      '<body'
    ], 'Root layout must configure HTML lang and Next.js metadata');

    // 2. Verify P1 Canvas SSR isolation via next/dynamic with ssr: false
    const p1Path = repoPath('src/app/prototype-1/page.tsx');
    assertFileContains(p1Path, [
      "import dynamic from 'next/dynamic'",
      '{ ssr: false }',
      'fixed inset-0 z-0 pointer-events-none',
      'relative z-10'
    ], 'P1 3D Canvas must have { ssr: false } and non-blocking pointer events');
  });

  // ---------------------------------------------------------------------------
  // Pair 8 (F6 x F12): Next.js App Router layout x P2 3D Canvas particle system initialization
  // ---------------------------------------------------------------------------
  test('Pair 8 (F6 x F12): Next.js App Router layout x P2 3D Canvas particle system initialization', { feature: 'F6', tier: 3 }, async () => {
    const p2Path = repoPath('src/app/prototype-2/page.tsx');

    // 1. Verify dynamic loading with SSR disabled
    assertFileContains(p2Path, [
      "import dynamic from 'next/dynamic'",
      '{ ssr: false }',
      'fixed inset-0 z-0 pointer-events-none',
      'opacity-40'
    ], 'P2 3D Canvas must disable SSR and remain fixed in background');

    // 2. Verify telemetry card layering over canvas
    assertFileContains(p2Path, [
      'relative z-10',
      'Bangalore Beacon Telemetry · 12.9716° N, 77.5946° E'
    ], 'P2 foreground content must be layered above canvas at z-10');
  });

  // ---------------------------------------------------------------------------
  // Pair 9 (F7 x F11): Shared avaniContent.ts module x P1 5-stage scroll journey cards
  // ---------------------------------------------------------------------------
  test('Pair 9 (F7 x F11): Shared avaniContent.ts module x P1 5-stage scroll journey cards', { feature: 'F7', tier: 3 }, async () => {
    const content = require(repoPath('src/lib/avaniContent.ts'));

    // Assert exact model counts
    assert.strictEqual(content.AVANI_OBJECTIVES.length, 5, 'Exactly 5 objectives in content module');
    assert.strictEqual(content.AVANI_TEAMS.length, 5, 'Exactly 5 teams in content module');
    assert.strictEqual(content.AVANI_EVENTS.length, 4, 'Exactly 4 events in content module');
    assert.strictEqual(content.CLIMATE_TIPS.length, 11, 'Exactly 11 climate tips in content module');

    // Verify P1 page renders all 5 scroll chapters
    const p1Path = repoPath('src/app/prototype-1/page.tsx');
    assertFileContains(p1Path, [
      'Prototype 1: The Living Canopy',
      'id="objectives"',
      'id="teams"',
      'id="events"',
      'id="climate-tips"',
      'AVANI_OBJECTIVES.map',
      'AVANI_TEAMS.map',
      'AVANI_EVENTS.map',
      'CLIMATE_TIPS.map'
    ], 'P1 page must map all 5 content chapters in order');
  });

  // ---------------------------------------------------------------------------
  // Pair 10 (F7 x F13): Shared avaniContent.ts module x P2 HUD interactive sections
  // ---------------------------------------------------------------------------
  test('Pair 10 (F7 x F13): Shared avaniContent.ts module x P2 HUD interactive sections', { feature: 'F7', tier: 3 }, async () => {
    const p2Path = repoPath('src/app/prototype-2/page.tsx');

    // Verify P2 maps all 5 directives, 5 units, 4 field ops, and 11 protocols
    assertFileContains(p2Path, [
      'DIR_0',
      'id="objectives"',
      'id="teams"',
      'id="events"',
      'id="climate-tips"',
      'PROTOCOL #',
      'climate-tip-',
      'AVANI_OBJECTIVES.map',
      'AVANI_TEAMS.map',
      'AVANI_EVENTS.map',
      'CLIMATE_TIPS.map'
    ], 'P2 page must map all content collections into telemetry HUD cards');
  });

  // ---------------------------------------------------------------------------
  // Pair 11 (F7 x F14): Shared avaniContent.ts link data x Contact & Link verification across all social channels
  // ---------------------------------------------------------------------------
  test('Pair 11 (F7 x F14): Shared avaniContent.ts link data x Contact & Link verification across all social channels', { feature: 'F7', tier: 3 }, async () => {
    const { EXTERNAL_LINKS, avaniContact } = require(repoPath('src/lib/avaniContent.ts'));

    // Verify all primary channels are valid URLs with allowed protocols
    assertValidUrl(EXTERNAL_LINKS.applicationForm, 'Application form URL must be valid');
    assertValidUrl(EXTERNAL_LINKS.linkedIn, 'LinkedIn URL must be valid');
    assertValidUrl(EXTERNAL_LINKS.substack, 'Substack publication URL must be valid');
    assertValidUrl(EXTERNAL_LINKS.instagram, 'Instagram deep link URL must be valid');
    assertValidUrl(EXTERNAL_LINKS.instagramClean, 'Instagram canonical URL must be valid');
    assertValidUrl(EXTERNAL_LINKS.emailMailto, 'Email mailto link must be valid');
    assertValidUrl(EXTERNAL_LINKS.phoneTel, 'Phone tel link must be valid');

    assert.strictEqual(EXTERNAL_LINKS.email, 'avaniyocc@gmail.com');
    assert.strictEqual(EXTERNAL_LINKS.phone, '+91 8050931769');

    // Verify all 3 Substack articles
    assert.strictEqual(EXTERNAL_LINKS.substackArticles.length, 3, 'Must have exactly 3 Substack articles');
    EXTERNAL_LINKS.substackArticles.forEach((art, idx) => {
      assertValidUrl(art.url, `Substack article ${idx} URL must be valid`);
      assertValidUrl(art.coverImageUrl, `Substack article ${idx} cover image URL must be valid`);
      assert.ok(art.title.length > 5, `Substack article ${idx} must have non-empty title`);
    });

    // Check avaniContact interface mirror
    assert.strictEqual(avaniContact.applicationFormUrl, EXTERNAL_LINKS.applicationForm);
    assert.strictEqual(avaniContact.email, EXTERNAL_LINKS.email);
    assert.strictEqual(avaniContact.phone, EXTERNAL_LINKS.phone);
  });

  // ---------------------------------------------------------------------------
  // Pair 12 (F8 x F9): Universal Navbar prototype switcher x Navigation routes (/, /prototype-1, /prototype-2)
  // ---------------------------------------------------------------------------
  test('Pair 12 (F8 x F9): Universal Navbar prototype switcher x Navigation routes (/, /prototype-1, /prototype-2)', { feature: 'F8', tier: 3 }, async () => {
    const navbarPath = repoPath('src/components/common/Navbar.tsx');

    // 1. Verify PROTOTYPES array declares exactly the 3 supported routes
    assertFileContains(navbarPath, [
      "href: '/'",
      "href: '/prototype-1'",
      "href: '/prototype-2'"
    ], 'Navbar must register routes /, /prototype-1, and /prototype-2');

    // 2. Verify all route page files exist on disk
    assertFileExists(repoPath('src/app/page.tsx'), 'Editorial flagship route page must exist');
    assertFileExists(repoPath('src/app/hub/page.tsx'), 'Comparison Hub route page must exist');
    assertFileExists(repoPath('src/app/prototype-1/page.tsx'), 'Prototype 1 route page must exist');
    assertFileExists(repoPath('src/app/prototype-2/page.tsx'), 'Prototype 2 route page must exist');

    // 3. Verify mobile drawer also includes prototype switcher
    assertFileContains(navbarPath, [
      'Switch Interactive Prototype',
      'mobileMenuOpen'
    ], 'Navbar must support mobile menu prototype switching');
  });

  // ---------------------------------------------------------------------------
  // Pair 13 (F10 x F11): P1 3D scene canvas fixed positioning x GSAP ScrollTrigger overlay scrub coordination
  // ---------------------------------------------------------------------------
  test('Pair 13 (F10 x F11): P1 3D scene canvas fixed positioning x GSAP ScrollTrigger overlay scrub coordination', { feature: 'F10', tier: 3 }, async () => {
    const p1Path = repoPath('src/app/prototype-1/page.tsx');
    const lenisPath = repoPath('src/hooks/useLenis.ts');

    assertFileExists(lenisPath, 'useLenis hook must exist for scroll coordination');
    assertFileContains(lenisPath, [
      'gsap.ticker.add',
      'ScrollTrigger.update',
      'lenis.destroy()'
    ], 'useLenis must bind Lenis to GSAP ScrollTrigger ticker and handle cleanup');

    // Verify canvas does not steal pointer clicks
    assertFileContains(p1Path, [
      'pointer-events-none',
      'fixed inset-0 z-0'
    ], 'P1 3D canvas container must have pointer-events-none for scroll overlay clickability');
  });

  // ---------------------------------------------------------------------------
  // Pair 14 (F12 x F13): P2 3D particle globe canvas x HUD telemetry cards synchronized scroll rotation
  // ---------------------------------------------------------------------------
  test('Pair 14 (F12 x F13): P2 3D particle globe canvas x HUD telemetry cards synchronized scroll rotation', { feature: 'F12', tier: 3 }, async () => {
    const p2Path = repoPath('src/app/prototype-2/page.tsx');

    // Verify HUD telemetry chapters are stacked over fixed particle globe canvas
    assertFileContains(p2Path, [
      'fixed inset-0 z-0 pointer-events-none opacity-40',
      'relative z-10 max-w-5xl mx-auto',
      'useLenis'
    ], 'P2 page must coordinate fixed canvas and smooth-scrolling telemetry HUD cards');
  });

  // ---------------------------------------------------------------------------
  // Pair 15 (F14 x F8): Universal Footer social links x Verified Avani external URLs
  // ---------------------------------------------------------------------------
  test('Pair 15 (F14 x F8): Universal Footer social links x Verified Avani external URLs', { feature: 'F14', tier: 3 }, async () => {
    const footerPath = repoPath('src/components/common/Footer.tsx');

    // Verify Footer mounts verified external links with secure target and rel attributes
    assertFileContains(footerPath, [
      'EXTERNAL_LINKS.applicationForm',
      'EXTERNAL_LINKS.linkedIn',
      'EXTERNAL_LINKS.substack',
      'EXTERNAL_LINKS.instagramClean',
      'EXTERNAL_LINKS.emailMailto',
      'EXTERNAL_LINKS.phoneTel',
      'EXTERNAL_LINKS.substackArticles.map',
      'target="_blank"',
      'rel="noopener noreferrer"'
    ], 'Footer must render all external links with secure target="_blank" and rel="noopener noreferrer"');
  });

  // ---------------------------------------------------------------------------
  // Pair 16 (F15 x F16): Next.js build compilation gate x Browser visual styling and contrast assertions
  // ---------------------------------------------------------------------------
  test('Pair 16 (F15 x F16): Next.js build compilation gate x Browser visual styling and contrast assertions', { feature: 'F15', tier: 3 }, async () => {
    // 1. Verify build configuration and Tailwind setup
    const pkgPath = repoPath('package.json');
    assertFileContains(pkgPath, [
      '"build": "next build"',
      'next',
      'three',
      '@react-three/fiber'
    ], 'package.json must contain Next.js build script and 3D dependencies');

    // 2. Verify WCAG AA and AAA color contrasts across all primary themes
    // Primary Brand Green on light background
    const p1Ratio = assertColorContrast('#163515', '#F9FAF7', 4.5, 'P1 brand green must meet WCAG AA contrast');
    assert.ok(p1Ratio >= 7.0, `P1 contrast (${p1Ratio}:1) must satisfy WCAG AAA`);

    // P1 CTA text on brand green button
    const ctaRatio = assertColorContrast('#DCE7D4', '#163515', 4.5, 'CTA text must contrast with brand button');
    assert.ok(ctaRatio >= 7.0, `CTA contrast (${ctaRatio}:1) must satisfy WCAG AAA`);

    // P2 Cyan text on dark background
    const p2Ratio = assertColorContrast('#22D3EE', '#080C0E', 4.5, 'P2 cyan must contrast with dark background');
    assert.ok(p2Ratio >= 7.0, `P2 contrast (${p2Ratio}:1) must satisfy WCAG AAA`);
  });

  // ---------------------------------------------------------------------------
  // Adversarial Pairwise Tests: Boundary & Error Propagation Gating
  // ---------------------------------------------------------------------------
  test('Pairwise Adversarial 1: Invalid external URL protocol injection is rejected', { feature: 'F14', tier: 3 }, async () => {
    const maliciousUrls = [
      'javascript:alert(1)',
      'data:text/html,<script>alert(1)</script>',
      'ftp://ftp.example.com/file.txt',
      'file:///etc/passwd'
    ];

    for (const badUrl of maliciousUrls) {
      assert.throws(
        () => assertValidUrl(badUrl),
        /assertValidUrl|Invalid URL protocol/i,
        `Malicious protocol URL "${badUrl}" must be rejected by test harness validator`
      );
    }
  });

  test('Pairwise Adversarial 2: Sub-threshold color contrast combinations are detected and rejected', { feature: 'F16', tier: 3 }, async () => {
    // Low contrast grey-on-grey combinations that fail WCAG AA (< 4.5:1)
    const lowContrastPairs = [
      { fg: '#888888', bg: '#777777' },
      { fg: '#CCCCCC', bg: '#FFFFFF' },
      { fg: '#333333', bg: '#222222' }
    ];

    for (const pair of lowContrastPairs) {
      assert.throws(
        () => assertColorContrast(pair.fg, pair.bg, 4.5),
        /below required threshold/i,
        `Low contrast pair ${pair.fg} on ${pair.bg} must fail assertion`
      );
    }
  });

});
