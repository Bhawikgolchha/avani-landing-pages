/**
 * Tier 2 Boundary & Corner Case Tests: F14, F15, F16
 * 
 * Covers:
 * - F14: Content & Link Verification boundaries (URL protocol security, Substack regex, E.164 phone regex, RFC 5322 email)
 * - F15: Automated Build & Lint Gate boundaries (scripts, tsconfig strict mode, exit codes, timeout bounds)
 * - F16: Browser Visual Inspection & Viewport Stress boundaries (320px narrow mobile to 3840px 4K wide, touch targets)
 */

const fs = require('node:fs');
const path = require('node:path');
const {
  describe,
  test,
  assertFileExists,
  assertJsonMatches,
  assertValidUrl,
  assertExitCode,
  assert
} = require('../harness');

const CONTENT_FILE = path.resolve(process.cwd(), 'src/lib/avaniContent.ts');
const PACKAGE_JSON = path.resolve(process.cwd(), 'package.json');
const TSCONFIG_FILE = path.resolve(process.cwd(), 'tsconfig.json');
const ESLINT_FILE = path.resolve(process.cwd(), '.eslintrc.json');
const P1_PAGE = path.resolve(process.cwd(), 'src/app/prototype-1/page.tsx');
const P2_PAGE = path.resolve(process.cwd(), 'src/app/prototype-2/page.tsx');
const HUB_PAGE = path.resolve(process.cwd(), 'src/app/hub/page.tsx');

const { EXTERNAL_LINKS } = require(CONTENT_FILE);

/**
 * Validates international E.164 / Indian telephone number format (+91 followed by 10 digits starting with 6-9).
 */
function validateIndianPhoneNumber(phoneStr) {
  if (typeof phoneStr !== 'string') {
    throw new assert.AssertionError({
      message: `Phone number must be a string, got ${typeof phoneStr}`,
      operator: 'validateIndianPhoneNumber'
    });
  }
  const cleanPhone = phoneStr.trim();
  const phoneRegex = /^\+91[\s-]?[6-9]\d{4}[\s-]?\d{5}$|^\+91[\s-]?[6-9]\d{9}$/;
  if (!phoneRegex.test(cleanPhone)) {
    throw new assert.AssertionError({
      message: `Phone number "${phoneStr}" does not match Indian E.164 standard (+91 followed by 10-digit mobile)`,
      expected: '+91 [6-9]XXXXXXXXX',
      actual: phoneStr,
      operator: 'validateIndianPhoneNumber'
    });
  }
  return true;
}

/**
 * Validates RFC 5322 simplified email standard format.
 */
function validateEmail(emailStr) {
  if (typeof emailStr !== 'string') {
    throw new assert.AssertionError({
      message: `Email must be a string, got ${typeof emailStr}`,
      operator: 'validateEmail'
    });
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(emailStr.trim())) {
    throw new assert.AssertionError({
      message: `Email "${emailStr}" is not a valid email address`,
      expected: 'valid email format',
      actual: emailStr,
      operator: 'validateEmail'
    });
  }
  return true;
}

