/**
 * Tier 2 Boundary & Corner Case Tests: F4, F5
 * 
 * Covers:
 * - F4: Google Flow Media Generation boundaries (zero-byte detection, WebP headers, dimensions, aspect ratio, corruption)
 * - F5: Brand Logo Integration & WCAG Contrast boundaries (JPEG magic bytes, dimensions, extreme background color contrast)
 */

const fs = require('node:fs');
const path = require('node:path');
const {
  describe,
  test,
  assertFileExists,
  assertFileNonEmpty,
  assertColorContrast,
  assert
} = require('../harness');

const IMAGES_DIR = path.resolve(process.cwd(), 'public/assets/images');
const BRANDING_DIR = path.resolve(process.cwd(), 'public/assets/branding');
const LOGO_PATH = path.join(BRANDING_DIR, 'logo.jpg');

const REQUIRED_IMAGES = [
  'hero_nature_canopy.webp',
  'hero_ecotech_globe.webp',
  'event_dps_drive.webp',
  'event_invictus_denim.webp',
  'event_orphanage_aarogi.webp',
  'event_waste_workshop.webp',
  'climate_tips_infographic.webp'
];

/**
 * Validates WebP header structure and extracts dimensions.
 * Handles lossy VP8 chunk headers.
 */
function parseAndValidateWebp(buffer, sourceName = 'WebP') {
  if (!Buffer.isBuffer(buffer)) {
    throw new assert.AssertionError({
      message: `${sourceName}: Expected Buffer, got ${typeof buffer}`,
      operator: 'parseAndValidateWebp'
    });
  }

  // Minimum RIFF header: 4 (RIFF) + 4 (size) + 4 (WEBP) = 12 bytes
  if (buffer.length < 30) {
    throw new assert.AssertionError({
      message: `${sourceName}: Buffer truncated (${buffer.length} bytes < 30 bytes minimum)`,
      expected: '>= 30 bytes',
      actual: `${buffer.length} bytes`,
      operator: 'parseAndValidateWebp'
    });
  }

  const riff = buffer.subarray(0, 4).toString('ascii');
  const webp = buffer.subarray(8, 12).toString('ascii');

  if (riff !== 'RIFF' || webp !== 'WEBP') {
    throw new assert.AssertionError({
      message: `${sourceName}: Invalid WebP header (RIFF="${riff}", WEBP="${webp}")`,
      expected: 'RIFF ... WEBP',
      actual: `${riff} ... ${webp}`,
      operator: 'parseAndValidateWebp'
    });
  }

  const chunkType = buffer.subarray(12, 16).toString('ascii');
  let width = 0;
  let height = 0;

  if (chunkType === 'VP8 ') {
    // Lossy VP8 format
    width = buffer.readUInt16LE(26) & 0x3fff;
    height = buffer.readUInt16LE(28) & 0x3fff;
  } else if (chunkType === 'VP8L') {
    // Lossless VP8L format
    const b1 = buffer.readUInt8(21);
    const b2 = buffer.readUInt8(22);
    const b3 = buffer.readUInt8(23);
    const b4 = buffer.readUInt8(24);
    width = 1 + (((b2 & 0x3f) << 8) | b1);
    height = 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6));
  } else if (chunkType === 'VP8X') {
    // Extended VP8X format
    width = 1 + (buffer.readUInt8(24) | (buffer.readUInt8(25) << 8) | (buffer.readUInt8(26) << 16));
    height = 1 + (buffer.readUInt8(27) | (buffer.readUInt8(28) << 8) | (buffer.readUInt8(29) << 16));
  } else {
    throw new assert.AssertionError({
      message: `${sourceName}: Unsupported or malformed WebP chunk type "${chunkType}"`,
      expected: 'VP8 , VP8L, or VP8X',
      actual: chunkType,
      operator: 'parseAndValidateWebp'
    });
  }

  if (width === 0 || height === 0) {
    throw new assert.AssertionError({
      message: `${sourceName}: Zero dimension in WebP (${width}x${height})`,
      expected: 'width > 0 and height > 0',
      actual: `${width}x${height}`,
      operator: 'parseAndValidateWebp'
    });
  }

  return { width, height, chunkType, length: buffer.length };
}

/**
 * Validates JPEG header and extracts dimensions from SOF marker.
 */
