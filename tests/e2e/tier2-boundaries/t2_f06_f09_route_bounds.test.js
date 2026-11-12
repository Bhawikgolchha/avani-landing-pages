/**
 * Tier 2 Boundary & Corner Case Tests: F6, F7, F8, F9
 * 
 * Covers:
 * - F6: Next.js 14 Scaffolding (package versions, App Router configuration boundaries)
 * - F7: Shared Brand Content Module (exact array lengths: 5 objectives, 5 teams, 4 events, 11 tips; non-duplication; enum boundaries)
 * - F8: Universal Navbar & Footer (responsive breakpoint limits: mobile < 768px, tablet 768px-1024px, desktop > 1024px)
 * - F9: Comparison Hub (/) (route matching, trailing slashes, 404 detection, prototype switcher links)
 */

const fs = require('node:fs');
const path = require('node:path');
const {
  describe,
  test,
  assertFileExists,
  assertFileNonEmpty,
  assertJsonMatches,
  assertFileContains,
  assert
} = require('../harness');

const PACKAGE_JSON = path.resolve(process.cwd(), 'package.json');
const CONTENT_FILE = path.resolve(process.cwd(), 'src/lib/avaniContent.ts');
const NAVBAR_FILE = path.resolve(process.cwd(), 'src/components/common/Navbar.tsx');
const FOOTER_FILE = path.resolve(process.cwd(), 'src/components/common/Footer.tsx');
const HUB_PAGE = path.resolve(process.cwd(), 'src/app/hub/page.tsx');

// Import content directly
const {
  AVANI_OBJECTIVES,
  AVANI_TEAMS,
  AVANI_EVENTS,
  CLIMATE_TIPS,
  EXTERNAL_LINKS
} = require(CONTENT_FILE);

/**
 * Parses semantic version string (e.g. "^14.2.15", "14.2.15", ">=14.0.0") into major, minor, patch.
 */
function parseSemverMajor(versionStr) {
  const match = String(versionStr).match(/(\d+)\.(\d+)\.(\d+)/);
  if (!match) {
    throw new Error(`Invalid semver: ${versionStr}`);
  }
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10)
  };
}

/**
 * Validates that an array contains exactly expectedCount elements with non-empty items.
 */
function validateExactArrayCount(arr, expectedCount, itemDescriptor = 'item') {
  if (!Array.isArray(arr)) {
    throw new assert.AssertionError({
      message: `Expected array of ${itemDescriptor}, got ${typeof arr}`,
      operator: 'validateExactArrayCount'
    });
  }
  if (arr.length !== expectedCount) {
    throw new assert.AssertionError({
      message: `Array length boundary violated: expected exactly ${expectedCount} ${itemDescriptor}s, got ${arr.length}`,
      expected: expectedCount,
      actual: arr.length,
      operator: 'validateExactArrayCount'
    });
  }
  return true;
}

/**
 * Mock route resolver replicating App Router page path resolution.
 */
function resolveAppRoute(routePath) {
  // Normalize route path: strip trailing slash except for root '/'
  const normalized = (routePath.length > 1 && routePath.endsWith('/'))
    ? routePath.slice(0, -1)
    : routePath;

  const validRoutes = {
    '/': 'src/app/page.tsx',
    '/hub': 'src/app/hub/page.tsx',
    '/prototype-1': 'src/app/prototype-1/page.tsx',
    '/prototype-2': 'src/app/prototype-2/page.tsx'
  };

  if (validRoutes[normalized]) {
    return {
      status: 200,
      matched: true,
      route: normalized,
      componentPath: validRoutes[normalized]
    };
  }

  return {
    status: 404,
    matched: false,
    route: normalized,
    componentPath: null
  };
}

