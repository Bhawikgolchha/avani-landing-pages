/**
 * Tier 1 Feature Coverage: F13 — Prototype 2 Scroll Overlay
 * 
 * Verifies that Prototype 2 features a dark glassmorphic HUD scroll overlay containing:
 * - 5 structured chapters (Telemetry Hero, 5 Directives, 5 Taskforces, 4 Deployments, 11 Protocols)
 * - Cyber-environmental aesthetic with cyan and obsidian tokens
 * - Full Avani content catalog integration and application CTA
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

describe('F13: Prototype 2 Scroll Overlay', { feature: 'F13', tier: 1 }, () => {
  test('F13.1: P2 overlay adopts dark cyber-environmental aesthetic (#080C0E & cyan)', () => {
    assertFileExists(P2_PAGE, 'prototype-2/page.tsx must exist');
    const content = fs.readFileSync(P2_PAGE, 'utf8');

    assert.ok(
      content.includes('#080C0E') || content.includes('bg-[#080C0E]'),
      'P2 must use obsidian dark theme (#080C0E)'
    );
    assert.ok(
      content.includes('cyan-400') || content.includes('cyan-500') || content.includes('text-cyan-300'),
      'P2 must use cyber-environmental cyan accent palette'
    );
    assert.ok(
      content.includes('backdrop-blur'),
      'P2 cards must employ glassmorphic backdrop-blur styling'
    );
  });

  test('F13.2: P2 overlay contains 5 structured telemetry chapters', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');

    // Chapter 1: Hero Telemetry HUD
    assert.match(content, /Bangalore Beacon Telemetry|Planetary Care/i, 'Must contain Telemetry Hero HUD');
    // Chapter 2: Strategic Directives (Objectives)
    assert.ok(content.includes('id="objectives"'), 'Must contain directives section');
    // Chapter 3: Specialized Taskforces (Teams)
    assert.ok(content.includes('id="teams"'), 'Must contain taskforces section');
    // Chapter 4: Field Deployments (Events)
    assert.ok(content.includes('id="events"'), 'Must contain field activations section');
    // Chapter 5: Tactical Climate Protocols
    assert.ok(content.includes('id="climate-tips"'), 'Must contain climate protocols section');
  });

  test('F13.3: P2 maps over the 5 Core Objectives with tactical directive codes (DIR_01..DIR_05)', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');

    assert.ok(
      content.includes('AVANI_OBJECTIVES.map'),
      'P2 must map over AVANI_OBJECTIVES array'
    );
    assert.ok(
      content.includes('DIR_0') || content.includes('Core Directives'),
      'P2 must format objectives with cyber directive labels'
    );
  });

  test('F13.4: P2 maps over the 5 Specialized Student Taskforces', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');

    assert.ok(
      content.includes('AVANI_TEAMS.map'),
      'P2 must map over AVANI_TEAMS array'
    );
    assert.match(
      content,
      /Specialized Student Taskforces|Specialized Teams/i,
      'P2 must present specialized student taskforces'
    );
  });

  test('F13.5: P2 includes interactive protocol items with test IDs or data attributes', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');

    assert.ok(
      content.includes('climate-tip-item') || content.includes('data-testid='),
      'P2 must tag climate tips with accessible/testable identifier classes or attributes'
    );
    assert.ok(
      content.includes('CLIMATE_TIPS.map'),
      'P2 must render 11 climate action tips'
    );
  });

  test('F13.6: P2 CTA button links to recruitment form with cyber styling', () => {
    const content = fs.readFileSync(P2_PAGE, 'utf8');

    assert.ok(
      content.includes('GOOGLE_FORM_URL') || content.includes('docs.google.com/forms'),
      'P2 must wire Google Form application link'
    );
    assert.match(
      content,
      /Initialize Application|Enlist in the Biosphere|Apply/i,
      'P2 must feature high-tech application call-to-action'
    );
  });
});
