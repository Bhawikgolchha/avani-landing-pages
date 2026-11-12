/**
 * Tier 1 Feature Coverage: F2 — Stitch MCP P2 Mockup
 * 
 * Verifies the generation and existence of the Stitch MCP UI mockup for Prototype 2,
 * representing the "Modern Eco-Tech / Interactive Biosphere" alternative creative direction.
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
  assertJsonMatches,
  assert
} = require('../harness');

const MOCKUP_DIR = path.resolve(process.cwd(), 'mockups/prototype_2');
const HTML_FILE = path.join(MOCKUP_DIR, 'mockup.html');
const PNG_FILE = path.join(MOCKUP_DIR, 'mockup.png');
const META_FILE = path.join(MOCKUP_DIR, 'metadata.json');

describe('F2: Stitch MCP P2 Mockup', { feature: 'F2', tier: 1 }, () => {
  test('F2.1: prototype_2 directory and mockup.html exist with substantial content', () => {
    assertFileExists(HTML_FILE, 'Prototype 2 mockup.html must exist');
    assertFileNonEmpty(HTML_FILE, 10000, 'Prototype 2 mockup.html must have substantial markup (>10KB)');
  });

  test('F2.2: prototype_2 mockup.png exists with high-resolution visual screenshot', () => {
    assertFileExists(PNG_FILE, 'Prototype 2 mockup.png must exist');
    assertFileNonEmpty(PNG_FILE, 50000, 'Prototype 2 mockup.png must be a full-resolution render (>50KB)');
  });

  test('F2.3: metadata.json exists and adheres to Stitch screen schema', () => {
    assertFileExists(META_FILE, 'Prototype 2 metadata.json must exist');
    const meta = assertJsonMatches(META_FILE, {
      screenId: (val) => typeof val === 'string' && val.startsWith('projects/') && val.includes('/screens/'),
      deviceType: 'DESKTOP',
      projectId: (val) => typeof val === 'string' && val.length > 0,
      dimensions: {
        width: (val) => typeof val === 'number' && val >= 1280,
        height: (val) => typeof val === 'number' && val >= 800
      }
    }, 'Prototype 2 metadata.json must conform to Stitch MCP screen schema');

    assert.ok(meta.title, 'metadata.json must include screen title');
    assert.ok(meta.theme, 'metadata.json must specify design theme');
  });

  test('F2.4: mockup.html reflects Modern Eco-Tech Biosphere / Alternative direction', () => {
    const content = fs.readFileSync(HTML_FILE, 'utf8');

    const hasAvani = /avani/i.test(content);
    assert.ok(hasAvani, 'P2 mockup HTML must contain Avani branding');

    const hasEcoTechOrEarth = /biosphere|eco-tech|earth|journal|planetary|telemetry/i.test(content);
    assert.ok(hasEcoTechOrEarth, 'P2 mockup HTML must reflect eco-tech / biosphere / planetary concepts');
  });

  test('F2.5: metadata.json theme explicitly cites Modern Eco-Tech / Biosphere direction', () => {
    const meta = JSON.parse(fs.readFileSync(META_FILE, 'utf8'));
    const themeStr = (meta.theme || '') + ' ' + (meta.title || '');
    assert.match(
      themeStr,
      /Eco-Tech|Biosphere|Editorial Earth/i,
      'P2 metadata must explicitly reference Modern Eco-Tech Biosphere or Editorial Earth Journal'
    );
  });

  test('F2.6: mockup.html includes high-tech editorial styling or dark theme cues', () => {
    const content = fs.readFileSync(HTML_FILE, 'utf8');
    const hasStylingClasses = /bg-|text-|dark|font-|grid/i.test(content);
    assert.ok(hasStylingClasses, 'P2 mockup HTML must contain Tailwind styling classes');
  });
});