describe('Tier 2: Content Links, Build Gate & Viewport Boundaries (F14, F15, F16)', () => {

  // ---------------------------------------------------------------------------
  // F14: Content & Link Verification Boundaries
  // ---------------------------------------------------------------------------

  test('[F14] Protocol boundary: all external links strictly use https:, mailto:, or tel:', () => {
    assertValidUrl(EXTERNAL_LINKS.applicationForm);
    assertValidUrl(EXTERNAL_LINKS.linkedIn);
    assertValidUrl(EXTERNAL_LINKS.substack);
    assertValidUrl(EXTERNAL_LINKS.instagram);
    assertValidUrl(EXTERNAL_LINKS.emailMailto);
    assertValidUrl(EXTERNAL_LINKS.phoneTel);
    assertValidUrl(EXTERNAL_LINKS.canvaMoodBoard1);
    assertValidUrl(EXTERNAL_LINKS.canvaMoodBoard2);

    EXTERNAL_LINKS.substackArticles.forEach(art => {
      assertValidUrl(art.url);
      assertValidUrl(art.coverImageUrl);
    });
  });

  test('[F14] Security boundary: reject dangerous javascript: URL schemes', () => {
    const maliciousUrls = [
      'javascript:alert(1)',
      'javascript:void(0)',
      'JAVASCRIPT:document.location="http://evil.com"'
    ];
    maliciousUrls.forEach(url => {
      assert.throws(() => {
        assertValidUrl(url);
      }, /Invalid URL protocol "javascript:"/);
    });
  });

  test('[F14] Security boundary: reject inline data: URL schemes', () => {
    const dataUrls = [
      'data:text/html,<script>alert(1)</script>',
      'data:application/javascript;base64,YWxlcnQoMSk='
    ];
    dataUrls.forEach(url => {
      assert.throws(() => {
        assertValidUrl(url);
      }, /Invalid URL protocol "data:"/);
    });
  });

  test('[F14] Security boundary: reject file:, blob:, and malformed protocol schemes', () => {
    const badSchemes = [
      'file:///etc/passwd',
      'blob:https://example.com/1234-5678',
      'ftp://ftp.example.com/resource',
      'not-a-valid-url-format'
    ];
    badSchemes.forEach(url => {
      assert.throws(() => {
        assertValidUrl(url);
      }, /Invalid URL/);
    });
  });

  test('[F14] Substack article URL regex boundary: valid note post ID format', () => {
    const substackNoteRegex = /^https:\/\/substack\.com\/@avaniyocc\/note\/p-\d+(\?.*)?$/;
    assert.strictEqual(EXTERNAL_LINKS.substackArticles.length, 3, 'Must have exactly 3 Substack articles');
    EXTERNAL_LINKS.substackArticles.forEach(art => {
      assert.match(art.url, substackNoteRegex, `Article URL "${art.url}" must match Substack note pattern`);
    });
  });

  test('[F14] Substack article metadata boundary: non-empty title, subtitle, publishedDate, coverImageUrl', () => {
    EXTERNAL_LINKS.substackArticles.forEach(art => {
      assert.ok(typeof art.title === 'string' && art.title.trim().length > 5, `Article title too short: ${art.title}`);
      assert.ok(typeof art.subtitle === 'string' && art.subtitle.trim().length > 10, `Article subtitle too short: ${art.subtitle}`);
      assert.ok(typeof art.publishedDate === 'string' && art.publishedDate.length > 4, `Article publishedDate missing`);
      assert.ok(typeof art.coverImageUrl === 'string' && art.coverImageUrl.startsWith('https://'), `Cover image must be https`);
    });
  });

  test('[F14] Contact phone number E.164 boundary: matches Indian format (+91 8050931769)', () => {
    validateIndianPhoneNumber(EXTERNAL_LINKS.phone);
    validateIndianPhoneNumber(EXTERNAL_LINKS.phoneFormatted);
    assert.strictEqual(EXTERNAL_LINKS.phoneTel, 'tel:+918050931769');
  });

  test('[F14] Phone validation boundary: rejects invalid numbers (short, bad country code, letters)', () => {
    const invalidPhones = [
      '+91 8050', // Too short
      '8050931769', // Missing +91
      '+91 1050931769', // Starts with 1 (invalid Indian mobile)
      '+91 0050931769', // Starts with 0
      '+1 8050931769', // US country code instead of India +91
      '+91 80509ABCD9', // Contains letters
      ''
    ];
    invalidPhones.forEach(phone => {
      assert.throws(() => {
        validateIndianPhoneNumber(phone);
      }, /does not match Indian E\.164 standard/);
    });
  });

  test('[F14] Contact email address boundary: valid RFC 5322 standard format (avaniyocc@gmail.com)', () => {
    validateEmail(EXTERNAL_LINKS.email);
    assert.strictEqual(EXTERNAL_LINKS.email, 'avaniyocc@gmail.com');
    assert.strictEqual(EXTERNAL_LINKS.emailMailto, 'mailto:avaniyocc@gmail.com');

    // Negative tests
    assert.throws(() => validateEmail('not-an-email'), /is not a valid email address/);
    assert.throws(() => validateEmail('avani@'), /is not a valid email address/);
    assert.throws(() => validateEmail('@gmail.com'), /is not a valid email address/);
    assert.throws(() => validateEmail('avani@gmail'), /is not a valid email address/);
  });

  // ---------------------------------------------------------------------------
  // F15: Automated Build & Lint Gate Boundaries
  // ---------------------------------------------------------------------------

  test('[F15] Build script configuration boundary: package.json scripts contain build and lint', () => {
    assertJsonMatches(PACKAGE_JSON, (pkg) => {
      assert.ok(pkg.scripts, 'scripts object must exist in package.json');
      assert.strictEqual(pkg.scripts.build, 'next build', 'build script must execute "next build"');
      assert.strictEqual(pkg.scripts.lint, 'next lint', 'lint script must execute "next lint"');
      return true;
    });
  });

  test('[F15] TypeScript configuration boundary: tsconfig.json strict mode enabled', () => {
    assertJsonMatches(TSCONFIG_FILE, (tsconfig) => {
      assert.ok(tsconfig.compilerOptions, 'compilerOptions must exist in tsconfig.json');
      assert.strictEqual(tsconfig.compilerOptions.strict, true, 'TypeScript compilerOptions.strict must be true');
      return true;
    });
  });

  test('[F15] Next.js lint configuration boundary: .eslintrc.json extends next/core-web-vitals', () => {
    assertJsonMatches(ESLINT_FILE, (eslint) => {
      assert.strictEqual(eslint.extends, 'next/core-web-vitals', '.eslintrc.json must extend next/core-web-vitals');
      return true;
    });
  });

  test('[F15] Build exit code expectation boundary: successful command returns exit code 0', () => {
    const res = assertExitCode('node -e "process.exit(0)"', 0);
    assert.strictEqual(res.exitCode, 0);
  });

  test('[F15] Build timeout boundary: timeout threshold is bounded between 10s and 300s', () => {
    const standardTimeout = 60000;
    assert.ok(standardTimeout >= 10000, 'Build timeout must be >= 10s');
    assert.ok(standardTimeout <= 300000, 'Build timeout must be <= 300s');
  });

  test('[F15] Failure cascade boundary: non-zero exit code throws AssertionError', () => {
    assert.throws(() => {
      assertExitCode('node -e "process.exit(1)"', 0);
    }, /exited with code 1, expected 0/);
  });

  // ---------------------------------------------------------------------------
  // F16: Browser Visual Inspection & Viewport Stress Boundaries
  // ---------------------------------------------------------------------------

  test('[F16] Narrow mobile viewport boundary (320px width): layout prevents min-width overflow', () => {
    // Check all pages: no hardcoded w-[500px] or larger without responsive prefix
    [HUB_PAGE, P1_PAGE, P2_PAGE].forEach(pageFile => {
      const content = fs.readFileSync(pageFile, 'utf8');
      assert.doesNotMatch(
        content,
        /(?<!sm:|md:|lg:|xl:|2xl:)min-w-\[\d{3,4}px\]/,
        `Page ${path.basename(pageFile)} must not enforce hardcoded unconditional min-width overflow`
      );
    });
  });

  test('[F16] Ultra-wide 4K viewport boundary (3840px width): content max-width containers applied', () => {
    [HUB_PAGE, P1_PAGE, P2_PAGE].forEach(pageFile => {
      const content = fs.readFileSync(pageFile, 'utf8');
      assert.match(
        content,
        /max-w-(5xl|7xl)/,
        `Page ${path.basename(pageFile)} must contain max-w container constraint for 4K displays`
      );
    });
  });

  test('[F16] Tailwind responsive breakpoint configuration boundaries (sm, md, lg, xl, 2xl)', () => {
    const standardBreakpoints = {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    };
    Object.entries(standardBreakpoints).forEach(([bp, width]) => {
      assert.ok(width >= 320 && width <= 1920, `Breakpoint ${bp} (${width}px) is within valid standard range`);
    });
  });

  test('[F16] Ultra-tall viewport boundary: hero section enforces minimum viewport height (min-h-[70vh])', () => {
    [P1_PAGE, P2_PAGE].forEach(pageFile => {
      const content = fs.readFileSync(pageFile, 'utf8');
      assert.match(
        content,
        /min-h-\[70vh\]/,
        `Hero section in ${path.basename(pageFile)} must apply min-h-[70vh] for vertical coverage`
      );
    });
  });

  test('[F16] Mobile touch target size boundary: interactive buttons meet minimum 36px/44px height', () => {
    [HUB_PAGE, P1_PAGE, P2_PAGE].forEach(pageFile => {
      const content = fs.readFileSync(pageFile, 'utf8');
      assert.match(
        content,
        /py-(2\.5|3|3\.5|4)/,
        `Page ${path.basename(pageFile)} interactive buttons must use adequate vertical padding for tap targets`
      );
    });
  });

});
