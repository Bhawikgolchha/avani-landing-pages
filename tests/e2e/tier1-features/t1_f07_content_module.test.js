/**
 * Tier 1 Feature Coverage: F7 — Shared Brand Content Module
 * 
 * Verifies that src/lib/avaniContent.ts exports complete, accurate, and verbatim
 * content sourced from the official Avani Briefing PDF:
 * - Exactly 5 Objectives
 * - Exactly 5 Specialized Teams
 * - Exactly 4 Flagship Events
 * - Exactly 11 Daily Climate Tips
 * - Organization Overview & External Contact Channels
 */

const path = require('node:path');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');
const {
  describe,
  test,
  it,
  assertFileExists,
  assertFileNonEmpty,
  assert
} = require('../harness');

const CONTENT_FILE = path.resolve(process.cwd(), 'src/lib/avaniContent.ts');

describe('F7: Shared Brand Content Module', { feature: 'F7', tier: 1 }, () => {
  let contentMod;

  test('F7.1: src/lib/avaniContent.ts exists and exports expected inventory counts', async () => {
    assertFileExists(CONTENT_FILE, 'avaniContent.ts must exist');
    contentMod = await import(pathToFileURL(CONTENT_FILE).href);

    assert.ok(contentMod, 'Module must load successfully');
    assert.strictEqual(contentMod.AVANI_OBJECTIVES.length, 5, 'Must export exactly 5 objectives');
    assert.strictEqual(contentMod.AVANI_TEAMS.length, 5, 'Must export exactly 5 teams');
    assert.strictEqual(contentMod.AVANI_EVENTS.length, 4, 'Must export exactly 4 events');
    assert.strictEqual(contentMod.CLIMATE_TIPS.length, 11, 'Must export exactly 11 climate tips');
    assert.strictEqual(
      contentMod.EXTERNAL_LINKS.substackArticles.length,
      3,
      'Must export exactly 3 Substack articles'
    );
  });

  test('F7.2: 5 Core Objectives interface and verbatim copy compliance', async () => {
    if (!contentMod) contentMod = await import(pathToFileURL(CONTENT_FILE).href);
    const { AVANI_OBJECTIVES } = contentMod;

    const expectedTitles = [
      'Climate Advocacy',
      'Resource Restoration',
      'Pollution Reduction',
      'Waste Management',
      'Sustainable Movement Publicity'
    ];

    AVANI_OBJECTIVES.forEach((obj, idx) => {
      assert.strictEqual(obj.id, idx + 1, `Objective id must match 1-based index`);
      assert.ok(expectedTitles.includes(obj.title), `Unexpected objective title: ${obj.title}`);
      assert.ok(obj.description && obj.description.length > 10, `Objective ${obj.id} must have description`);
      assert.ok(obj.icon, `Objective ${obj.id} must specify an icon string`);
    });

    const fileText = fs.readFileSync(CONTENT_FILE, 'utf8');
    assert.ok(
      fileText.includes('To advocate for actions against climate change'),
      'Must contain verbatim Objective 1 text'
    );
    assert.ok(
      fileText.includes('upliftment and restoration of natural resources in India'),
      'Must contain verbatim Objective 2 text'
    );
  });

  test('F7.3: 5 Specialized Teams interface compliance', async () => {
    if (!contentMod) contentMod = await import(pathToFileURL(CONTENT_FILE).href);
    const { AVANI_TEAMS } = contentMod;

    const expectedIds = [
      'research-writing',
      'design',
      'hr-communications',
      'social-media',
      'event-planning'
    ];

    AVANI_TEAMS.forEach((team) => {
      assert.ok(expectedIds.includes(team.id), `Unexpected team id: ${team.id}`);
      assert.ok(team.name, `Team ${team.id} must have name`);
      assert.ok(team.description, `Team ${team.id} must have description`);
      assert.ok(Array.isArray(team.responsibilities) && team.responsibilities.length > 0, `Team ${team.id} must have responsibilities array`);
    });
  });

  test('F7.4: 4 Flagship Events interface and asset path compliance', async () => {
    if (!contentMod) contentMod = await import(pathToFileURL(CONTENT_FILE).href);
    const { AVANI_EVENTS } = contentMod;

    const expectedEventIds = [
      'dps-donation-drive',
      'invictus-denim-stall',
      'orphanage-donation-aarogi',
      'beyond-the-waste-workshop'
    ];

    AVANI_EVENTS.forEach((ev) => {
      assert.ok(expectedEventIds.includes(ev.id), `Unexpected event id: ${ev.id}`);
      assert.ok(ev.title, `Event ${ev.id} must have title`);
      assert.ok(ev.subtitle, `Event ${ev.id} must have subtitle`);
      assert.ok(ev.description, `Event ${ev.id} must have description`);
      assert.ok(
        ev.image.startsWith('/assets/images/'),
        `Event ${ev.id} image path must start with /assets/images/`
      );
    });
  });

  test('F7.5: 11 Climate Tips categories and sequencing compliance', async () => {
    if (!contentMod) contentMod = await import(pathToFileURL(CONTENT_FILE).href);
    const { CLIMATE_TIPS } = contentMod;

    const allowedCategories = ['energy', 'water', 'waste', 'consumption'];

    CLIMATE_TIPS.forEach((tip, idx) => {
      assert.strictEqual(tip.id, idx + 1, `Climate tip #${idx + 1} must have id ${idx + 1}`);
      assert.ok(tip.action && tip.action.length > 15, `Tip #${tip.id} action must be non-trivial string`);
      assert.ok(
        allowedCategories.includes(tip.category),
        `Tip #${tip.id} category "${tip.category}" must be in [${allowedCategories.join(', ')}]`
      );
    });
  });

  test('F7.6: Organization Overview and 7 external contact channels compliance', async () => {
    if (!contentMod) contentMod = await import(pathToFileURL(CONTENT_FILE).href);
    const { AVANI_ORGANIZATION, EXTERNAL_LINKS } = contentMod;

    assert.strictEqual(AVANI_ORGANIZATION.name, 'Avani');
    assert.strictEqual(AVANI_ORGANIZATION.city, 'Bangalore');
    assert.strictEqual(EXTERNAL_LINKS.email, 'avaniyocc@gmail.com');
    assert.strictEqual(EXTERNAL_LINKS.phone, '+91 8050931769');
    assert.ok(EXTERNAL_LINKS.applicationForm.includes('docs.google.com/forms'));
    assert.ok(EXTERNAL_LINKS.linkedIn.includes('linkedin.com'));
    assert.ok(EXTERNAL_LINKS.substack.includes('substack.com'));
    assert.ok(EXTERNAL_LINKS.instagram.includes('instagram.com'));
  });
});
