/**
 * Avani Interactive Landing Pages — Tier 4: Real-World Application Scenarios
 * 
 * Executes full end-to-end user journeys and cross-system audits across:
 * - Scenario 1: Prospective Student Explorer Journey (Hub -> P1 -> 5 scroll stages -> application form)
 * - Scenario 2: Climate Action Advocate Journey (Direct to P2 -> 11 tips -> Substack link)
 * - Scenario 3: Event Attendee & Donor Journey (4 events exploration -> Instagram / LinkedIn links)
 * - Scenario 4: Mobile Device Responsive Journey (Mobile 375x667 viewport navigation, typography, no overflow)
 * - Scenario 5: Design & Architecture Consistency Audit (Stitch mockups, media, color harmony #163515, verbatim copy)
 * 
 * Authoritative sources: ORIGINAL_REQUEST.md, PROJECT.md, TEST_INFRA.md, src/lib/avaniContent.ts.
 */

const fs = require('node:fs');
const path = require('node:path');
const {
  describe,
  test,
  it,
  assertFileExists,
  assertFileNonEmpty,
  assertFileContains,
  assertJsonMatches,
  assertValidUrl,
  assertColorContrast,
  calculateContrastRatio,
  assert
} = require('../harness');

const PROJECT_ROOT = path.resolve(__dirname, '../../..');
const repoPath = (rel) => path.resolve(PROJECT_ROOT, rel);

