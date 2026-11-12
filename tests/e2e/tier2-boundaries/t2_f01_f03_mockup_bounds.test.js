/**
 * Tier 2 Boundary & Corner Case Tests: F1, F2, F3
 * 
 * Covers:
 * - F1: Stitch MCP P1 Mockup boundaries (HTML size, structure, metadata schema)
 * - F2: Stitch MCP P2 Mockup boundaries (HTML size, structure, metadata schema)
 * - F3: Stitch Mockup Local Export boundaries (PNG binary magic bytes, IHDR chunks, corruption detection)
 */

const fs = require('node:fs');
const path = require('node:path');
const {
  describe,
  test,
  assertFileExists,
  assertFileNonEmpty,
  assertFileContains,
  assertJsonMatches,
  assert
} = require('../harness');

const P1_HTML = path.resolve(process.cwd(), 'mockups/prototype_1/mockup.html');
const P1_PNG = path.resolve(process.cwd(), 'mockups/prototype_1/mockup.png');
const P1_META = path.resolve(process.cwd(), 'mockups/prototype_1/metadata.json');

const P2_HTML = path.resolve(process.cwd(), 'mockups/prototype_2/mockup.html');
const P2_PNG = path.resolve(process.cwd(), 'mockups/prototype_2/mockup.png');
const P2_META = path.resolve(process.cwd(), 'mockups/prototype_2/metadata.json');

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

/**
 * Validates PNG binary structure and extracts dimensions from the IHDR chunk.
 * Throws an AssertionError if corrupted, truncated, or invalid.
 */
function parseAndValidatePng(buffer, sourceName = 'PNG') {
  if (!Buffer.isBuffer(buffer)) {
    throw new assert.AssertionError({
      message: `${sourceName}: Expected Buffer instance, got ${typeof buffer}`,
      operator: 'parseAndValidatePng'
    });
  }

  // Minimum PNG length: 8 (signature) + 8 (IHDR header) + 13 (IHDR data) + 4 (CRC) = 33 bytes
  if (buffer.length < 33) {
    throw new assert.AssertionError({
      message: `${sourceName}: Buffer truncated (${buffer.length} bytes < 33 bytes minimum)`,
      expected: '>= 33 bytes',
      actual: `${buffer.length} bytes`,
      operator: 'parseAndValidatePng'
    });
  }

  // Check 8-byte PNG signature
  const signature = buffer.subarray(0, 8);
  if (!signature.equals(PNG_MAGIC)) {
    throw new assert.AssertionError({
      message: `${sourceName}: Invalid PNG signature (got ${signature.toString('hex')}, expected ${PNG_MAGIC.toString('hex')})`,
      expected: PNG_MAGIC.toString('hex'),
      actual: signature.toString('hex'),
      operator: 'parseAndValidatePng'
    });
  }

  // Check IHDR chunk type
  const chunkLength = buffer.readUInt32BE(8);
  const chunkType = buffer.subarray(12, 16).toString('ascii');
  if (chunkType !== 'IHDR' || chunkLength !== 13) {
    throw new assert.AssertionError({
      message: `${sourceName}: Expected first chunk to be IHDR with length 13, got ${chunkType} (length ${chunkLength})`,
      expected: 'IHDR with length 13',
      actual: `${chunkType} (length ${chunkLength})`,
      operator: 'parseAndValidatePng'
    });
  }

  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);

  if (width === 0 || height === 0) {
    throw new assert.AssertionError({
      message: `${sourceName}: Zero dimension encountered (${width}x${height})`,
      expected: 'width > 0 and height > 0',
      actual: `${width}x${height}`,
      operator: 'parseAndValidatePng'
    });
  }

  return { width, height, length: buffer.length };
}

