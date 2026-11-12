import assert from 'node:assert/strict';
import test from 'node:test';
import { 
  EXTERNAL_LINKS, 
  avaniContact 
} from '../../src/lib/avaniContent.ts';

const EXPECTED_GROUND_TRUTH = {
  applicationForm: "https://docs.google.com/forms/d/e/1FAIpQLSd_7uxm79Ci-gyoTaE80A_NKt2KMZ1ueS48v6hMgKBVrmZzQA/viewform?usp=dialog",
  linkedIn: "https://www.linkedin.com/company/avaniyocc/",
  substack: "https://open.substack.com/pub/avaniyocc?r=5wu68m&utm_medium=ios",
  instagram: "https://www.instagram.com/avani_yocc?cplk=MXQ2amNodzFmbHFpcA==",
  instagramClean: "https://www.instagram.com/avani_yocc",
  email: "avaniyocc@gmail.com",
  phone: "+91 8050931769",
  articles: [
    "https://substack.com/@avaniyocc/note/p-216575497?r=5wrcnw",
    "https://substack.com/@avaniyocc/note/p-223896247?r=5wrcnw",
    "https://substack.com/@avaniyocc/note/p-217629092?r=5wrcnw"
  ]
};

test('Oracle 1: Application Form Google Form URL exactness & RFC structure', () => {
  const urlStr = EXTERNAL_LINKS.applicationForm;
  assert.strictEqual(urlStr, EXPECTED_GROUND_TRUTH.applicationForm, 'Google form URL must match ORIGINAL_REQUEST.md ground truth');

  const parsed = new URL(urlStr);
  assert.strictEqual(parsed.protocol, 'https:', 'Must use secure HTTPS');
  assert.strictEqual(parsed.hostname, 'docs.google.com', 'Hostname must be docs.google.com');
  assert.ok(parsed.pathname.includes('/forms/d/e/'), 'Must be a Google Form submission path');
  assert.ok(parsed.pathname.endsWith('/viewform'), 'Path must end with /viewform');
  assert.strictEqual(parsed.searchParams.get('usp'), 'dialog', 'Parameter usp must be dialog');
});

test('Oracle 2: LinkedIn Company URL format & protocol', () => {
  const urlStr = EXTERNAL_LINKS.linkedIn;
  assert.strictEqual(urlStr, EXPECTED_GROUND_TRUTH.linkedIn, 'LinkedIn URL must match ground truth');

  const parsed = new URL(urlStr);
  assert.strictEqual(parsed.protocol, 'https:', 'Must use HTTPS');
  assert.ok(['www.linkedin.com', 'linkedin.com'].includes(parsed.hostname), 'Hostname must be linkedin.com');
  assert.strictEqual(parsed.pathname, '/company/avaniyocc/', 'Must target /company/avaniyocc/');
});

test('Oracle 3: Substack Publication URL format & tracking params', () => {
  const urlStr = EXTERNAL_LINKS.substack;
  assert.strictEqual(urlStr, EXPECTED_GROUND_TRUTH.substack, 'Substack URL must match ground truth');

  const parsed = new URL(urlStr);
  assert.strictEqual(parsed.protocol, 'https:', 'Must use HTTPS');
  assert.strictEqual(parsed.hostname, 'open.substack.com', 'Hostname must be open.substack.com');
  assert.strictEqual(parsed.pathname, '/pub/avaniyocc', 'Must target publication avaniyocc');
  assert.strictEqual(parsed.searchParams.get('r'), '5wu68m', 'Must preserve referral tracking param');
});

test('Oracle 4: Substack Articles (3 items) exactness, note IDs & metadata', () => {
  assert.strictEqual(EXTERNAL_LINKS.substackArticles.length, 3, 'Must contain exactly 3 Substack articles');

  EXTERNAL_LINKS.substackArticles.forEach((article, idx) => {
    assert.ok(article.id, `Article ${idx} must have an id`);
    assert.ok(article.title && article.title.length > 5, `Article ${idx} must have descriptive title`);
    assert.ok(article.subtitle && article.subtitle.length > 5, `Article ${idx} must have subtitle`);
    assert.strictEqual(article.url, EXPECTED_GROUND_TRUTH.articles[idx], `Article ${idx} URL must match ground truth`);

    const parsed = new URL(article.url);
    assert.strictEqual(parsed.protocol, 'https:', 'Must use HTTPS');
    assert.strictEqual(parsed.hostname, 'substack.com', 'Hostname must be substack.com');
    assert.ok(parsed.pathname.startsWith('/@avaniyocc/note/p-'), 'Must point to @avaniyocc note publication');
    assert.strictEqual(parsed.searchParams.get('r'), '5wrcnw', 'Must preserve note referral param');
  });
});

