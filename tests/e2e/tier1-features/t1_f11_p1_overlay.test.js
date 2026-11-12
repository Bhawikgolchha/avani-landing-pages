/**
 * Tier 1 Feature Coverage: F11 — Prototype 1 Scroll Overlay
 * 
 * Verifies that Prototype 1 features a structured scroll overlay containing:
 * - 5 distinct thematic chapters (Canopy Hero, Objectives, Teams, Events, Climate Tips)
 * - Soft tactile botanical aesthetic derived from Canva Idea 5
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

const P1_PAGE = path.resolve(process.cwd(), 'src/app/prototype-1/page.tsx');

describe('F11: Prototype 1 Scroll Overlay', { feature: 'F11', tier: 1 }, () => {
  test('F11.1: P1 overlay contains 5 structured scroll sections', () => {
    assertFileExists(P1_PAGE, 'prototype-1/page.tsx must exist');
    const content = fs.readFileSync(P1_PAGE, 'utf8');

    // Section 1: Hero
    assert.match(content, /Prototype 1: The Living Canopy|Rooted in Purpose/i, 'Must contain Canopy Hero chapter');
    // Section 2: Objectives
    assert.ok(content.includes('id="objectives"'), 'Must contain objectives section');
    // Section 3: Teams
    assert.ok(content.includes('id="teams"'), 'Must contain teams section');
    // Section 4: Events
    assert.ok(content.includes('id="events"'), 'Must contain events section');
    // Section 5: Climate Tips
    assert.ok(content.includes('id="climate-tips"'), 'Must contain climate tips section');
  });

  test('F11.2: P1 overlay adopts tactile botanical aesthetic and color palette', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');

    assert.ok(
      content.includes('#163515') || content.includes('text-[#163515]'),
      'P1 must use Avani signature forest green (#163515)'
    );
    assert.ok(
      content.includes('emerald') || content.includes('stone'),
      'P1 must use botanical color palette (emerald, stone, green)'
    );
    assert.ok(
      content.includes('rounded-3xl') || content.includes('rounded-2xl'),
      'P1 cards must feature soft, rounded corners'
    );
  });

  test('F11.3: P1 maps over the 5 Core Environmental Objectives', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');

    assert.ok(
      content.includes('AVANI_OBJECTIVES.map'),
      'P1 must map over AVANI_OBJECTIVES array'
    );
    assert.match(
      content,
      /Our 5 Core Objectives|5 Core Objectives/i,
      'P1 must headline the 5 core objectives'
    );
  });

  test('F11.4: P1 maps over the 5 Specialized Student Teams', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');

    assert.ok(
      content.includes('AVANI_TEAMS.map'),
      'P1 must map over AVANI_TEAMS array'
    );
    assert.match(
      content,
      /The 5 Specialized Teams|Specialized Teams/i,
      'P1 must headline the 5 specialized teams'
    );
  });

  test('F11.5: P1 maps over the 4 Flagship Events and 11 Climate Tips', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');

    assert.ok(
      content.includes('AVANI_EVENTS.map'),
      'P1 must map over AVANI_EVENTS array'
    );
    assert.ok(
      content.includes('CLIMATE_TIPS.map'),
      'P1 must map over CLIMATE_TIPS array'
    );
  });

  test('F11.6: P1 CTA links to Google Form with safe external anchor attributes', () => {
    const content = fs.readFileSync(P1_PAGE, 'utf8');

    assert.ok(
      content.includes('GOOGLE_FORM_URL') || content.includes('docs.google.com/forms'),
      'P1 must wire Google Form application link'
    );
    assert.ok(
      content.includes('target="_blank"') && content.includes('rel="noopener noreferrer"'),
      'CTA link must specify target="_blank" and rel="noopener noreferrer"'
    );
  });
});
