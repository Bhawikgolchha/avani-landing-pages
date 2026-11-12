/**
 * Tier 1 Feature Coverage: F9 — Comparison Hub (/)
 * 
 * Verifies that the root route (src/app/page.tsx) operates as a comparison and selection hub,
 * presenting side-by-side analyses of both prototypes, linking directly to them,
 * and displaying the complete organizational briefing content.
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

const HUB_PAGE = path.resolve(process.cwd(), 'src/app/hub/page.tsx');

describe('F9: Comparison Hub (/hub)', { feature: 'F9', tier: 1 }, () => {
  test('F9.1: src/app/hub/page.tsx exists and exports ShowcaseHubPage as default client component', () => {
    assertFileExists(HUB_PAGE, 'Comparison hub page.tsx must exist');
    assertFileContains(
      HUB_PAGE,
      ['use client', 'export default function'],
      'src/app/hub/page.tsx must be a client component with default export'
    );
  });

  test('F9.2: Hub includes direct navigation links to both /prototype-1 and /prototype-2', () => {
    const content = fs.readFileSync(HUB_PAGE, 'utf8');

    assert.ok(content.includes('href="/prototype-1"'), 'Hub must link to /prototype-1');
    assert.ok(content.includes('href="/prototype-2"'), 'Hub must link to /prototype-2');
  });

  test('F9.3: Hub renders side-by-side cards for Living Canopy and Eco-Tech Biosphere', () => {
    const content = fs.readFileSync(HUB_PAGE, 'utf8');

    assert.ok(
      content.includes('Living Canopy') || content.includes('Canopy'),
      'Hub must display Prototype 1 Living Canopy preview card'
    );
    assert.ok(
      content.includes('Eco-Tech Biosphere') || content.includes('Biosphere'),
      'Hub must display Prototype 2 Eco-Tech Biosphere preview card'
    );
  });

  test('F9.4: Hub contains feature comparison matrix table or structured design dimensions', () => {
    const content = fs.readFileSync(HUB_PAGE, 'utf8');

    assert.ok(
      content.includes('<table') || content.includes('Comparison Matrix') || content.includes('Design Dimension'),
      'Hub must provide structured comparison matrix between both prototypes'
    );
    assert.ok(
      content.includes('Canva Mood Board') || content.includes('Canva'),
      'Hub must document origin in Canva mood board'
    );
  });

  test('F9.5: Hub integrates Avani organizational content (Objectives, Teams, Events, Climate Tips)', () => {
    const content = fs.readFileSync(HUB_PAGE, 'utf8');

    assert.ok(
      content.includes('AVANI_OBJECTIVES') || content.includes('Objectives'),
      'Hub must render Avani Objectives'
    );
    assert.ok(
      content.includes('AVANI_TEAMS') || content.includes('Teams'),
      'Hub must render Avani Teams'
    );
    assert.ok(
      content.includes('AVANI_EVENTS') || content.includes('Events'),
      'Hub must render Avani Events'
    );
    assert.ok(
      content.includes('CLIMATE_TIPS') || content.includes('Climate Tips'),
      'Hub must render Avani Climate Tips'
    );
  });

  test('F9.6: Hub includes prominent application CTA button for student recruitment', () => {
    const content = fs.readFileSync(HUB_PAGE, 'utf8');

    assert.ok(
      content.includes('GOOGLE_FORM_URL') || content.includes('docs.google.com/forms'),
      'Hub must wire Google Form application link'
    );
    assert.match(
      content,
      /Apply|Join|Cohort/i,
      'Hub must include clear recruitment invitation'
    );
  });
});