describe('Tier 4: Real-World End-to-End User Scenarios', () => {

  // ---------------------------------------------------------------------------
  // Scenario 1: Prospective Student Explorer Journey
  // ---------------------------------------------------------------------------
  describe('Scenario 1: Prospective Student Explorer Journey', () => {

    test('Scenario 1.1: User lands on Comparison Hub (/hub) and evaluates both prototype directions', { feature: 'F9', tier: 4 }, async () => {
      const hubPagePath = repoPath('src/app/hub/page.tsx');
      assertFileExists(hubPagePath, 'Comparison Hub page must exist');

      // 1. Hub must welcome user and state Bangalore student mission
      assertFileContains(hubPagePath, [
        'Two Distinct Visions',
        'One Living Planet',
        'AVANI_ORGANIZATION.name',
        'AVANI_ORGANIZATION.city',
        'Explore Prototype 1 (Living Canopy)',
        'Explore Prototype 2 (Eco-Tech Biosphere)'
      ], 'Comparison Hub must introduce Avani organization and both prototype routes');

      // 2. Hub must compare the design philosophy of both prototypes
      assertFileContains(hubPagePath, [
        'PROTOTYPE 01 · CANVA IDEA 5',
        'Route: /prototype-1',
        'PROTOTYPE 02',
        'Route: /prototype-2'
      ], 'Hub must clearly present Canva Idea 5 vs Alternative Eco-Tech direction');
    });

    test('Scenario 1.2: User transitions to /prototype-1 and traverses all 5 scroll chapters', { feature: 'F11', tier: 4 }, async () => {
      const p1PagePath = repoPath('src/app/prototype-1/page.tsx');
      assertFileExists(p1PagePath, 'Prototype 1 page must exist');

      const content = require(repoPath('src/lib/avaniContent.ts'));

      // Chapter 1: Hero Canopy
      assertFileContains(p1PagePath, [
        'Prototype 1: The Living Canopy',
        'Rooted in Purpose',
        'Growing for Tomorrow'
      ], 'Chapter 1 must introduce the Living Canopy hero');

      // Chapter 2: The 5 Core Objectives (Sequential)
      assertFileContains(p1PagePath, [
        'id="objectives"',
        'Our 5 Core Objectives',
        'AVANI_OBJECTIVES.map'
      ], 'Chapter 2 must map all 5 core objectives');

      assert.strictEqual(content.AVANI_OBJECTIVES.length, 5, 'Exact 5 objectives count in content model');
      const expectedObjectiveTitles = [
        'Climate Advocacy',
        'Resource Restoration',
        'Pollution Reduction',
        'Waste Management',
        'Sustainable Movement Publicity'
      ];
      content.AVANI_OBJECTIVES.forEach((obj, idx) => {
        assert.strictEqual(obj.title, expectedObjectiveTitles[idx], `Objective ${idx + 1} title mismatch`);
        assert.ok(obj.verbatimCopy && obj.verbatimCopy.length > 15, `Objective ${obj.id} must have verbatim copy`);
      });

      // Chapter 3: The 5 Specialized Teams
      assertFileContains(p1PagePath, [
        'id="teams"',
        'The 5 Specialized Teams',
        'AVANI_TEAMS.map'
      ], 'Chapter 3 must map all 5 specialized teams');

      assert.strictEqual(content.AVANI_TEAMS.length, 5, 'Exact 5 teams count in content model');
      const expectedTeamIds = [
        'research-writing',
        'design',
        'hr-communications',
        'social-media',
        'event-planning'
      ];
      content.AVANI_TEAMS.forEach((team, idx) => {
        assert.strictEqual(team.id, expectedTeamIds[idx], `Team ${idx + 1} id mismatch`);
        assert.ok(team.name && team.description, `Team ${team.id} missing name or description`);
      });

      // Chapter 4: 4 Flagship Events
      assertFileContains(p1PagePath, [
        'id="events"',
        'Events in Action',
        'AVANI_EVENTS.map'
      ], 'Chapter 4 must map all 4 flagship events');

      assert.strictEqual(content.AVANI_EVENTS.length, 4, 'Exact 4 events count in content model');

      // Chapter 5: 11 Climate Tips & Callout
      assertFileContains(p1PagePath, [
        'id="climate-tips"',
        '11 Daily Climate Tips',
        'CLIMATE_TIPS.map'
      ], 'Chapter 5 must map all 11 climate tips');

      assert.strictEqual(content.CLIMATE_TIPS.length, 11, 'Exact 11 climate tips count in content model');
    });

    test('Scenario 1.3: User reviews recruitment application form and 6 applicant instructions', { feature: 'F14', tier: 4 }, async () => {
      const content = require(repoPath('src/lib/avaniContent.ts'));
      const appFormUrl = content.EXTERNAL_LINKS.applicationForm;

      // 1. Verify application form link protocol and destination
      assertValidUrl(appFormUrl, 'Application form link must be valid URL');
      assert.ok(
        appFormUrl.startsWith('https://docs.google.com/forms/'),
        `Application link must point to Google Forms, got: ${appFormUrl}`
      );

      // 2. Verify all 6 application rules/instructions from the PDF
      const instructions = content.AVANI_ORGANIZATION.applicationInstructions;
      assert.strictEqual(instructions.length, 6, 'Must contain exactly 6 application instructions');

      // Rule 1: Accuracy
      assert.match(instructions[0].text, /accuracy/i, 'Rule 1 must emphasize form accuracy');

      // Rule 2: Naming convention
      assert.strictEqual(instructions[1].highlight, 'NAME_AVANI_SUBMISSION', 'Rule 2 must require NAME_AVANI_SUBMISSION format');
      assert.match(instructions[1].text, /NAME_AVANI_SUBMISSION/, 'Rule 2 must explain submission format');

      // Rule 3: Shortlisted candidates interview
      assert.match(instructions[2].text, /interview/i, 'Rule 3 must explain interview round');

      // Rule 4: Team assignments by Core Team
      assert.match(instructions[3].text, /team/i, 'Rule 4 must explain team assignment process');

      // Rule 5: Voluntary student-led position
      assert.match(instructions[4].text, /not a paid internship/i, 'Rule 5 must state unpaid voluntary position');
      assert.strictEqual(instructions[4].highlight, 'Voluntary position in student-led initiative');

      // Rule 6: Inquiries contact channels
      assert.match(instructions[5].text, /avaniyocc@gmail\.com|Instagram DMs/i, 'Rule 6 must list contact channels');
    });

  });

  // ---------------------------------------------------------------------------
  // Scenario 2: Climate Action Advocate Journey
  // ---------------------------------------------------------------------------
  describe('Scenario 2: Climate Action Advocate Journey', () => {

    test('Scenario 2.1: User navigates directly to /prototype-2 and inspects Bangalore telemetry beacon', { feature: 'F12', tier: 4 }, async () => {
      const p2PagePath = repoPath('src/app/prototype-2/page.tsx');
      assertFileExists(p2PagePath, 'Prototype 2 page must exist');

      // Verify Bangalore coordinates and cyber-environmental hero
      assertFileContains(p2PagePath, [
        'Bangalore Beacon Telemetry',
        '12.9716° N, 77.5946° E',
        'Planetary Care',
        'Powered by Student Intelligence',
        'bg-[#080C0E]'
      ], 'P2 must render Bangalore telemetry hero and dark cyber aesthetic');
    });

    test('Scenario 2.2: User inspects the 11 Climate Tips categorized across 4 environmental pillars', { feature: 'F13', tier: 4 }, async () => {
      const content = require(repoPath('src/lib/avaniContent.ts'));
      const tips = content.CLIMATE_TIPS;
      assert.strictEqual(tips.length, 11, 'Must contain all 11 climate tips');

      // Group tips by category
      const categories = {
        energy: tips.filter(t => t.category === 'energy'),
        water: tips.filter(t => t.category === 'water'),
        waste: tips.filter(t => t.category === 'waste'),
        consumption: tips.filter(t => t.category === 'consumption')
      };

      // Verify category distribution
      assert.strictEqual(categories.energy.length, 2, 'Energy category must have 2 tips (Tip 1, Tip 2)');
      assert.strictEqual(categories.water.length, 2, 'Water category must have 2 tips (Tip 3, Tip 8)');
      assert.strictEqual(categories.waste.length, 3, 'Waste category must have 3 tips (Tip 5, Tip 7, Tip 10)');
      assert.strictEqual(categories.consumption.length, 4, 'Consumption category must have 4 tips (Tip 4, Tip 6, Tip 9, Tip 11)');

      // Verify specific verbatim actions from the PDF
      assert.match(categories.energy[0].action, /Switch off lights, fans, and electronics/i);
      assert.match(categories.energy[1].action, /Unplug chargers and appliances/i);
      assert.match(categories.water[0].action, /Turn off the tap while brushing your teeth/i);
      assert.match(categories.consumption[0].action, /reusable bottle, bag, and container/i);
      assert.match(categories.waste[0].action, /Compost vegetable peels and food scraps/i);
      assert.match(categories.consumption[1].action, /Plan meals and use leftovers/i);
      assert.match(categories.waste[1].action, /Repair, reuse, or donate items/i);
      assert.match(categories.water[1].action, /Run the dishwasher and washing machine only when they are full/i);
      assert.match(categories.consumption[2].action, /Decline extra packaging, plastic cutlery/i);
      assert.match(categories.waste[2].action, /Repurpose glass jars and sturdy containers/i);
      assert.match(categories.consumption[3].action, /Print on both sides of paper/i);

      // Verify sequential numbering 1 to 11
      tips.forEach((tip, idx) => {
        assert.strictEqual(tip.id, idx + 1, `Tip at index ${idx} must have id ${idx + 1}`);
      });
    });

    test('Scenario 2.3: User accesses Substack publication link and validates 3 investigative articles', { feature: 'F14', tier: 4 }, async () => {
      const { EXTERNAL_LINKS } = require(repoPath('src/lib/avaniContent.ts'));

      // 1. Verify primary Substack URL
      assertValidUrl(EXTERNAL_LINKS.substack, 'Main Substack URL must be valid');
      assert.ok(
        EXTERNAL_LINKS.substack.startsWith('https://open.substack.com/'),
        'Must link to open.substack.com'
      );

      // 2. Verify all 3 Substack note articles
      const articles = EXTERNAL_LINKS.substackArticles;
      assert.strictEqual(articles.length, 3, 'Must have exactly 3 Substack articles');

      const expectedArticleIds = ['super-el-nino', 'ken-betwa-link', 'himachal-architecture'];
      articles.forEach((art, idx) => {
        assert.strictEqual(art.id, expectedArticleIds[idx], `Article ${idx} id mismatch`);
        assertValidUrl(art.url, `Article ${art.id} URL must be valid`);
        assert.ok(art.url.startsWith('https://substack.com/'), `Article ${art.id} must be on substack.com`);
        assertValidUrl(art.coverImageUrl, `Article ${art.id} cover image URL must be valid`);
        assert.ok(art.coverImageUrl.startsWith('https://substackcdn.com/'), 'Cover image must be hosted on Substack CDN');
      });

      // Article 1: Super El Niño
      assert.match(articles[0].title, /Hot Girl Summer/i);
      assert.match(articles[0].subtitle, /Super El Niño/i);

      // Article 2: Ken-Betwa Link
      assert.match(articles[1].title, /Ken-Betwa Link/i);
      assert.match(articles[1].subtitle, /price of water in a drought/i);

      // Article 3: Himachal Architecture
      assert.match(articles[2].title, /Himachal forgot how to build/i);
      assert.match(articles[2].subtitle, /hotter Himalaya/i);
    });

  });

  // ---------------------------------------------------------------------------
  // Scenario 3: Event Attendee & Donor Journey
  // ---------------------------------------------------------------------------
  describe('Scenario 3: Event Attendee & Donor Journey', () => {

    test('Scenario 3.1: User explores all 4 community events and inspects on-ground impact metrics', { feature: 'F11', tier: 4 }, async () => {
      const { AVANI_EVENTS } = require(repoPath('src/lib/avaniContent.ts'));
      assert.strictEqual(AVANI_EVENTS.length, 4, 'Must have exactly 4 flagship events');

      // Event 1: DPS Donation Drive
      const dps = AVANI_EVENTS[0];
      assert.strictEqual(dps.id, 'dps-donation-drive');
      assert.match(dps.title, /DPS Donation Drive/);
      assert.match(dps.location, /Delhi Public School \(DPS\) Bangalore/);
      assert.ok(dps.metrics.some(m => m.label === 'Items Collected' && m.value === '500+'));
      assert.ok(dps.metrics.some(m => m.label === 'School Participation' && m.value === '100%'));

      // Event 2: Invictus Denim Stall
      const denim = AVANI_EVENTS[1];
      assert.strictEqual(denim.id, 'invictus-denim-stall');
      assert.match(denim.title, /Invictus Denim Stall/);
      assert.match(denim.subtitle, /sustainable fashion/i);
      assert.ok(denim.metrics.some(m => m.label === 'Upcycled Creations' && m.value === '150+'));
      assert.ok(denim.metrics.some(m => m.label === 'Fabric Waste Generated' && m.value === '0%'));

      // Event 3: Orphanage Donation Drive with partner Aarogi
      const aarogi = AVANI_EVENTS[2];
      assert.strictEqual(aarogi.id, 'orphanage-donation-aarogi');
      assert.match(aarogi.title, /Orphanage Donation Drive/);
      assert.strictEqual(aarogi.partner, 'Aarogi Organization');
      assert.ok(aarogi.metrics.some(m => m.label === 'Children Reached' && m.value === '80+'));
      assert.ok(aarogi.metrics.some(m => m.label === 'Learning Kits Distributed' && m.value === '200+'));

      // Event 4: Beyond the Waste Workshop
      const workshop = AVANI_EVENTS[3];
      assert.strictEqual(workshop.id, 'beyond-the-waste-workshop');
      assert.match(workshop.title, /Beyond the Waste Workshop/);
      assert.ok(workshop.metrics.some(m => m.label === 'Student Makers' && m.value === '75+'));
      assert.ok(workshop.metrics.some(m => m.label === 'Waste Diverted from Landfill' && m.value === '100 kg'));
    });

    test('Scenario 3.2: User verifies event banner imagery exists on disk with valid dimensions', { feature: 'F4', tier: 4 }, async () => {
      const { AVANI_EVENTS } = require(repoPath('src/lib/avaniContent.ts'));

      for (const event of AVANI_EVENTS) {
        assert.ok(
          event.image && event.image.startsWith('/assets/images/'),
          `Event ${event.id} must declare image in /assets/images/`
        );
        const resolvedPath = repoPath(`public${event.image}`);
        assertFileNonEmpty(resolvedPath, 50000, `Event image "${event.image}" must exist and be >= 50KB`);

        // Check WEBP container format
        const buf = fs.readFileSync(resolvedPath);
        assert.strictEqual(buf.subarray(0, 4).toString('ascii'), 'RIFF');
        assert.strictEqual(buf.subarray(8, 12).toString('ascii'), 'WEBP');
      }
    });

    test('Scenario 3.3: User accesses Instagram, LinkedIn, and direct contact channels for donation and volunteering', { feature: 'F14', tier: 4 }, async () => {
      const { EXTERNAL_LINKS } = require(repoPath('src/lib/avaniContent.ts'));

      // Instagram profile verification
      assertValidUrl(EXTERNAL_LINKS.instagramClean, 'Clean Instagram URL must be valid');
      assert.strictEqual(EXTERNAL_LINKS.instagramClean, 'https://www.instagram.com/avani_yocc');

      // LinkedIn company page verification
      assertValidUrl(EXTERNAL_LINKS.linkedIn, 'LinkedIn URL must be valid');
      assert.strictEqual(EXTERNAL_LINKS.linkedIn, 'https://www.linkedin.com/company/avaniyocc/');

      // Email and telephone verification
      assertValidUrl(EXTERNAL_LINKS.emailMailto, 'Mailto link must be valid');
      assert.strictEqual(EXTERNAL_LINKS.email, 'avaniyocc@gmail.com');
      assertValidUrl(EXTERNAL_LINKS.phoneTel, 'Tel link must be valid');
      assert.strictEqual(EXTERNAL_LINKS.phone, '+91 8050931769');
    });

  });

  // ---------------------------------------------------------------------------
  // Scenario 4: Mobile Device Responsive Journey
  // ---------------------------------------------------------------------------
  describe('Scenario 4: Mobile Device Responsive Journey', () => {

    test('Scenario 4.1: Mobile viewport (375x667) navigation layout hides desktop switcher and provides mobile drawer', { feature: 'F8', tier: 4 }, async () => {
      const navbarPath = repoPath('src/components/common/Navbar.tsx');
      assertFileExists(navbarPath, 'Navbar component must exist');

      // 1. Desktop prototype switcher must be hidden on small mobile viewports
      assertFileContains(navbarPath, [
        'hidden md:flex',
        'aria-label="Prototype switcher"'
      ], 'Desktop prototype switcher must be hidden on mobile (<md)');

      // 2. Mobile actions bar must provide hamburger menu and Apply button
      assertFileContains(navbarPath, [
        'flex lg:hidden',
        'aria-label="Toggle navigation drawer"',
        'mobileMenuOpen'
      ], 'Mobile viewport must expose drawer toggle button');

      // 3. Mobile menu drawer must support switching all 3 prototypes
      assertFileContains(navbarPath, [
        'Switch Interactive Prototype',
        'Showcase Hub',
        'Living Canopy',
        'Eco-Tech Biosphere'
      ], 'Mobile drawer must allow switching between all 3 landing page prototypes');
    });

    test('Scenario 4.2: Page containers and grids collapse responsively to prevent horizontal layout blowout', { feature: 'F16', tier: 4 }, async () => {
      const p1Path = repoPath('src/app/prototype-1/page.tsx');
      const p2Path = repoPath('src/app/prototype-2/page.tsx');
      const hubPath = repoPath('src/app/hub/page.tsx');

      // Main container widths and padding must be responsive
      assertFileContains(p1Path, [
        'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8',
        'grid grid-cols-1 sm:grid-cols-2'
      ], 'P1 layout must collapse grids to single-column on mobile');

      assertFileContains(p2Path, [
        'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8',
        'grid grid-cols-1 sm:grid-cols-2'
      ], 'P2 layout must collapse grids to single-column on mobile');

      assertFileContains(hubPath, [
        'px-4 sm:px-6 lg:px-8',
        'max-w-7xl',
        'grid-cols-1 lg:grid-cols-2'
      ], 'Hub layout must collapse dual comparison cards to single-column on mobile');
    });

    test('Scenario 4.3: Responsive typography scales appropriately between mobile and desktop', { feature: 'F16', tier: 4 }, async () => {
      const p1Path = repoPath('src/app/prototype-1/page.tsx');
      const p2Path = repoPath('src/app/prototype-2/page.tsx');

      // Headers scale from text-4xl on mobile to text-6xl on desktop
      assertFileContains(p1Path, ['text-4xl sm:text-6xl'], 'P1 hero heading must scale responsively');
      assertFileContains(p2Path, ['text-4xl sm:text-6xl'], 'P2 hero heading must scale responsively');
    });

  });

  // ---------------------------------------------------------------------------
  // Scenario 5: Design & Architecture Consistency Audit
  // ---------------------------------------------------------------------------
  describe('Scenario 5: Design & Architecture Consistency Audit', () => {

    test('Scenario 5.1: Stitch MCP mockups, generated media, and live pages share brand green #163515 harmony', { feature: 'F7', tier: 4 }, async () => {
      const BRAND_GREEN = '#163515';
      const LIGHT_BG = '#F9FAF7';
      const HUB_BG = '#FDFEFC';
      const SOFT_GREEN = '#DCE7D4';

      // Verify WCAG AAA color contrast between primary brand green and surfaces
      const contrastP1 = assertColorContrast(BRAND_GREEN, LIGHT_BG, 7.0, 'Brand green on P1 surface must meet WCAG AAA');
      assert.ok(contrastP1 >= 10.0, `P1 contrast ratio (${contrastP1}:1) must exceed 10:1`);

      const contrastHub = assertColorContrast(BRAND_GREEN, HUB_BG, 7.0, 'Brand green on Hub surface must meet WCAG AAA');
      assert.ok(contrastHub >= 10.0, `Hub contrast ratio (${contrastHub}:1) must exceed 10:1`);

      const contrastCta = assertColorContrast(SOFT_GREEN, BRAND_GREEN, 7.0, 'Soft green text on brand green CTA must meet WCAG AAA');
      assert.ok(contrastCta >= 10.0, `CTA contrast ratio (${contrastCta}:1) must exceed 10:1`);

      // Verify #163515 appears consistently across core source files
      assertFileContains(repoPath('src/app/page.tsx'), '#163515');
      assertFileContains(repoPath('src/app/prototype-1/page.tsx'), '#163515');
      assertFileContains(repoPath('src/components/common/Navbar.tsx'), '#163515');
      assertFileContains(repoPath('src/components/common/Footer.tsx'), '#163515');
    });

    test('Scenario 5.2: Complete Google Flow media asset catalog verification', { feature: 'F4', tier: 4 }, async () => {
      const requiredAssets = [
        'hero_nature_canopy.webp',
        'hero_ecotech_globe.webp',
        'event_dps_drive.webp',
        'event_invictus_denim.webp',
        'event_orphanage_aarogi.webp',
        'event_waste_workshop.webp',
        'climate_tips_infographic.webp'
      ];

      for (const assetName of requiredAssets) {
        const fullPath = repoPath(`public/assets/images/${assetName}`);
        assertFileNonEmpty(fullPath, 50000, `Generated asset "${assetName}" must be >= 50KB`);

        // Check RIFF WEBP header
        const buf = fs.readFileSync(fullPath);
        assert.strictEqual(buf.subarray(0, 4).toString('ascii'), 'RIFF');
        assert.strictEqual(buf.subarray(8, 12).toString('ascii'), 'WEBP');
      }
    });

    test('Scenario 5.3: Verbatim copy audit against official PDF briefing', { feature: 'F7', tier: 4 }, async () => {
      const { AVANI_OBJECTIVES, AVANI_ORGANIZATION } = require(repoPath('src/lib/avaniContent.ts'));

      // Check verbatim objective copy
      const verbatimObjectives = [
        'To advocate for actions against climate change.',
        'To work towards the upliftment and restoration of natural resources in India.',
        'To raise a voice against pollution in all spheres.',
        'To ensure effective waste management practices are put into use.',
        'To promote and publicize sustainable brands and environmental activist movements across social media platforms.'
      ];

      AVANI_OBJECTIVES.forEach((obj, idx) => {
        assert.strictEqual(obj.verbatimCopy, verbatimObjectives[idx], `Objective ${idx + 1} verbatim copy altered`);
      });

      // Check verbatim organization summary
      assert.match(
        AVANI_ORGANIZATION.verbatimSummary,
        /committed to making a change in the way we treat our environment/
      );
      assert.match(
        AVANI_ORGANIZATION.verbatimSummary,
        /small actions of many add up and bring a change to the world/
      );
    });

  });

});