function parseAndValidateJpeg(buffer, sourceName = 'JPEG') {
  if (!Buffer.isBuffer(buffer)) {
    throw new assert.AssertionError({
      message: `${sourceName}: Expected Buffer, got ${typeof buffer}`,
      operator: 'parseAndValidateJpeg'
    });
  }

  if (buffer.length < 100) {
    throw new assert.AssertionError({
      message: `${sourceName}: Buffer truncated (${buffer.length} bytes)`,
      expected: '>= 100 bytes',
      actual: `${buffer.length} bytes`,
      operator: 'parseAndValidateJpeg'
    });
  }

  // Check SOI marker (0xFF, 0xD8, 0xFF)
  if (buffer[0] !== 0xFF || buffer[1] !== 0xD8 || buffer[2] !== 0xFF) {
    throw new assert.AssertionError({
      message: `${sourceName}: Invalid JPEG SOI marker`,
      expected: 'FF D8 FF',
      actual: `${buffer[0].toString(16)} ${buffer[1].toString(16)} ${buffer[2].toString(16)}`,
      operator: 'parseAndValidateJpeg'
    });
  }

  let offset = 2;
  let width = 0;
  let height = 0;

  while (offset < buffer.length - 8) {
    if (buffer[offset] === 0xFF) {
      const marker = buffer[offset + 1];
      // Baseline SOF0 (0xC0) or Progressive SOF2 (0xC2)
      if (marker === 0xC0 || marker === 0xC2) {
        height = buffer.readUInt16BE(offset + 5);
        width = buffer.readUInt16BE(offset + 7);
        break;
      } else if (marker === 0xD9 || marker === 0xDA) {
        // End of image or Start of scan
        break;
      } else {
        const chunkLen = buffer.readUInt16BE(offset + 2);
        offset += 2 + chunkLen;
      }
    } else {
      offset++;
    }
  }

  if (width === 0 || height === 0) {
    throw new assert.AssertionError({
      message: `${sourceName}: Could not extract JPEG dimensions from SOF marker`,
      expected: 'valid SOF0/SOF2 marker',
      actual: 'marker not found or dimensions 0',
      operator: 'parseAndValidateJpeg'
    });
  }

  return { width, height, length: buffer.length };
}

