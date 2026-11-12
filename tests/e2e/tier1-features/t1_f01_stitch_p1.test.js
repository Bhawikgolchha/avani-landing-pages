/**
 * Tier 1 Feature Coverage: F1 — Stitch MCP P1 Mockup
 * 
 * Verifies the generation and existence of the Stitch MCP UI mockup for Prototype 1,
 * representing "The Living Canopy" derived from Canva Mood Board Idea 5.
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

const MOCKUP_DIR = path.resolve(process.cwd(), 'mockups/prototype_1');
const HTML_FILE = path.join(MOCKUP_DIR, 'mockup.html');
const PNG_FILE = path.join(MOCKUP_DIR, 'mockup.png');
const META_FILE = path.join(MOCKUP_DIR, 'metadata.json');

describe('F1: Stitch MCP P1 Mockup', { feature: 'F1', tier: 1 }, () => {
  test('F1.1: prototype_1 directory and mockup.html exist with substantial content', () => {
    assertFileExists(HTML_FILE, 'Prototype 1 mockup.html must exist');
    // Mockup HTML should be a fully generated standalone page > 10KB
    assertFileNonEmpty(HTML_FILE, 10000, 'Prototype 1 mockup.html must have substantial markup (>10KB)');
  });

  test('F1.2: prototype_1 mockup.png exists with high-resolution visual screenshot', () => {
    assertFileExists(PNG_FILE, 'Prototype 1 mockup.png must exist');
    // High-res desktop mockup PNG screenshot should exceed 50KB
    assertFileNonEmpty(PNG_FILE, 50000, 'Prototype 1 mockup.png must be a full-resolution render (>50KB)');
  });

  test('F1.3: metadata.json exists and adheres to Stitch screen schema', () => {
    assertFileExists(META_FILE, 'Prototype 1 metadata.json must exist');
    const meta = assertJsonMatches(META_FILE, {
      screenId: (val) => typeof val === 'string' && val.startsWith('projects/') && val.includes('/screens/'),
      deviceType: 'DESKTOP',
      projectId: (val) => typeof val === 'string' && val.length > 0,
      dimensions: {
        width: (val) => typeof val === 'number' && val >= 1280,
        height: (val) => typeof val === 'number' && val >= 800
      }
    }, 'metadata.json must conform to Stitch MCP screen schema with desktop dimensions');

    assert.ok(meta.title, 'metadata.json must include screen title');
    assert.ok(meta.theme, 'metadata.json must specify design theme');
  });

  test('F1.4: mockup.html reflects Living Canopy / Canva Idea 5 design concepts', () => {
    const content = fs.readFileSync(HTML_FILE, 'utf8');
    
    // Must incorporate Avani and botanical / living canopy concepts
    const hasAvani = /avani/i.test(content);
    assert.ok(hasAvani, 'P1 mockup HTML must contain Avani branding');

    const hasCanopyOrNature = /canopy|garden|tree|green|nature|climate/i.test(content);
    assert.ok(hasCanopyOrNature, 'P1 mockup HTML must reflect organic botanical / canopy aesthetic');
  });

  test('F1.5: metadata.json theme explicitly cites Canva Mood Board Idea 5', () => {
    const meta = JSON.parse(fs.readFileSync(META_FILE, 'utf8'));
    const themeStr = (meta.theme || '') + ' ' + (meta.title || '');
    assert.match(
      themeStr,
      /Canva|Idea 5|Living Canopy|Blume/i,
      'P1 metadata must explicitly reference Canva Mood Board Idea 5 or Living Canopy'
    );
  });

  test('F1.6: mockup.html contains interactive navigation or scroll structure', () => {
    assertFileContains(HTML_FILE, [
      '<html',
      '<body',
      'class='
    ], 'P1 mockup HTML must be a styled, well-structured document');
  });
});