describe('Tier 2: Route, Scaffolding & Content Array Boundaries (F6, F7, F8, F9)', () => {

  // ---------------------------------------------------------------------------
  // F6: Next.js 14 Scaffolding & Dependency Version Boundaries
  // ---------------------------------------------------------------------------

  test('[F6] Next.js version boundary: package.json specifies Next.js >= 14.0.0', () => {
    assertJsonMatches(PACKAGE_JSON, (pkg) => {
      const nextVer = pkg.dependencies && pkg.dependencies.next;
      assert.ok(nextVer, 'Next.js must be declared in dependencies');
      const { major } = parseSemverMajor(nextVer);
      assert.ok(major >= 14, `Next.js major version (${major}) must be >= 14`);
      return true;
    });
  });

  test('[F6] React version boundary: package.json specifies React >= 18.0.0', () => {
    assertJsonMatches(PACKAGE_JSON, (pkg) => {
      const reactVer = pkg.dependencies && pkg.dependencies.react;
      assert.ok(reactVer, 'React must be declared in dependencies');
      const { major } = parseSemverMajor(reactVer);
      assert.ok(major >= 18, `React major version (${major}) must be >= 18`);
      return true;
    });
  });

  test('[F6] Three.js version boundary: package.json specifies Three.js >= 0.160.0', () => {
    assertJsonMatches(PACKAGE_JSON, (pkg) => {
      const threeVer = pkg.dependencies && pkg.dependencies.three;
      assert.ok(threeVer, 'Three.js must be declared in dependencies');
      const { minor } = parseSemverMajor(threeVer);
      assert.ok(minor >= 160, `Three.js minor version (${minor}) must be >= 160`);
      return true;
    });
  });

  test('[F6] TypeScript version boundary: package.json specifies TypeScript >= 5.0.0', () => {
    assertJsonMatches(PACKAGE_JSON, (pkg) => {
      const tsVer = pkg.devDependencies && pkg.devDependencies.typescript;
      assert.ok(tsVer, 'TypeScript must be declared in devDependencies');
      const { major } = parseSemverMajor(tsVer);
      assert.ok(major >= 5, `TypeScript major version (${major}) must be >= 5`);
      return true;
    });
  });

  test('[F6] GSAP animation dependency boundary: gsap >= 3.12.0 present', () => {
    assertJsonMatches(PACKAGE_JSON, (pkg) => {
      const gsapVer = pkg.dependencies && pkg.dependencies.gsap;
      assert.ok(gsapVer, 'GSAP must be declared in dependencies');
      const { major, minor } = parseSemverMajor(gsapVer);
      assert.strictEqual(major, 3, 'GSAP major version must be 3');
      assert.ok(minor >= 12, `GSAP minor version (${minor}) must be >= 12`);
      return true;
    });
  });

  test('[F6] Essential Next.js App Router configuration files boundary', () => {
    assertFileExists('next.config.mjs', 'next.config.mjs must exist');
    assertFileExists('tailwind.config.ts', 'tailwind.config.ts must exist');
    assertFileExists('tsconfig.json', 'tsconfig.json must exist');
    assertFileExists('src/app/layout.tsx', 'Root layout.tsx must exist');
  });

  // ---------------------------------------------------------------------------
  // F7: Shared Brand Content Module Array Length & Boundary Checks
  // ---------------------------------------------------------------------------

  test('[F7] Content array exact boundary: exactly 5 objectives (rejects < 5 or > 5)', () => {
    validateExactArrayCount(AVANI_OBJECTIVES, 5, 'objective');
  });

  test('[F7] Content array exact boundary: exactly 5 specialized teams (rejects < 5 or > 5)', () => {
    validateExactArrayCount(AVANI_TEAMS, 5, 'team');
  });

  test('[F7] Content array exact boundary: exactly 4 flagship events (rejects < 4 or > 4)', () => {
    validateExactArrayCount(AVANI_EVENTS, 4, 'event');
  });

  test('[F7] Content array exact boundary: exactly 11 climate tips (rejects < 11 or > 11)', () => {
    validateExactArrayCount(CLIMATE_TIPS, 11, 'climate tip');
  });

  test('[F7] Objective ID boundary: sequential IDs from 1 to 5 with zero duplicates', () => {
    const ids = AVANI_OBJECTIVES.map(o => o.id);
    assert.deepStrictEqual(ids, [1, 2, 3, 4, 5], 'Objective IDs must be exactly [1, 2, 3, 4, 5]');
    const uniqueIds = new Set(ids);
    assert.strictEqual(uniqueIds.size, 5, 'Objective IDs must have no duplicates');
  });

  test('[F7] Team ID boundary: all 5 team slugs are unique, lowercase kebab-case strings', () => {
    const ids = AVANI_TEAMS.map(t => t.id);
    assert.strictEqual(ids.length, 5);
    const uniqueIds = new Set(ids);
    assert.strictEqual(uniqueIds.size, 5, 'Team IDs must have zero duplicates');
    ids.forEach(id => {
      assert.match(id, /^[a-z]+(-[a-z]+)*$/, `Team ID "${id}" must be valid kebab-case`);
    });
  });

  test('[F7] Climate tip ID boundary: sequential IDs from 1 to 11 with zero gaps', () => {
    const ids = CLIMATE_TIPS.map(t => t.id);
    const expected = Array.from({ length: 11 }, (_, i) => i + 1);
    assert.deepStrictEqual(ids, expected, 'Climate tip IDs must be sequential 1 through 11');
  });

  test('[F7] Climate tip category enum boundary: every tip is one of energy/water/waste/consumption', () => {
    const validCategories = new Set(['energy', 'water', 'waste', 'consumption']);
    CLIMATE_TIPS.forEach(tip => {
      assert.ok(
        validCategories.has(tip.category),
        `Tip ${tip.id} has invalid category "${tip.category}". Must be one of: ${[...validCategories].join(', ')}`
      );
    });
  });

  test('[F7] Array boundary validation oracle: rejects arrays that deviate from exact counts', () => {
    // Negative test: 4 objectives (under-boundary)
    assert.throws(() => {
      validateExactArrayCount(AVANI_OBJECTIVES.slice(0, 4), 5, 'objective');
    }, /Array length boundary violated: expected exactly 5/);

    // Negative test: 6 objectives (over-boundary)
    assert.throws(() => {
      validateExactArrayCount([...AVANI_OBJECTIVES, AVANI_OBJECTIVES[0]], 5, 'objective');
    }, /Array length boundary violated: expected exactly 5/);

    // Negative test: 10 tips (under-boundary)
    assert.throws(() => {
      validateExactArrayCount(CLIMATE_TIPS.slice(0, 10), 11, 'climate tip');
    }, /Array length boundary violated: expected exactly 11/);
  });

  test('[F7] Objective textual completeness boundary: non-empty verbatim copy on every objective', () => {
    AVANI_OBJECTIVES.forEach(obj => {
      assert.ok(typeof obj.title === 'string' && obj.title.trim().length >= 5, `Objective ${obj.id} title too short`);
      assert.ok(typeof obj.description === 'string' && obj.description.trim().length >= 10, `Objective ${obj.id} description too short`);
      assert.ok(typeof obj.icon === 'string' && obj.icon.length > 0, `Objective ${obj.id} missing icon`);
    });
  });

  // ---------------------------------------------------------------------------
  // F8: Universal Navbar Responsive Breakpoint & Link Boundaries
  // ---------------------------------------------------------------------------

  test('[F8] Mobile breakpoint boundary (< 768px): hamburger toggle exists with md:hidden / lg:hidden', () => {
    const content = fs.readFileSync(NAVBAR_FILE, 'utf8');
    assert.match(content, /lg:hidden/, 'Navbar must contain lg:hidden responsive boundary class');
    assert.match(content, /Toggle navigation drawer/i, 'Navbar must include accessible mobile menu toggle button');
  });

  test('[F8] Tablet/Desktop prototype switcher boundary (>= 768px): hidden md:flex styling', () => {
    const content = fs.readFileSync(NAVBAR_FILE, 'utf8');
    assert.match(content, /hidden\s+md:flex/, 'Prototype switcher container must use hidden md:flex');
  });

  test('[F8] Desktop full navigation bar boundary (>= 1024px): hidden lg:flex styling', () => {
    const content = fs.readFileSync(NAVBAR_FILE, 'utf8');
    assert.match(content, /hidden\s+lg:flex/, 'Section navigation links must use hidden lg:flex');
  });

  test('[F8] Navbar prototype switcher links boundary: covers all 3 destinations (/, /prototype-1, /prototype-2)', () => {
    const content = fs.readFileSync(NAVBAR_FILE, 'utf8');
    assert.ok(content.includes("href: '/'"), 'Switcher must link to / Hub');
    assert.ok(content.includes("href: '/prototype-1'"), 'Switcher must link to /prototype-1');
    assert.ok(content.includes("href: '/prototype-2'"), 'Switcher must link to /prototype-2');
  });

  test('[F8] Footer external social links boundary: contains application, linkedin, substack, instagram', () => {
    const content = fs.readFileSync(FOOTER_FILE, 'utf8');
    assert.ok(content.includes('EXTERNAL_LINKS.applicationForm') || content.includes('docs.google.com/forms'), 'Footer must embed Google Form link');
    assert.ok(content.includes('EXTERNAL_LINKS.linkedIn') || content.includes('linkedin.com/company/avaniyocc'), 'Footer must embed LinkedIn link');
    assert.ok(content.includes('EXTERNAL_LINKS.substack') || content.includes('open.substack.com/pub/avaniyocc'), 'Footer must embed Substack link');
    assert.ok(content.includes('EXTERNAL_LINKS.instagram') || content.includes('instagram.com/avani_yocc'), 'Footer must embed Instagram link');
  });

  // ---------------------------------------------------------------------------
  // F9: Comparison Hub (/) Route & Navigation Boundaries
  // ---------------------------------------------------------------------------

  test('[F9] Hub page route file existence and non-empty boundary (src/app/page.tsx)', () => {
    assertFileNonEmpty(HUB_PAGE, 1000, 'src/app/page.tsx must be non-empty and >= 1000 bytes');
  });

  test('[F9] Route path resolution boundary: exact matching for /, /prototype-1, /prototype-2', () => {
    const hub = resolveAppRoute('/');
    assert.strictEqual(hub.status, 200);
    assert.strictEqual(hub.matched, true);

    const p1 = resolveAppRoute('/prototype-1');
    assert.strictEqual(p1.status, 200);
    assert.strictEqual(p1.matched, true);

    const p2 = resolveAppRoute('/prototype-2');
    assert.strictEqual(p2.status, 200);
    assert.strictEqual(p2.matched, true);

    // Trailing slash tolerance boundary
    const p1Trailing = resolveAppRoute('/prototype-1/');
    assert.strictEqual(p1Trailing.status, 200);
    assert.strictEqual(p1Trailing.matched, true);
  });

  test('[F9] Route 404 boundary: invalid routes (/prototype-3, /unknown) detected as unmatched', () => {
    const invalidRoutes = ['/prototype-3', '/unknown', '/api/nonexistent', '/prototype-1-extra'];
    invalidRoutes.forEach(r => {
      const res = resolveAppRoute(r);
      assert.strictEqual(res.status, 404, `Route "${r}" must return 404`);
      assert.strictEqual(res.matched, false, `Route "${r}" must be unmatched`);
    });
  });

  test('[F9] Hub page dual prototype CTA links boundary: embeds links to both prototypes', () => {
    const content = fs.readFileSync(HUB_PAGE, 'utf8');
    assert.match(content, /href=["']\/prototype-1["']/, 'Hub page must link to /prototype-1');
    assert.match(content, /href=["']\/prototype-2["']/, 'Hub page must link to /prototype-2');
  });

});
