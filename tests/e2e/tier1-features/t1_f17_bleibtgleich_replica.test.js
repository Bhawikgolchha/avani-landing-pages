/**
 * Tier 1 Feature Coverage: F17 — Swiss Botanical Editorial Replica (/)
 *
 * Verifies the root `/` bleibtgleich.dev-inspired Avani experience:
 * - Preserves Daylight Botanical (#F9FAF7 / #163515 / #DCE7D4) + GlowGarden Night (#08140B / #6EE7B7)
 * - Uses EditorialHeroSpine (37% vertical hairline, SplitText, Canva links, canopy video, sticky split)
 * - Uses OrbitalWorkRing (Three.js 3D orbital floating card ring for 4 Events + 3 Substack + Infographic)
 * - Uses SwissIndexTable (Objectives, Teams, 11 Climate Tips + Interactive Quiz)
 * - Uses ManifestoFooter (6-step NAME_AVANI_SUBMISSION application checklist, direct contact, circular social links)
 */

const path = require('node:path');
const fs = require('node:fs');
const {
  describe,
  test,
  assertFileExists,
  assertFileContains,
  assertColorContrast,
  assert,
} = require('../harness');

const ROOT_PAGE = path.resolve(process.cwd(), 'src/app/page.tsx');
const HERO_COMP = path.resolve(process.cwd(), 'src/components/bleibtgleich/EditorialHeroSpine.tsx');
const ORBIT_COMP = path.resolve(process.cwd(), 'src/components/bleibtgleich/OrbitalWorkRing.tsx');
const DRAWER_COMP = path.resolve(process.cwd(), 'src/components/bleibtgleich/OrbitalDrawer.tsx');
const INDEX_COMP = path.resolve(process.cwd(), 'src/components/bleibtgleich/SwissIndexTable.tsx');
const FOOTER_COMP = path.resolve(process.cwd(), 'src/components/bleibtgleich/ManifestoFooter.tsx');
const THEME_COMP = path.resolve(process.cwd(), 'src/components/bleibtgleich/ThemeTransitionOverlay.tsx');

describe('F17: Swiss Botanical Editorial Replica (/)', { feature: 'F17', tier: 1 }, () => {
  test('F17.1: Root page.tsx mounts AvaniThemeProvider and all 4 bleibtgleich editorial sections', () => {
    assertFileExists(ROOT_PAGE);
    assertFileContains(ROOT_PAGE, [
      'AvaniThemeProvider',
      'EditorialHeroSpine',
      'OrbitalWorkRing',
      'SwissIndexTable',
      'ManifestoFooter',
      '#F9FAF7',
      '#163515',
      '#08140B',
      '#DCE7D4',
    ]);
  });

  test('F17.2: ThemeTransitionOverlay implements GSAP .theme-change-overlay daylight/night contrast compliance', () => {
    assertFileExists(THEME_COMP);
    assertFileContains(THEME_COMP, ['theme-change-overlay', '#08140B', '#F9FAF7', 'gsap.timeline']);
    const dayContrast = assertColorContrast('#163515', '#F9FAF7', 7.0);
    const nightContrast = assertColorContrast('#DCE7D4', '#08140B', 7.0);
    assert.ok(dayContrast >= 10, `Daylight contrast ${dayContrast} must be AAA`);
    assert.ok(nightContrast >= 10, `GlowNight contrast ${nightContrast} must be AAA`);
  });

  test('F17.3: EditorialHeroSpine includes 37% architectural spine, SplitText, Canva links, video loop, and official logo', () => {
    assertFileExists(HERO_COMP);
    assertFileContains(HERO_COMP, [
      'left-[37%]',
      'SplitText',
      '/assets/branding/logo.jpg',
      'canopy_bioluminescent_loop.mp4',
      'canvaMoodBoard1',
      'canvaMoodBoard2',
      'applicationForm',
    ]);
  });

  test('F17.4: OrbitalWorkRing renders Three.js 3D orbital cards with raycasting and click-to-open drawer', () => {
    assertFileExists(ORBIT_COMP);
    assertFileExists(DRAWER_COMP);
    assertFileContains(ORBIT_COMP, [
      'WebGLRenderer',
      'Raycaster',
      'ScrollTrigger',
      'getOrbitalWorkItems',
      'OrbitalDrawer',
    ]);
  });

  test('F17.5: SwissIndexTable unifies Objectives, Teams, 11 Climate Tips, Infographic, and Interactive Quiz', () => {
    assertFileExists(INDEX_COMP);
    assertFileContains(INDEX_COMP, [
      'AVANI_OBJECTIVES',
      'AVANI_TEAMS',
      'CLIMATE_TIPS',
      'climate_tips_infographic.webp',
      'QUIZ_QUESTIONS',
    ]);
  });

  test('F17.6: ManifestoFooter renders 6 application steps, NAME_AVANI_SUBMISSION, contacts, and oversized AVANI mark', () => {
    assertFileExists(FOOTER_COMP);
    const content = fs.readFileSync(FOOTER_COMP, 'utf8');
    assert.ok(content.includes('NAME_AVANI_SUBMISSION'));
    assert.ok(content.includes('applicationInstructions'));
    assert.ok(content.includes('applicationForm'));
    assert.ok(content.includes('emailMailto'));
    assert.ok(content.includes('phoneTel'));
    assert.ok(content.includes('AVANI'));
  });
});
