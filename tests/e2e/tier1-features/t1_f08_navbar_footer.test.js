/**
 * Tier 1 Feature Coverage: F8 — Universal Navbar & Footer
 * 
 * Verifies that universal navigation and footer components exist, export required
 * elements, provide prototype switching across /, /prototype-1, and /prototype-2,
 * and provide external contact and application links.
 */

const path = require('node:path');
const fs = require('node:fs');
const {
  describe,
  test,
  it,
  assertFileExists,
  assertFileNonEmpty,
  assertFileContains,
  assert
} = require('../harness');

const NAVBAR_FILE = path.resolve(process.cwd(), 'src/components/common/Navbar.tsx');
const FOOTER_FILE = path.resolve(process.cwd(), 'src/components/common/Footer.tsx');

describe('F8: Universal Navbar & Footer', { feature: 'F8', tier: 1 }, () => {
  test('F8.1: Navbar.tsx exists and exports Navbar component', () => {
    assertFileExists(NAVBAR_FILE, 'Navbar.tsx must exist');
    assertFileContains(
      NAVBAR_FILE,
      ['export function Navbar', 'use client'],
      'Navbar.tsx must be a client component exporting Navbar function'
    );
  });

  test('F8.2: Navbar contains prototype switcher routing to all 3 paths (/, /prototype-1, /prototype-2)', () => {
    const content = fs.readFileSync(NAVBAR_FILE, 'utf8');

    assert.ok(content.includes("href: '/'") || content.includes('href="/"'), 'Navbar must link to /');
    assert.ok(content.includes('/prototype-1'), 'Navbar must link to /prototype-1');
    assert.ok(content.includes('/prototype-2'), 'Navbar must link to /prototype-2');
  });

  test('F8.3: Navbar integrates Google Form application link and CTA button', () => {
    const content = fs.readFileSync(NAVBAR_FILE, 'utf8');

    assert.ok(
      content.includes('GOOGLE_FORM_URL') || content.includes('applicationForm'),
      'Navbar must wire application form link'
    );
    assert.match(
      content,
      /join|apply|cohort/i,
      'Navbar must display call-to-action button for recruitment'
    );
  });

  test('F8.4: Navbar supports responsive mobile navigation drawer and toggle button', () => {
    const content = fs.readFileSync(NAVBAR_FILE, 'utf8');

    assert.ok(
      content.includes('mobileMenuOpen') || content.includes('setMobileMenuOpen'),
      'Navbar must manage mobile menu state'
    );
    assert.ok(
      content.includes('Menu') && content.includes('X'),
      'Navbar must include toggle icons for mobile drawer'
    );
  });

  test('F8.5: Footer.tsx exists and exports Footer component', () => {
    assertFileExists(FOOTER_FILE, 'Footer.tsx must exist');
    assertFileContains(
      FOOTER_FILE,
      ['export function Footer', '<footer'],
      'Footer.tsx must export Footer component rendering a <footer> element'
    );
  });

  test('F8.6: Footer includes official contact channels (Email, Phone, LinkedIn, Substack, Instagram)', () => {
    const content = fs.readFileSync(FOOTER_FILE, 'utf8');

    assert.ok(content.includes('avaniyocc@gmail.com') || content.includes('EXTERNAL_LINKS.email'), 'Footer must contain email');
    assert.ok(content.includes('phone') || content.includes('8050931769'), 'Footer must contain phone number');
    assert.ok(content.includes('linkedIn') || content.includes('Linkedin'), 'Footer must contain LinkedIn link');
    assert.ok(content.includes('substack') || content.includes('Substack'), 'Footer must contain Substack link');
    assert.ok(content.includes('instagram') || content.includes('Instagram'), 'Footer must contain Instagram link');
  });
});
