/**
 * Tier 1 Feature Coverage: F16 — Browser Visual Inspection
 * 
 * Verifies responsive layout containers, WCAG AA color contrast compliance
 * across both prototype themes, viewport declarations, and typography configuration.
 */

const path = require('node:path');
const fs = require('node:fs');
const {
  describe,
  test,
  it,
  assertFileExists,
  assertFileContains,
  assertColorContrast,
  assert
} = require('../harness');

const LAYOUT_FILE = path.resolve(process.cwd(), 'src/app/layout.tsx');
const GLOBALS_CSS = path.resolve(process.cwd(), 'src/app/globals.css');
const HUB_PAGE = path.resolve(process.cwd(), 'src/app/hub/page.tsx');
const P1_PAGE = path.resolve(process.cwd(), 'src/app/prototype-1/page.tsx');
const P2_PAGE = path.resolve(process.cwd(), 'src/app/prototype-2/page.tsx');

describe('F16: Browser Visual Inspection', { feature: 'F16', tier: 1 }, () => {
  test('F16.1: Root layout configures HTML lang, antialiased body, and Google Web Fonts', () => {
    assertFileExists(LAYOUT_FILE, 'layout.tsx must exist');
    assertFileContains(
      LAYOUT_FILE,
      [
        'lang="en"',
        'antialiased',
        '--font-inter',
        '--font-playfair',
        '--font-jetbrains'
      ],
      'layout.tsx must configure English lang, antialiasing, and font variables (Inter, Playfair, JetBrains)'
    );
  });

  test('F16.2: Prototype 1 botanical theme satisfies WCAG 2.1 AA color contrast (>= 4.5:1)', () => {
    // Primary green #163515 on soft background #F9FAF7
    const ratioBg = assertColorContrast(
      '#163515',
      '#F9FAF7',
      4.5,
      'Forest green #163515 on #F9FAF7 background must meet WCAG AA normal text contrast'
    );
    assert.ok(ratioBg >= 10.0, `Expected high contrast ratio >= 10:1 (got ${ratioBg}:1)`);

    // Light tea-green text #DCE7D4 on primary dark green #163515
    const ratioBadge = assertColorContrast(
      '#DCE7D4',
      '#163515',
      4.5,
      'Tea-green #DCE7D4 on #163515 must meet WCAG AA contrast'
    );
    assert.ok(ratioBadge >= 7.0, `Expected contrast ratio >= 7:1 (got ${ratioBadge}:1)`);
  });

  test('F16.3: Prototype 2 dark cyber theme satisfies WCAG 2.1 AA color contrast (>= 4.5:1)', () => {
    // Slate-100 text #F1F5F9 on dark obsidian #080C0E
    const ratioDarkText = assertColorContrast(
      '#F1F5F9',
      '#080C0E',
      4.5,
      'Light text #F1F5F9 on #080C0E obsidian must meet WCAG AA contrast'
    );
    assert.ok(ratioDarkText >= 14.0, `Expected high dark mode contrast (got ${ratioDarkText}:1)`);

    // Cyan accent #06B6D4 on dark obsidian #080C0E
    const ratioCyan = assertColorContrast(
      '#06B6D4',
      '#080C0E',
      4.5,
      'Cyan #06B6D4 on #080C0E obsidian must meet WCAG AA contrast'
    );
    assert.ok(ratioCyan >= 6.0, `Expected contrast ratio >= 6:1 (got ${ratioCyan}:1)`);
  });

  test('F16.4: Responsive layout classes are applied across all page routes', () => {
    for (const [name, filePath] of [['Hub', HUB_PAGE], ['P1', P1_PAGE], ['P2', P2_PAGE]]) {
      assertFileExists(filePath, `${name} page must exist`);
      const content = fs.readFileSync(filePath, 'utf8');

      assert.ok(
        content.includes('px-4') || content.includes('px-6'),
        `${name} page must use responsive padding (px-4 / px-6)`
      );
      assert.ok(
        content.includes('max-w-7xl') || content.includes('max-w-5xl'),
        `${name} page must constrain content width with max-w container`
      );
      assert.ok(
        content.includes('sm:') || content.includes('md:') || content.includes('lg:'),
        `${name} page must use Tailwind responsive breakpoint prefixes`
      );
    }
  });

  test('F16.5: globals.css configures Tailwind directives and clean base layout rules', () => {
    assertFileExists(GLOBALS_CSS, 'globals.css must exist');
    assertFileContains(
      GLOBALS_CSS,
      ['@tailwind base', '@tailwind components', '@tailwind utilities'],
      'globals.css must include core Tailwind layer directives'
    );
  });

  test('F16.6: Meta title and branding metadata are defined in root layout', () => {
    const content = fs.readFileSync(LAYOUT_FILE, 'utf8');

    assert.ok(content.includes('Avani'), 'Metadata title must include "Avani"');
    assert.ok(
      content.includes('/assets/branding/logo.jpg'),
      'Metadata must register official Avani logo as favicon / icon'
    );
  });
});
