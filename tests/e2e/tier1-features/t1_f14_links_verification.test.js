/**
 * Tier 1 Feature Coverage: F14 — Content & Link Verification
 * 
 * Verifies that all 7 external URLs from ORIGINAL_REQUEST.md (Application form,
 * LinkedIn, Substack, Instagram, 3 Substack note articles, plus email and phone)
 * are valid, correctly formatted, and match the official specification.
 */

const path = require('node:path');
const { pathToFileURL } = require('node:url');
const {
  describe,
  test,
  it,
  assertFileExists,
  assertValidUrl,
  assert
} = require('../harness');

const CONTENT_FILE = path.resolve(process.cwd(), 'src/lib/avaniContent.ts');

describe('F14: Content & Link Verification', { feature: 'F14', tier: 1 }, () => {
  let contentMod;

  test('F14.1: Application Form URL is valid and matches official Google Form link', async () => {
    if (!contentMod) contentMod = await import(pathToFileURL(CONTENT_FILE).href);
    const formUrl = contentMod.EXTERNAL_LINKS.applicationForm;

    assertValidUrl(formUrl, 'Application Form URL must be a valid URL');
    assert.strictEqual(
      formUrl,
      'https://docs.google.com/forms/d/e/1FAIpQLSd_7uxm79Ci-gyoTaE80A_NKt2KMZ1ueS48v6hMgKBVrmZzQA/viewform?usp=dialog',
      'Application Form URL must match exact link from ORIGINAL_REQUEST.md'
    );
  });

  test('F14.2: LinkedIn URL is valid and matches official Avani company profile', async () => {
    if (!contentMod) contentMod = await import(pathToFileURL(CONTENT_FILE).href);
    const linkedInUrl = contentMod.EXTERNAL_LINKS.linkedIn;

    assertValidUrl(linkedInUrl, 'LinkedIn URL must be a valid URL');
    assert.strictEqual(
      linkedInUrl,
      'https://www.linkedin.com/company/avaniyocc/',
      'LinkedIn URL must match exact link from ORIGINAL_REQUEST.md'
    );
  });

  test('F14.3: Substack publication and Instagram profile URLs are valid and match specification', async () => {
    if (!contentMod) contentMod = await import(pathToFileURL(CONTENT_FILE).href);
    const { substack, instagram } = contentMod.EXTERNAL_LINKS;

    assertValidUrl(substack, 'Substack URL must be a valid URL');
    assert.strictEqual(
      substack,
      'https://open.substack.com/pub/avaniyocc?r=5wu68m&utm_medium=ios',
      'Substack URL must match exact link from ORIGINAL_REQUEST.md'
    );

    assertValidUrl(instagram, 'Instagram URL must be a valid URL');
    assert.strictEqual(
      instagram,
      'https://www.instagram.com/avani_yocc?cplk=MXQ2amNodzFmbHFpcA==',
      'Instagram URL must match exact link from ORIGINAL_REQUEST.md'
    );
  });

  test('F14.4: All 3 Substack research note articles are valid and match exact URLs', async () => {
    if (!contentMod) contentMod = await import(pathToFileURL(CONTENT_FILE).href);
    const articles = contentMod.EXTERNAL_LINKS.substackArticles;

    assert.strictEqual(articles.length, 3, 'Must have exactly 3 Substack note articles');

    const expectedUrls = [
      'https://substack.com/@avaniyocc/note/p-216575497?r=5wrcnw',
      'https://substack.com/@avaniyocc/note/p-223896247?r=5wrcnw',
      'https://substack.com/@avaniyocc/note/p-217629092?r=5wrcnw'
    ];

    articles.forEach((art, idx) => {
      assertValidUrl(art.url, `Article ${idx + 1} URL must be valid`);
      assert.strictEqual(
        art.url,
        expectedUrls[idx],
        `Article ${idx + 1} URL must match exact link from ORIGINAL_REQUEST.md`
      );
      assert.ok(art.title && art.title.length > 5, `Article ${idx + 1} must have descriptive title`);
    });
  });

  test('F14.5: Contact email address is formatted with mailto: protocol and matches specification', async () => {
    if (!contentMod) contentMod = await import(pathToFileURL(CONTENT_FILE).href);
    const { email, emailMailto } = contentMod.EXTERNAL_LINKS;

    assert.strictEqual(email, 'avaniyocc@gmail.com', 'Email must match avaniyocc@gmail.com');
    assertValidUrl(emailMailto, 'emailMailto must be a valid mailto: URL');
    assert.strictEqual(emailMailto, 'mailto:avaniyocc@gmail.com');
  });

  test('F14.6: Contact phone number is formatted with tel: protocol and matches specification', async () => {
    if (!contentMod) contentMod = await import(pathToFileURL(CONTENT_FILE).href);
    const { phone, phoneTel } = contentMod.EXTERNAL_LINKS;

    assert.strictEqual(phone, '+91 8050931769', 'Phone must match +91 8050931769');
    assertValidUrl(phoneTel, 'phoneTel must be a valid tel: URL');
    assert.strictEqual(phoneTel, 'tel:+918050931769');
  });
});