describe('Tier 2: Media Generation & Logo Contrast Boundaries (F4, F5)', () => {

  // ---------------------------------------------------------------------------
  // F4: Google Flow Media Generation Boundaries
  // ---------------------------------------------------------------------------

  test('[F4] Zero-byte asset detection: all required images exceed 50KB lower bound', () => {
    REQUIRED_IMAGES.forEach((filename) => {
      const filePath = path.join(IMAGES_DIR, filename);
      assertFileNonEmpty(filePath, 50000, `Image "${filename}" must exceed 50KB (not a stub)`);
    });
  });

  test('[F4] WebP format container boundaries: RIFF and WEBP magic bytes present', () => {
    REQUIRED_IMAGES.forEach((filename) => {
      const filePath = path.join(IMAGES_DIR, filename);
      const buffer = fs.readFileSync(filePath);
      const result = parseAndValidateWebp(buffer, filename);
      assert.strictEqual(result.chunkType.trim(), 'VP8', `Image "${filename}" must use VP8 WebP codec`);
    });
  });

  test('[F4] Hero banner dimension boundaries: minimum 600px width and 300px height', () => {
    ['hero_nature_canopy.webp', 'hero_ecotech_globe.webp'].forEach((heroFile) => {
      const filePath = path.join(IMAGES_DIR, heroFile);
      const buffer = fs.readFileSync(filePath);
      const result = parseAndValidateWebp(buffer, heroFile);
      assert.ok(result.width >= 600, `${heroFile} width (${result.width}) must be >= 600px`);
      assert.ok(result.height >= 300, `${heroFile} height (${result.height}) must be >= 300px`);
    });
  });

  test('[F4] Flagship event card dimension boundaries: minimum 400px width and 200px height', () => {
    const eventFiles = [
      'event_dps_drive.webp',
      'event_invictus_denim.webp',
      'event_orphanage_aarogi.webp',
      'event_waste_workshop.webp'
    ];
    eventFiles.forEach((eventFile) => {
      const filePath = path.join(IMAGES_DIR, eventFile);
      const buffer = fs.readFileSync(filePath);
      const result = parseAndValidateWebp(buffer, eventFile);
      assert.ok(result.width >= 400, `${eventFile} width (${result.width}) must be >= 400px`);
      assert.ok(result.height >= 200, `${eventFile} height (${result.height}) must be >= 200px`);
    });
  });

  test('[F4] Media aspect ratio boundary: hero images maintain landscape ratio (>= 1.5:1)', () => {
    ['hero_nature_canopy.webp', 'hero_ecotech_globe.webp'].forEach((heroFile) => {
      const filePath = path.join(IMAGES_DIR, heroFile);
      const buffer = fs.readFileSync(filePath);
      const result = parseAndValidateWebp(buffer, heroFile);
      const ratio = result.width / result.height;
      assert.ok(ratio >= 1.5, `${heroFile} aspect ratio (${ratio.toFixed(2)}) must be landscape (>= 1.5:1)`);
    });
  });

  test('[F4] File extension boundary: images directory contains only standard web formats', () => {
    const files = fs.readdirSync(IMAGES_DIR);
    const validExts = ['.webp', '.png', '.jpg', '.jpeg', '.svg'];
    files.forEach((file) => {
      const ext = path.extname(file).toLowerCase();
      assert.ok(validExts.includes(ext), `Unexpected file extension in media directory: ${file}`);
    });
  });

  test('[F4] Missing asset detection boundary: non-existent file query throws assertion error', () => {
    assert.throws(() => {
      assertFileExists(path.join(IMAGES_DIR, 'hero_nonexistent_9999.webp'));
    }, /File does not exist/);
  });

  test('[F4] Corrupted WebP detection boundary: truncated header buffer is identified and rejected', () => {
    // 1. Truncated buffer (< 30 bytes)
    assert.throws(() => {
      parseAndValidateWebp(Buffer.from('RIFF1234WEBP'), 'TruncatedWebP');
    }, /Buffer truncated/);

    // 2. Corrupted header tags
    assert.throws(() => {
      const badHeader = Buffer.alloc(40);
      badHeader.write('FORM0000WEBP', 0);
      parseAndValidateWebp(badHeader, 'BadHeaderWebP');
    }, /Invalid WebP header/);
  });

  // ---------------------------------------------------------------------------
  // F5: Brand Logo Integration & WCAG Contrast Boundaries
  // ---------------------------------------------------------------------------

  test('[F5] Brand logo zero-byte and minimum file size boundary (>= 20KB)', () => {
    assertFileNonEmpty(LOGO_PATH, 20000, 'Brand logo must exceed 20KB for high-resolution reproduction');
  });

  test('[F5] Brand logo JPEG magic byte boundary (FF D8 FF)', () => {
    const buffer = fs.readFileSync(LOGO_PATH);
    const result = parseAndValidateJpeg(buffer, 'Brand Logo');
    assert.ok(result.width >= 200, `Logo width (${result.width}) must be >= 200px`);
    assert.ok(result.height >= 200, `Logo height (${result.height}) must be >= 200px`);
  });

  test('[F5] Brand logo dimension boundaries: minimum 200x200 resolution', () => {
    const buffer = fs.readFileSync(LOGO_PATH);
    const result = parseAndValidateJpeg(buffer, 'Brand Logo');
    assert.strictEqual(result.width, 1024, 'Official Avani logo asset width is 1024px');
    assert.strictEqual(result.height, 855, 'Official Avani logo asset height is 855px');
  });

  test('[F5] WCAG contrast boundary: brand primary #163515 on pure white #FFFFFF exceeds 10:1 (AAA)', () => {
    const ratio = assertColorContrast('#163515', '#FFFFFF', 10.0);
    assert.ok(ratio >= 13.0, `Contrast ratio (${ratio}:1) must exceed 13.0:1`);
  });

  test('[F5] WCAG contrast boundary: sage text #DCE7D4 on brand forest #163515 exceeds 7:1 (AAA)', () => {
    const ratio = assertColorContrast('#DCE7D4', '#163515', 7.0);
    assert.ok(ratio >= 10.0, `Contrast ratio (${ratio}:1) must exceed 10.0:1`);
  });

  test('[F5] WCAG contrast boundary: cyan accent #22D3EE on dark background #080C0E exceeds 9:1 (AAA)', () => {
    const ratio = assertColorContrast('#22D3EE', '#080C0E', 9.0);
    assert.ok(ratio >= 10.0, `Contrast ratio (${ratio}:1) must exceed 10.0:1`);
  });

  test('[F5] WCAG contrast boundary: negative test rejects low contrast pairs below 4.5:1', () => {
    // Brand dark green #163515 against dark cyan #080C0E has ratio ~1.45:1
    assert.throws(() => {
      assertColorContrast('#163515', '#080C0E', 4.5);
    }, /below required threshold 4.5:1/);

    // Brand dark green against dark emerald #064E3B has ratio ~1.39:1
    assert.throws(() => {
      assertColorContrast('#163515', '#064E3B', 4.5);
    }, /below required threshold 4.5:1/);
  });

  test('[F5] Logo aspect ratio boundary: near-square emblem ratio (between 0.8:1 and 1.3:1)', () => {
    const buffer = fs.readFileSync(LOGO_PATH);
    const result = parseAndValidateJpeg(buffer, 'Brand Logo');
    const ratio = result.width / result.height;
    assert.ok(ratio >= 0.8 && ratio <= 1.3, `Logo aspect ratio (${ratio.toFixed(2)}) must be near-square`);
  });

});