describe('Tier 2: Mockup & Local Export Boundaries (F1, F2, F3)', () => {

  // ---------------------------------------------------------------------------
  // F1: Prototype 1 Stitch Mockup Boundaries
  // ---------------------------------------------------------------------------

  test('[F1] P1 HTML file minimum size boundary (must exceed 500 bytes)', () => {
    assertFileNonEmpty(P1_HTML, 500, 'P1 mockup HTML must not be empty or truncated');
    const stats = fs.statSync(P1_HTML);
    // Boundary verification: Ensure it is a full-featured mockup (> 10KB) and within reasonable size (< 5MB)
    assert.ok(stats.size >= 10240, `P1 HTML size ${stats.size} bytes is below 10KB expected for full mockup`);
    assert.ok(stats.size <= 5242880, `P1 HTML size ${stats.size} bytes exceeds 5MB upper limit`);
  });

  test('[F1] P1 HTML document syntax boundaries (doctype and matching root tags)', () => {
    const content = fs.readFileSync(P1_HTML, 'utf8');
    assert.match(content, /<!doctype\s+html>/i, 'P1 HTML must declare valid DOCTYPE');
    assert.match(content, /<html[\s>]/i, 'P1 HTML must include opening <html> tag');
    assert.match(content, /<\/html>/i, 'P1 HTML must include closing </html> tag');
    assert.match(content, /<head[\s>]/i, 'P1 HTML must include opening <head> tag');
    assert.match(content, /<\/head>/i, 'P1 HTML must include closing </head> tag');
    assert.match(content, /<body[\s>]/i, 'P1 HTML must include opening <body> tag');
    assert.match(content, /<\/body>/i, 'P1 HTML must include closing </body> tag');
  });

  test('[F1] P1 HTML template boundaries (zero unrendered template variables or null leaks)', () => {
    const content = fs.readFileSync(P1_HTML, 'utf8');
    assert.doesNotMatch(content, /\{\{[^}]+\}\}/, 'P1 HTML must not contain unresolved mustache/handlebars templates');
    assert.doesNotMatch(content, /\[object\s+Object\]/, 'P1 HTML must not leak stringified JavaScript objects');
    assert.doesNotMatch(content, /\bundefined\b/i, 'P1 HTML must not leak "undefined" literals into DOM markup');
    assert.doesNotMatch(content, /\bNaN\b/, 'P1 HTML must not contain numeric NaN leaks');
  });

  test('[F1] P1 HTML character set and viewport boundaries', () => {
    const content = fs.readFileSync(P1_HTML, 'utf8');
    assert.match(content, /<meta[^>]+charset=["']?utf-8["']?/i, 'P1 HTML must explicitly declare UTF-8 charset');
    assert.ok(
      /<meta[^>]+name=["']viewport["']/i.test(content) && /width=device-width/i.test(content),
      'P1 HTML must declare responsive viewport with width=device-width'
    );
  });

  test('[F1] P1 metadata schema boundaries (screenId, projectId, and deviceType format)', () => {
    assertJsonMatches(P1_META, (meta) => {
      assert.strictEqual(typeof meta.screenId, 'string', 'screenId must be a string');
      assert.match(meta.screenId, /^projects\/[0-9]+\/screens\/[a-f0-9]{32}$/, 'screenId must match Stitch resource name syntax');
      assert.strictEqual(typeof meta.projectId, 'string', 'projectId must be a string');
      assert.match(meta.projectId, /^[0-9]+$/, 'projectId must be a numeric string ID');
      assert.strictEqual(meta.deviceType, 'DESKTOP', 'deviceType must be DESKTOP');
      assert.strictEqual(typeof meta.title, 'string', 'title must be a string');
      assert.ok(meta.title.length > 5, 'title must be descriptive (> 5 chars)');
      return true;
    });
  });

  test('[F1] P1 metadata dimensions boundary (positive width and height >= 1000px)', () => {
    assertJsonMatches(P1_META, (meta) => {
      assert.ok(meta.dimensions, 'dimensions object must exist in metadata');
      assert.strictEqual(typeof meta.dimensions.width, 'number', 'dimensions.width must be a number');
      assert.strictEqual(typeof meta.dimensions.height, 'number', 'dimensions.height must be a number');
      assert.ok(meta.dimensions.width >= 1000, `Width (${meta.dimensions.width}) must be >= 1000px desktop boundary`);
      assert.ok(meta.dimensions.height >= 1000, `Height (${meta.dimensions.height}) must be >= 1000px long-scroll boundary`);
      return true;
    });
  });

  // ---------------------------------------------------------------------------
  // F2: Prototype 2 Stitch Mockup Boundaries
  // ---------------------------------------------------------------------------

  test('[F2] P2 HTML file minimum size boundary (must exceed 500 bytes)', () => {
    assertFileNonEmpty(P2_HTML, 500, 'P2 mockup HTML must not be empty or truncated');
    const stats = fs.statSync(P2_HTML);
    assert.ok(stats.size >= 10240, `P2 HTML size ${stats.size} bytes is below 10KB expected for full mockup`);
    assert.ok(stats.size <= 5242880, `P2 HTML size ${stats.size} bytes exceeds 5MB upper limit`);
  });

  test('[F2] P2 HTML document syntax boundaries (doctype and matching root tags)', () => {
    const content = fs.readFileSync(P2_HTML, 'utf8');
    assert.match(content, /<!doctype\s+html>/i, 'P2 HTML must declare valid DOCTYPE');
    assert.match(content, /<html[\s>]/i, 'P2 HTML must include opening <html> tag');
    assert.match(content, /<\/html>/i, 'P2 HTML must include closing </html> tag');
    assert.match(content, /<head[\s>]/i, 'P2 HTML must include opening <head> tag');
    assert.match(content, /<\/head>/i, 'P2 HTML must include closing </head> tag');
    assert.match(content, /<body[\s>]/i, 'P2 HTML must include opening <body> tag');
    assert.match(content, /<\/body>/i, 'P2 HTML must include closing </body> tag');
  });

  test('[F2] P2 HTML template boundaries (zero unrendered template variables or null leaks)', () => {
    const content = fs.readFileSync(P2_HTML, 'utf8');
    assert.doesNotMatch(content, /\{\{[^}]+\}\}/, 'P2 HTML must not contain unresolved mustache/handlebars templates');
    assert.doesNotMatch(content, /\[object\s+Object\]/, 'P2 HTML must not leak stringified JavaScript objects');
    assert.doesNotMatch(content, /\bundefined\b/i, 'P2 HTML must not leak "undefined" literals into DOM markup');
    assert.doesNotMatch(content, /\bNaN\b/, 'P2 HTML must not contain numeric NaN leaks');
  });

  test('[F2] P2 HTML character set and viewport boundaries', () => {
    const content = fs.readFileSync(P2_HTML, 'utf8');
    assert.match(content, /<meta[^>]+charset=["']?utf-8["']?/i, 'P2 HTML must explicitly declare UTF-8 charset');
    assert.ok(
      /<meta[^>]+name=["']viewport["']/i.test(content) && /width=device-width/i.test(content),
      'P2 HTML must declare responsive viewport with width=device-width'
    );
  });

  test('[F2] P2 metadata schema boundaries (screenId, projectId, and deviceType format)', () => {
    assertJsonMatches(P2_META, (meta) => {
      assert.strictEqual(typeof meta.screenId, 'string', 'screenId must be a string');
      assert.match(meta.screenId, /^projects\/[0-9]+\/screens\/[a-f0-9]{32}$/, 'screenId must match Stitch resource name syntax');
      assert.strictEqual(typeof meta.projectId, 'string', 'projectId must be a string');
      assert.match(meta.projectId, /^[0-9]+$/, 'projectId must be a numeric string ID');
      assert.strictEqual(meta.deviceType, 'DESKTOP', 'deviceType must be DESKTOP');
      assert.strictEqual(typeof meta.title, 'string', 'title must be a string');
      assert.ok(meta.title.length > 5, 'title must be descriptive (> 5 chars)');
      return true;
    });
  });

  test('[F2] P2 metadata dimensions boundary (positive width and height >= 1000px)', () => {
    assertJsonMatches(P2_META, (meta) => {
      assert.ok(meta.dimensions, 'dimensions object must exist in metadata');
      assert.strictEqual(typeof meta.dimensions.width, 'number', 'dimensions.width must be a number');
      assert.strictEqual(typeof meta.dimensions.height, 'number', 'dimensions.height must be a number');
      assert.ok(meta.dimensions.width >= 1000, `Width (${meta.dimensions.width}) must be >= 1000px desktop boundary`);
      assert.ok(meta.dimensions.height >= 1000, `Height (${meta.dimensions.height}) must be >= 1000px long-scroll boundary`);
      return true;
    });
  });

  // ---------------------------------------------------------------------------
  // F3: Stitch Mockup Local Export Binary Integrity & Corruption Detection
  // ---------------------------------------------------------------------------

  test('[F3] P1 PNG screenshot magic byte boundary verification', () => {
    assertFileExists(P1_PNG, 'P1 mockup PNG must exist');
    const buffer = fs.readFileSync(P1_PNG);
    assert.ok(buffer.length >= 100000, `P1 PNG size (${buffer.length} bytes) must be >= 100KB for high-res export`);
    const result = parseAndValidatePng(buffer, 'P1 PNG');
    assert.ok(result.width >= 100, `P1 PNG width (${result.width}) must be >= 100px`);
    assert.ok(result.height >= 100, `P1 PNG height (${result.height}) must be >= 100px`);
  });

  test('[F3] P1 PNG IHDR chunk presence and dimension lower bounds (>= 100x100)', () => {
    const buffer = fs.readFileSync(P1_PNG);
    const result = parseAndValidatePng(buffer, 'P1 PNG');
    assert.strictEqual(result.width, 1440, 'P1 PNG export width matches standard 1440px viewport');
    assert.ok(result.height >= 1440, `P1 PNG height (${result.height}) must accommodate page height`);
  });

  test('[F3] P2 PNG screenshot magic byte boundary verification', () => {
    assertFileExists(P2_PNG, 'P2 mockup PNG must exist');
    const buffer = fs.readFileSync(P2_PNG);
    assert.ok(buffer.length >= 100000, `P2 PNG size (${buffer.length} bytes) must be >= 100KB for high-res export`);
    const result = parseAndValidatePng(buffer, 'P2 PNG');
    assert.ok(result.width >= 100, `P2 PNG width (${result.width}) must be >= 100px`);
    assert.ok(result.height >= 100, `P2 PNG height (${result.height}) must be >= 100px`);
  });

  test('[F3] P2 PNG IHDR chunk presence and dimension lower bounds (>= 100x100)', () => {
    const buffer = fs.readFileSync(P2_PNG);
    const result = parseAndValidatePng(buffer, 'P2 PNG');
    assert.strictEqual(result.width, 1440, 'P2 PNG export width matches standard 1440px viewport');
    assert.ok(result.height >= 1440, `P2 PNG height (${result.height}) must accommodate page height`);
  });

  test('[F3] Corruption detection boundary: truncated header and bad magic byte rejection', () => {
    // 1. Buffer smaller than minimum PNG structure
    assert.throws(() => {
      parseAndValidatePng(Buffer.from([0x89, 0x50, 0x4E, 0x47]), 'Truncated');
    }, /Buffer truncated/);

    // 2. Corrupted magic bytes
    assert.throws(() => {
      const badMagic = Buffer.alloc(40);
      badMagic.write('GIF89a', 0);
      parseAndValidatePng(badMagic, 'BadMagic');
    }, /Invalid PNG signature/);

    // 3. Valid magic bytes but corrupted chunk type (not IHDR)
    assert.throws(() => {
      const badChunk = Buffer.alloc(40);
      PNG_MAGIC.copy(badChunk, 0);
      badChunk.writeUInt32BE(13, 8);
      badChunk.write('IDAT', 12);
      parseAndValidatePng(badChunk, 'BadChunk');
    }, /Expected first chunk to be IHDR/);

    // 4. Zero dimensions in IHDR
    assert.throws(() => {
      const zeroDim = Buffer.alloc(40);
      PNG_MAGIC.copy(zeroDim, 0);
      zeroDim.writeUInt32BE(13, 8);
      zeroDim.write('IHDR', 12);
      zeroDim.writeUInt32BE(0, 16); // width = 0
      zeroDim.writeUInt32BE(100, 20); // height = 100
      parseAndValidatePng(zeroDim, 'ZeroDim');
    }, /Zero dimension encountered/);
  });

  test('[F3] Local export file path boundary: metadata paths match existing on-disk files', () => {
    const p1Meta = JSON.parse(fs.readFileSync(P1_META, 'utf8'));
    assert.ok(fs.existsSync(p1Meta.htmlPath), `P1 metadata htmlPath must exist: ${p1Meta.htmlPath}`);
    assert.ok(fs.existsSync(p1Meta.imagePath), `P1 metadata imagePath must exist: ${p1Meta.imagePath}`);

    const p2Meta = JSON.parse(fs.readFileSync(P2_META, 'utf8'));
    assert.ok(fs.existsSync(p2Meta.htmlPath), `P2 metadata htmlPath must exist: ${p2Meta.htmlPath}`);
    assert.ok(fs.existsSync(p2Meta.imagePath), `P2 metadata imagePath must exist: ${p2Meta.imagePath}`);
  });

});
