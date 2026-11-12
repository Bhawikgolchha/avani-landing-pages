/**
 * Tier 1 Feature Coverage: F12 — Prototype 2 3D Canvas
 * 
 * Verifies that Prototype 2 (src/app/prototype-2/page.tsx) configures the 3D WebGL
 * canvas with SSR disabled ({ ssr: false }), fixed viewport positioning, smooth scroll integration,
 * and holographic 10,000-particle Earth globe telemetry concepts.
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

const P2_PAGE = path.resolve(process.cwd(), 'src/app/prototype-2/page.tsx');

describe('F12: Prototype 2 3D Canvas', { feature: 'F12', tier: 1 }, () => {
  test('F12.1: src/app/prototype-2/page.tsx exists and is a client component', () => {
    assertFileExists(P2_PAGE, 'prototype-2/page.tsx must exist');
    assertFileContains(
      P2_PAGE,
      'use client',
      'prototype-2/page.tsx must declare "use client" directive'
    );
  });

  test('F12.2: P2 3D Canvas is dynamically loaded with SSR disabled ({ ssr: false })', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');

    assert.ok(
      content.includes('next/dynamic') || content.includes('dynamic('),
      'P2 must use next/dynamic for WebGL SSR isolation'
    );
    assert.match(
      content,
      /\{\s*ssr:\s*false\s*\}/,
      'P2 must explicitly disable SSR ({ ssr: false }) on 3D canvas'
    );
  });

  test('F12.3: P2 canvas container is styled as a fixed background layer with pointer-events-none', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');

    assert.ok(
      content.includes('fixed inset-0') && content.includes('pointer-events-none'),
      'P2 3D canvas container must have classes "fixed inset-0" and "pointer-events-none"'
    );
    assert.ok(
      content.includes('z-0'),
      '3D background container must be positioned behind overlay (z-0)'
    );
  });

  test('F12.4: P2 canvas references 10,000-particle Earth globe and telemetry concepts', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');

    assert.match(
      content,
      /10,000-particle|holographic Earth|Biosphere|orbital rings|telemetry/i,
      'P2 canvas must reference 10,000-particle globe or planetary telemetry concepts'
    );
  });

  test('F12.5: P2 page references Bangalore telemetry beacon coordinates', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');

    assert.match(
      content,
      /Bangalore Beacon|12\.9716°\s*N,\s*77\.5946°\s*E/i,
      'P2 must feature Bangalore coordinates beacon in telemetry HUD'
    );
  });

  test('F12.6: P2 page integrates useLenis smooth scroll hook', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');

    assert.ok(
      content.includes('useLenis'),
      'P2 page must invoke useLenis() smooth scroll hook'
    );
  });
});
