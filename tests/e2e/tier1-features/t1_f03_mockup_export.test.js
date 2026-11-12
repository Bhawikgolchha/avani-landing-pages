/**
 * Tier 1 Feature Coverage: F3 — Stitch Mockup Local Export
 * 
 * Verifies that Stitch MCP UI mockups are locally exported, preserved on disk,
 * and conform to standards (valid HTML5 doctype, PNG binary magic headers, valid metadata dimensions).
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

const P1_HTML = path.resolve(process.cwd(), 'mockups/prototype_1/mockup.html');
const P1_PNG = path.resolve(process.cwd(), 'mockups/prototype_1/mockup.png');
const P1_META = path.resolve(process.cwd(), 'mockups/prototype_1/metadata.json');

const P2_HTML = path.resolve(process.cwd(), 'mockups/prototype_2/mockup.html');
const P2_PNG = path.resolve(process.cwd(), 'mockups/prototype_2/mockup.png');
const P2_META = path.resolve(process.cwd(), 'mockups/prototype_2/metadata.json');

describe('F3: Stitch Mockup Local Export', { feature: 'F3', tier: 1 }, () => {
  test('F3.1: Both mockup HTML files start with valid HTML5 doctype declaration', () => {
    assertFileExists(P1_HTML, 'P1 HTML must exist');
    assertFileExists(P2_HTML, 'P2 HTML must exist');

    const p1Content = fs.readFileSync(P1_HTML, 'utf8').trimStart();
    const p2Content = fs.readFileSync(P2_HTML, 'utf8').trimStart();

    assert.ok(
      p1Content.toLowerCase().startsWith('<!doctype html'),
      'Prototype 1 mockup HTML must begin with <!DOCTYPE html>'
    );
    assert.ok(
      p2Content.toLowerCase().startsWith('<!doctype html'),
      'Prototype 2 mockup HTML must begin with <!DOCTYPE html>'
    );
  });

  test('F3.2: Both mockup HTML files contain standard HTML5 skeleton tags', () => {
    for (const [name, filePath] of [['Prototype 1', P1_HTML], ['Prototype 2', P2_HTML]]) {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(content.includes('<html'), `${name} HTML must contain <html tag`);
      assert.ok(content.includes('<head'), `${name} HTML must contain <head tag`);
      assert.ok(content.includes('<body'), `${name} HTML must contain <body tag`);
      assert.ok(content.includes('</html>'), `${name} HTML must contain closing </html> tag`);
    }
  });

  test('F3.3: Both mockup PNG files have authentic PNG magic byte headers', () => {
    assertFileExists(P1_PNG, 'P1 PNG must exist');
    assertFileExists(P2_PNG, 'P2 PNG must exist');

    const expectedHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

    for (const [name, filePath] of [['Prototype 1', P1_PNG], ['Prototype 2', P2_PNG]]) {
      const fd = fs.openSync(filePath, 'r');
      const buffer = Buffer.alloc(8);
      fs.readSync(fd, buffer, 0, 8, 0);
      fs.closeSync(fd);

      assert.deepStrictEqual(
        buffer,
        expectedHeader,
        `${name} mockup PNG must start with authentic 8-byte PNG signature (\\x89PNG\\r\\n\\x1a\\n)`
      );
    }
  });

  test('F3.4: Exported metadata JSON files contain positive integer desktop dimensions', () => {
    for (const [name, filePath] of [['Prototype 1', P1_META], ['Prototype 2', P2_META]]) {
      assertFileExists(filePath, `${name} metadata must exist`);
      const meta = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      assert.ok(meta.dimensions, `${name} metadata must have dimensions object`);
      assert.strictEqual(typeof meta.dimensions.width, 'number', `${name} dimensions.width must be number`);
      assert.strictEqual(typeof meta.dimensions.height, 'number', `${name} dimensions.height must be number`);
      assert.ok(meta.dimensions.width >= 1280, `${name} dimensions.width must be >= 1280`);
      assert.ok(meta.dimensions.height >= 800, `${name} dimensions.height must be >= 800`);
    }
  });

  test('F3.5: Both mockup HTML files declare responsive viewport meta tag', () => {
    for (const [name, filePath] of [['Prototype 1', P1_HTML], ['Prototype 2', P2_HTML]]) {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(
        content,
        /<meta[^>]+name=["']viewport["'][^>]*>/i,
        `${name} mockup HTML must include viewport meta tag`
      );
      assert.match(
        content,
        /width=device-width/i,
        `${name} viewport meta must specify width=device-width`
      );
    }
  });

  test('F3.6: Both mockups reference external typography fonts and Tailwind CSS', () => {
    for (const [name, filePath] of [['Prototype 1', P1_HTML], ['Prototype 2', P2_HTML]]) {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.includes('fonts.googleapis.com') || content.includes('fonts.gstatic.com'),
        `${name} must reference Google Web Fonts for editorial typography`
      );
      assert.ok(
        content.includes('cdn.tailwindcss.com') || content.includes('tailwind'),
        `${name} must include Tailwind CSS styling`
      );
    }
  });
});
