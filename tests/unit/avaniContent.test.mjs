import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { 
  avaniObjectives, 
  avaniTeams, 
  avaniEvents, 
  climateTips, 
  EXTERNAL_LINKS, 
  avaniContact,
  AVANI_ORGANIZATION 
} from '../../src/lib/avaniContent.ts';

test('F7 Content Module: Exact inventory lengths', () => {
  assert.strictEqual(avaniObjectives.length, 5, 'Must have exactly 5 objectives');
  assert.strictEqual(avaniTeams.length, 5, 'Must have exactly 5 teams');
  assert.strictEqual(avaniEvents.length, 4, 'Must have exactly 4 events');
  assert.strictEqual(climateTips.length, 11, 'Must have exactly 11 climate tips');
  assert.strictEqual(EXTERNAL_LINKS.substackArticles.length, 3, 'Must have exactly 3 Substack articles');
});

test('F7 Content Module: 5 Objectives interface compliance', () => {
  const expectedTitles = [
    'Climate Advocacy',
    'Resource Restoration',
    'Pollution Reduction',
    'Waste Management',
    'Sustainable Movement Publicity'
  ];

  avaniObjectives.forEach((obj, idx) => {
    assert.strictEqual(typeof obj.id, 'number', `Objective ${idx} id must be a number`);
    assert.ok(obj.title, `Objective ${idx} must have title`);
    assert.ok(obj.description, `Objective ${idx} must have description`);
    assert.ok(obj.icon, `Objective ${idx} must have icon`);
    assert.ok(expectedTitles.includes(obj.title), `Unexpected objective title: ${obj.title}`);
  });
});

test('F7 Content Module: 5 Teams interface compliance', () => {
  const expectedTeamIds = [
    'research-writing',
    'design',
    'hr-communications',
    'social-media',
    'event-planning'
  ];

  avaniTeams.forEach((team) => {
    assert.ok(expectedTeamIds.includes(team.id), `Unexpected team id: ${team.id}`);
    assert.ok(team.name, `Team ${team.id} must have a name`);
    assert.ok(team.description, `Team ${team.id} must have a description`);
    assert.ok(Array.isArray(team.responsibilities), `Team ${team.id} responsibilities must be an array`);
    assert.ok(team.responsibilities.length > 0, `Team ${team.id} must have responsibilities`);
  });
});

test('F7 Content Module: 4 Flagship Events interface compliance', () => {
  const expectedEventIds = [
    'dps-donation-drive',
    'invictus-denim-stall',
    'orphanage-donation-aarogi',
    'beyond-the-waste-workshop'
  ];

  avaniEvents.forEach((ev) => {
    assert.ok(expectedEventIds.includes(ev.id), `Unexpected event id: ${ev.id}`);
    assert.ok(ev.title, `Event ${ev.id} must have title`);
    assert.ok(ev.subtitle, `Event ${ev.id} must have subtitle`);
    assert.ok(ev.description, `Event ${ev.id} must have description`);
    assert.ok(ev.image.startsWith('/assets/images/'), `Event ${ev.id} image must be in /assets/images/`);
  });
});

test('F7 Content Module: 11 Climate Tips categories and sequencing', () => {
  const validCategories = ['energy', 'water', 'waste', 'consumption'];
  
  climateTips.forEach((tip, idx) => {
    assert.strictEqual(tip.id, idx + 1, `Tip ${idx} id must match sequential 1-based index`);
    assert.ok(tip.action && tip.action.length > 10, `Tip ${tip.id} action must be non-empty string`);
    assert.ok(validCategories.includes(tip.category), `Tip ${tip.id} has invalid category: ${tip.category}`);
  });
});

test('F7 Content Module: External Links and Contacts', () => {
  assert.strictEqual(EXTERNAL_LINKS.email, 'avaniyocc@gmail.com');
  assert.strictEqual(EXTERNAL_LINKS.phone, '+91 8050931769');
  assert.ok(EXTERNAL_LINKS.applicationForm.startsWith('https://docs.google.com/forms/'));
  assert.ok(EXTERNAL_LINKS.linkedIn.startsWith('https://www.linkedin.com/'));
  assert.ok(EXTERNAL_LINKS.substack.startsWith('https://open.substack.com/'));
  assert.ok(EXTERNAL_LINKS.instagram.startsWith('https://www.instagram.com/'));

  EXTERNAL_LINKS.substackArticles.forEach((art, i) => {
    assert.ok(art.title, `Article ${i} must have title`);
    assert.ok(art.url.startsWith('https://substack.com/'), `Article ${i} url must be Substack https`);
  });

  // Check avaniContact contract
  assert.strictEqual(avaniContact.email, 'avaniyocc@gmail.com');
  assert.strictEqual(avaniContact.phone, '+91 8050931769');
  assert.strictEqual(avaniContact.applicationFormUrl, EXTERNAL_LINKS.applicationForm);
  assert.strictEqual(avaniContact.linkedInUrl, EXTERNAL_LINKS.linkedIn);
  assert.strictEqual(avaniContact.substackUrl, EXTERNAL_LINKS.substack);
  assert.strictEqual(avaniContact.instagramUrl, EXTERNAL_LINKS.instagramClean);
});

test('F7 Content Module: Verbatim signature phrasing from PDF', () => {
  const fileContent = fs.readFileSync(
    path.resolve(process.cwd(), 'src/lib/avaniContent.ts'),
    'utf-8'
  );

  assert.ok(
    fileContent.includes('committed to making a change in the way we treat our environment'),
    'Must include verbatim mission statement'
  );
  assert.ok(fileContent.includes('DPS Donation Drive'), 'Must include DPS Donation Drive');
  assert.ok(fileContent.includes('Invictus Denim Stall'), 'Must include Invictus Denim Stall');
  assert.ok(fileContent.includes('Aarogi'), 'Must include Aarogi');
  assert.ok(fileContent.includes('Beyond the Waste Workshop'), 'Must include Beyond the Waste Workshop');
});