test('Oracle 5: Instagram URL format & query preservation', () => {
  const fullUrl = EXTERNAL_LINKS.instagram;
  assert.strictEqual(fullUrl, EXPECTED_GROUND_TRUTH.instagram, 'Instagram URL must match ground truth');

  const parsedFull = new URL(fullUrl);
  assert.strictEqual(parsedFull.protocol, 'https:', 'Must use HTTPS');
  assert.ok(['www.instagram.com', 'instagram.com'].includes(parsedFull.hostname), 'Hostname must be instagram.com');
  assert.strictEqual(parsedFull.pathname, '/avani_yocc', 'Must target account /avani_yocc');
  assert.ok(parsedFull.searchParams.has('cplk'), 'Must contain cplk parameter');

  const cleanUrl = EXTERNAL_LINKS.instagramClean;
  assert.strictEqual(cleanUrl, EXPECTED_GROUND_TRUTH.instagramClean, 'Clean Instagram URL must match expected format');
  const parsedClean = new URL(cleanUrl);
  assert.strictEqual(parsedClean.pathname, '/avani_yocc');
  assert.strictEqual(parsedClean.search, '', 'Clean URL must have no query parameters');
});

test('Oracle 6: Email RFC 5322 compliance & mailto URI scheme', () => {
  const email = EXTERNAL_LINKS.email;
  assert.strictEqual(email, EXPECTED_GROUND_TRUTH.email, 'Email must match ground truth');

  // RFC 5322 compliant regex for practical email addresses
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  assert.ok(emailRegex.test(email), `Email "${email}" must satisfy RFC email regex`);

  assert.strictEqual(EXTERNAL_LINKS.emailMailto, `mailto:${email}`, 'emailMailto must be valid mailto URI');
});

test('Oracle 7: Phone number E.164 compliance & tel URI scheme', () => {
  const phone = EXTERNAL_LINKS.phone;
  assert.strictEqual(phone, EXPECTED_GROUND_TRUTH.phone, 'Phone must match ground truth');

  // E.164 format with Indian country code (+91 followed by 10 digits)
  const phoneRegex = /^\+91\s?[6-9]\d{9}$/;
  assert.ok(phoneRegex.test(phone), `Phone "${phone}" must be valid E.164 Indian mobile format`);

  assert.strictEqual(EXTERNAL_LINKS.phoneTel, 'tel:+918050931769', 'phoneTel must be valid tel: URI without whitespace');
  assert.strictEqual(EXTERNAL_LINKS.phoneFormatted, '+91 80509 31769', 'phoneFormatted must provide readable spacing');
});

test('Oracle 8: avaniContact contract adherence to PROJECT.md § 1', () => {
  assert.strictEqual(avaniContact.email, EXPECTED_GROUND_TRUTH.email);
  assert.strictEqual(avaniContact.phone, EXPECTED_GROUND_TRUTH.phone);
  assert.strictEqual(avaniContact.applicationFormUrl, EXPECTED_GROUND_TRUTH.applicationForm);
  assert.strictEqual(avaniContact.linkedInUrl, EXPECTED_GROUND_TRUTH.linkedIn);
  assert.strictEqual(avaniContact.substackUrl, EXPECTED_GROUND_TRUTH.substack);
  assert.strictEqual(avaniContact.instagramUrl, EXPECTED_GROUND_TRUTH.instagramClean);
  assert.strictEqual(avaniContact.substackArticles.length, 3);

  avaniContact.substackArticles.forEach((art, i) => {
    assert.strictEqual(art.url, EXPECTED_GROUND_TRUTH.articles[i]);
    assert.ok(art.title);
  });
});

test('Oracle 9: Live external URL network probe (HEAD / GET)', async () => {
  const testEndpoints = [
    { name: 'Google Form', url: EXTERNAL_LINKS.applicationForm },
    { name: 'Substack Pub', url: EXTERNAL_LINKS.substack },
    { name: 'Substack Article 1', url: EXTERNAL_LINKS.substackArticles[0].url },
    { name: 'Substack Article 2', url: EXTERNAL_LINKS.substackArticles[1].url },
    { name: 'Substack Article 3', url: EXTERNAL_LINKS.substackArticles[2].url },
  ];

  for (const endpoint of testEndpoints) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(endpoint.url, { 
        method: 'HEAD', 
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        signal: controller.signal,
        redirect: 'follow'
      });
      clearTimeout(timeout);
      // HTTP 200, 301, 302, 403, 405 are all proof the remote host and route exist and responded
      assert.ok(res.status < 500, `${endpoint.name} returned server error: ${res.status}`);
    } catch (err) {
      // In air-gapped or restricted sandbox environments, DNS or network might time out
      if (err.name === 'AbortError' || err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
        // Warning noted, not hard fail if offline
        console.warn(`[Network Probe Notice] ${endpoint.name} skipped live probe due to network: ${err.message}`);
      } else {
        throw err;
      }
    }
  }
});
