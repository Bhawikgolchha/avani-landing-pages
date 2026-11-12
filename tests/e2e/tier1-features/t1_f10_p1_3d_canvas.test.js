/**
 * Tier 1 Feature Coverage: F10 — Prototype 1 3D Canvas
 * 
 * Verifies that Prototype 1 (src/app/prototype-1/page.tsx) configures the 3D WebGL
 * canvas with SSR disabled ({ ssr: false }), fixed viewport positioning, smooth scroll integration,
 * and procedural botanical Living Canopy concepts.
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

const P1_PAGE = path.resolve(process.cwd(), 'src/app/prototype-1/page.tsx');

describe('F10: Prototype 1 3D Canvas', { feature: 'F10', tier: 1 }, () => {
  test('F10.1: src/app/prototype-1/page.tsx exists and is a client component', () => {
    assertFileExists(P1_PAGE, 'prototype-1/page.tsx must exist');
    assertFileContains(
      P1_PAGE,
      'use client',
      'prototype-1/page.tsx must declare "use client" directive'
    );
  });

  test('F10.2: 3D Canvas component is dynamically loaded with SSR disabled ({ ssr: false })', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');

    assert.ok(
      content.includes('next/dynamic') || content.includes('dynamic('),
      'P1 must use next/dynamic for WebGL SSR isolation'
    );
    assert.match(
      content,
      /\{\s*ssr:\s*false\s*\}/,
      'P1 must explicitly disable SSR ({ ssr: false }) on 3D canvas to avoid WebGL context errors'
    );
  });

  test('F10.3: Canvas is styled as a fixed background layer with pointer-events-none', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');

    assert.ok(
      content.includes('fixed inset-0') && content.includes('pointer-events-none'),
      'P1 3D scene container must have classes "fixed inset-0" and "pointer-events-none"'
    );
    assert.ok(
      content.includes('z-0'),
      '3D background container must be positioned behind overlay content (z-0)'
    );
  });

  test('F10.4: P1 canvas references Living Canopy / Tree of Life procedural concepts', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');

    assert.match(
      content,
      /Living Canopy|Tree|Canopy|Foliage|Pond/i,
      'P1 canvas must reference Living Canopy / Tree botanical concepts'
    );
  });

  test('F10.5: P1 page integrates useLenis smooth scroll hook', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');

    assert.ok(
      content.includes('useLenis'),
      'P1 page must invoke useLenis() hook to synchronize smooth scroll with 3D canvas'
    );
  });

  test('F10.6: P1 page contains scroll prompt indicator for canopy navigation', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');

    assert.match(
      content,
      /Scroll to traverse the canopy|Scroll/i,
      'P1 page must include visual scroll indicator encouraging user exploration'
    );
  });
});
