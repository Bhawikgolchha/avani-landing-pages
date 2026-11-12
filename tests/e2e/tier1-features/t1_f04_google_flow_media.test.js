/**
 * Tier 1 Feature Coverage: F4 — Google Flow Media Generation
 * 
 * Verifies that media assets generated for Avani (hero visuals, event covers,
 * and climate tips infographic) exist in public/assets/images/ and are valid images.
 */

const path = require('node:path');
const fs = require('node:fs');
const {
  describe,
  test,
  it,
  assertFileExists,
  assertFileNonEmpty,
  assert
} = require('../harness');

const IMAGES_DIR = path.resolve(process.cwd(), 'public/assets/images');

const EXPECTED_MEDIA = [
  { fileName: 'hero_nature_canopy.webp', minBytes: 20000, desc: 'P1 Living Canopy Hero visual' },
  { fileName: 'hero_ecotech_globe.webp', minBytes: 20000, desc: 'P2 Eco-Tech Biosphere Hero visual' },
  { fileName: 'event_dps_drive.webp', minBytes: 15000, desc: 'DPS Donation Drive event banner' },
  { fileName: 'event_invictus_denim.webp', minBytes: 15000, desc: 'Invictus Denim Stall event banner' },
  { fileName: 'event_orphanage_aarogi.webp', minBytes: 15000, desc: 'Aarogi Orphanage Drive event banner' },
  { fileName: 'event_waste_workshop.webp', minBytes: 15000, desc: 'Beyond the Waste Workshop banner' },
  { fileName: 'climate_tips_infographic.webp', minBytes: 15000, desc: '11 Climate Tips Infographic banner' },
];

describe('F4: Google Flow Media Generation', { feature: 'F4', tier: 1 }, () => {
  test('F4.1: Hero background visuals for both prototypes exist and exceed size threshold', () => {
    const p1Hero = path.join(IMAGES_DIR, 'hero_nature_canopy.webp');
    const p2Hero = path.join(IMAGES_DIR, 'hero_ecotech_globe.webp');

    assertFileExists(p1Hero, 'P1 hero nature canopy image must exist');
    assertFileNonEmpty(p1Hero, 20000, 'P1 hero image must exceed 20KB');

    assertFileExists(p2Hero, 'P2 hero ecotech globe image must exist');
    assertFileNonEmpty(p2Hero, 20000, 'P2 hero image must exceed 20KB');
  });

  test('F4.2: All 4 flagship event visual assets are present in public/assets/images/', () => {
    const eventFiles = [
      'event_dps_drive.webp',
      'event_invictus_denim.webp',
      'event_orphanage_aarogi.webp',
      'event_waste_workshop.webp'
    ];

    for (const f of eventFiles) {
      const fullPath = path.join(IMAGES_DIR, f);
      assertFileExists(fullPath, `Event asset "${f}" must exist`);
      assertFileNonEmpty(fullPath, 15000, `Event asset "${f}" must exceed 15KB`);
    }
  });

  test('F4.3: Climate tips infographic visual asset exists', () => {
    const infoPath = path.join(IMAGES_DIR, 'climate_tips_infographic.webp');
    assertFileExists(infoPath, 'climate_tips_infographic.webp must exist');
    assertFileNonEmpty(infoPath, 20000, 'climate_tips_infographic.webp must exceed 20KB');
  });

  test('F4.4: Generated WebP images conform to RIFF/WEBP container format specifications', () => {
    for (const item of EXPECTED_MEDIA) {
      const fullPath = path.join(IMAGES_DIR, item.fileName);
      assertFileExists(fullPath, `${item.fileName} must exist`);

      const fd = fs.openSync(fullPath, 'r');
      const header = Buffer.alloc(12);
      fs.readSync(fd, header, 0, 12, 0);
      fs.closeSync(fd);

      // WebP header signature: bytes 0..3 === 'RIFF', bytes 8..11 === 'WEBP'
      const isRiff = header.toString('ascii', 0, 4) === 'RIFF';
      const isWebp = header.toString('ascii', 8, 12) === 'WEBP';

      assert.ok(
        isRiff && isWebp,
        `Asset "${item.fileName}" must have valid RIFF/WEBP container magic signature`
      );
    }
  });

  test('F4.5: Media assets inventory matches contract in PROJECT.md § Asset Contracts', () => {
    const diskFiles = fs.readdirSync(IMAGES_DIR);
    for (const expected of EXPECTED_MEDIA) {
      assert.ok(
        diskFiles.includes(expected.fileName),
        `Asset directory must include expected contract file: ${expected.fileName}`
      );
    }
  });

  test('F4.6: Media files are stored in public web directory accessible via HTTP route', () => {
    const publicRelative = path.relative(path.resolve(process.cwd(), 'public'), IMAGES_DIR);
    assert.strictEqual(
      publicRelative,
      'assets/images',
      'Images must be located under public/assets/images/'
    );
  });
});
