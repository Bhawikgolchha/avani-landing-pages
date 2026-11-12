/**
 * Avani Interactive Landing Pages — Zero-Dependency E2E Test Harness
 * 
 * Standalone test harness providing BDD/TDD lifecycle primitives (describe, test, it, before, after,
 * beforeEach, afterEach) and domain-specific assertion helpers for opaque-box, requirement-driven testing.
 * 
 * Uses standard Node.js runtime APIs exclusively (node:assert, node:fs, node:path, node:child_process, node:url).
 */

const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const child_process = require('node:child_process');
const { URL } = require('node:url');

// -----------------------------------------------------------------------------
// Color & Terminal Utilities
// -----------------------------------------------------------------------------

const hasColor = !process.env.NO_COLOR && (process.stdout.isTTY || process.env.FORCE_COLOR);

const colors = {
  reset: hasColor ? '\x1b[0m' : '',
  bold: hasColor ? '\x1b[1m' : '',
  dim: hasColor ? '\x1b[2m' : '',
  red: hasColor ? '\x1b[31m' : '',
  green: hasColor ? '\x1b[32m' : '',
  yellow: hasColor ? '\x1b[33m' : '',
  blue: hasColor ? '\x1b[34m' : '',
  magenta: hasColor ? '\x1b[35m' : '',
  cyan: hasColor ? '\x1b[36m' : '',
  white: hasColor ? '\x1b[37m' : '',
  gray: hasColor ? '\x1b[90m' : '',
};

// -----------------------------------------------------------------------------
// Feature Definitions (F1 through F16 from TEST_INFRA.md)
// -----------------------------------------------------------------------------

const FEATURES = {
  F1: 'Stitch MCP P1 Mockup',
  F2: 'Stitch MCP P2 Mockup',
  F3: 'Stitch Mockup Local Export',
  F4: 'Google Flow Media Generation',
  F5: 'Brand Logo Integration',
  F6: 'Next.js 14 Scaffolding',
  F7: 'Shared Brand Content Module',
  F8: 'Universal Navbar & Footer',
  F9: 'Comparison Hub (/hub)',
  F10: 'Prototype 1 3D Canvas',
  F11: 'Prototype 1 Scroll Overlay',
  F12: 'Prototype 2 3D Canvas',
  F13: 'Prototype 2 Scroll Overlay',
  F14: 'Content & Link Verification',
  F15: 'Automated Build & Lint Gate',
  F16: 'Browser Visual Inspection',
  F17: 'Editorial Replica (/)'
};

// -----------------------------------------------------------------------------
// Metadata Extraction & Normalization
// -----------------------------------------------------------------------------

function normalizeFeature(feat) {
  if (!feat) return 'General';
  const m = String(feat).match(/\bF(1[0-7]|0?[1-9])\b/i);
  if (m) {
    const num = parseInt(m[1], 10);
    return `F${num}`;
  }
  return String(feat);
}

function inferTier(testOrSuite, filePath) {
  if (testOrSuite && testOrSuite.options && testOrSuite.options.tier !== undefined) {
    return Number(testOrSuite.options.tier);
  }
  const title = (testOrSuite && testOrSuite.title) || '';
  const tierMatch = title.match(/tier[\s_-]?([1-4])/i);
  if (tierMatch) return Number(tierMatch[1]);

  if (filePath) {
    const fileTierMatch = filePath.match(/tier([1-4])/i) || filePath.match(/t([1-4])_/i);
    if (fileTierMatch) return Number(fileTierMatch[1]);
  }
  return 1;
}

function inferFeature(testOrSuite, filePath, parentSuite) {
  if (testOrSuite && testOrSuite.options && testOrSuite.options.feature) {
    return normalizeFeature(testOrSuite.options.feature);
  }
  const title = (testOrSuite && testOrSuite.title) || '';
  const featMatch = title.match(/\bF(1[0-6]|0?[1-9])\b/i);
  if (featMatch) return normalizeFeature(featMatch[0]);

  if (parentSuite) {
    if (parentSuite.options && parentSuite.options.feature) {
      return normalizeFeature(parentSuite.options.feature);
    }
    const pMatch = (parentSuite.title || '').match(/\bF(1[0-6]|0?[1-9])\b/i);
    if (pMatch) return normalizeFeature(pMatch[0]);
  }

  if (filePath) {
    const fileFeatMatch = filePath.match(/f(1[0-6]|0?[1-9])\b/i);
    if (fileFeatMatch) return normalizeFeature(fileFeatMatch[0]);
  }

  return 'General';
}

function extractDiagnostic(err, testFile) {
  if (!err) return null;
  const message = err.message || String(err);
  const stack = err.stack || '';
  const lines = stack.split('\n');

  let location = null;
  for (const line of lines) {
    if (line.includes('harness.js') || line.includes('node:internal') || line.includes('(internal/')) {
      continue;
    }
    const match = line.match(/\((.*?):(\d+):(\d+)\)/) || line.match(/at (.*?):(\d+):(\d+)/);
    if (match) {
      const fullPath = match[1];
      const lineNo = match[2];
      const colNo = match[3];
      location = `${path.relative(process.cwd(), fullPath)}:${lineNo}:${colNo}`;
      break;
    }
  }

  return {
    message,
    expected: err.expected !== undefined ? err.expected : undefined,
    actual: err.actual !== undefined ? err.actual : undefined,
    operator: err.operator || undefined,
    location: location || (testFile ? path.relative(process.cwd(), testFile) : 'unknown'),
    stack
  };
}

// -----------------------------------------------------------------------------
// Custom Domain Assertions
// -----------------------------------------------------------------------------

/**
 * Asserts that a file exists at the given path (resolved relative to process.cwd() if relative).
 */
function assertFileExists(filePath, msg) {
  if (typeof filePath !== 'string' || !filePath.trim()) {
    throw new assert.AssertionError({
      message: msg || `assertFileExists: Expected non-empty string filePath, got ${typeof filePath}`,
      expected: 'non-empty string path',
      actual: filePath,
      operator: 'assertFileExists'
    });
  }
  const resolved = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(resolved)) {
    throw new assert.AssertionError({
      message: msg || `File does not exist: "${filePath}" (resolved: "${resolved}")`,
      expected: `file to exist at "${filePath}"`,
      actual: 'file not found',
      operator: 'assertFileExists'
    });
  }
  return true;
}

/**
 * Asserts that a file exists and has size >= minBytes.
 */
function assertFileNonEmpty(filePath, minBytes = 1, msg) {
  assertFileExists(filePath, msg);
  const resolved = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  const stats = fs.statSync(resolved);
  if (stats.size < minBytes) {
    throw new assert.AssertionError({
      message: msg || `File "${filePath}" size (${stats.size} bytes) is below minimum required (${minBytes} bytes)`,
      expected: `>= ${minBytes} bytes`,
      actual: `${stats.size} bytes`,
      operator: 'assertFileNonEmpty'
    });
  }
  return true;
}

/**
 * Asserts that a file contains a given string, RegExp, or array of strings/RegExps.
 */
function assertFileContains(filePath, patternOrString, msg) {
  assertFileExists(filePath, msg);
  const resolved = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  const content = fs.readFileSync(resolved, 'utf8');

  if (Array.isArray(patternOrString)) {
    for (const item of patternOrString) {
      const itemMatched = item instanceof RegExp ? item.test(content) : content.includes(String(item));
      if (!itemMatched) {
        const snippet = content.length > 200 ? `${content.slice(0, 200).replace(/\s+/g, ' ')}...` : content;
        throw new assert.AssertionError({
          message: msg || `File "${filePath}" does not contain expected item: ${item instanceof RegExp ? item.toString() : `"${item}"`}`,
          expected: item instanceof RegExp ? item.toString() : String(item),
          actual: `[File size: ${content.length} chars, snippet: "${snippet}"]`,
          operator: 'assertFileContains'
        });
      }
    }
    return true;
  }

  let matched = false;
  if (patternOrString instanceof RegExp) {
    matched = patternOrString.test(content);
  } else {
    matched = content.includes(String(patternOrString));
  }

  if (!matched) {
    const expectedDesc = patternOrString instanceof RegExp ? patternOrString.toString() : `"${patternOrString}"`;
    const snippet = content.length > 200 ? `${content.slice(0, 200).replace(/\s+/g, ' ')}...` : content;
    throw new assert.AssertionError({
      message: msg || `File "${filePath}" does not contain expected pattern: ${expectedDesc}`,
      expected: expectedDesc,
      actual: `[File size: ${content.length} chars, snippet: "${snippet}"]`,
      operator: 'assertFileContains'
    });
  }
  return true;
}

/**
 * Asserts that a file contains valid JSON and matches a validator function or partial schema object.
 */
function assertJsonMatches(filePath, validatorFnOrSchema, msg) {
  assertFileExists(filePath, msg);
  const resolved = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  let parsed;
  try {
    const raw = fs.readFileSync(resolved, 'utf8');
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new assert.AssertionError({
      message: msg || `Failed to parse JSON in "${filePath}": ${err.message}`,
      expected: 'valid JSON syntax',
      actual: err.message,
      operator: 'assertJsonMatches'
    });
  }

  if (typeof validatorFnOrSchema === 'function') {
    let result;
    try {
      result = validatorFnOrSchema(parsed);
    } catch (fnErr) {
      throw new assert.AssertionError({
        message: msg || `JSON validator function threw error for "${filePath}": ${fnErr.message}`,
        expected: 'validator function returns true',
        actual: `threw: ${fnErr.message}`,
        operator: 'assertJsonMatches'
      });
    }
    if (result === false) {
      throw new assert.AssertionError({
        message: msg || `JSON validation returned false for "${filePath}"`,
        expected: true,
        actual: false,
        operator: 'assertJsonMatches'
      });
    }
  } else if (typeof validatorFnOrSchema === 'object' && validatorFnOrSchema !== null) {
    const checkSubset = (target, expectedSubset, currentPath = '') => {
      for (const key of Object.keys(expectedSubset)) {
        const propPath = currentPath ? `${currentPath}.${key}` : key;
        const expectedVal = expectedSubset[key];
        const actualVal = target ? target[key] : undefined;
        if (typeof expectedVal === 'function') {
          if (!expectedVal(actualVal)) {
            throw new Error(`Field "${propPath}" failed validator function`);
          }
        } else if (typeof expectedVal === 'object' && expectedVal !== null && !Array.isArray(expectedVal)) {
          if (typeof actualVal !== 'object' || actualVal === null) {
            throw new Error(`Expected object at "${propPath}", got ${typeof actualVal}`);
          }
          checkSubset(actualVal, expectedVal, propPath);
        } else {
          try {
            assert.deepStrictEqual(actualVal, expectedVal);
          } catch (e) {
            throw new Error(`Field "${propPath}" mismatch: expected ${JSON.stringify(expectedVal)}, got ${JSON.stringify(actualVal)}`);
          }
        }
      }
    };

    try {
      checkSubset(parsed, validatorFnOrSchema);
    } catch (subsetErr) {
      throw new assert.AssertionError({
        message: msg || `JSON in "${filePath}" does not match expected schema: ${subsetErr.message}`,
        expected: validatorFnOrSchema,
        actual: parsed,
        operator: 'assertJsonMatches'
      });
    }
  }

  return parsed;
}

/**
 * Asserts that a command executes and exits with the expected exit code.
 */
function assertExitCode(command, expectedCode = 0, options = {}) {
  const { cwd = process.cwd(), env = process.env, timeout = 30000 } = options;
  let res;
  try {
    res = child_process.spawnSync(command, {
      shell: true,
      cwd,
      env,
      timeout,
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024
    });
  } catch (err) {
    throw new assert.AssertionError({
      message: `Failed to spawn process for command "${command}": ${err.message}`,
      expected: `exit code ${expectedCode}`,
      actual: err.message,
      operator: 'assertExitCode'
    });
  }

  if (res.error) {
    if (res.error.code === 'ETIMEDOUT') {
      throw new assert.AssertionError({
        message: `Command timed out after ${timeout}ms: "${command}"`,
        expected: `completion within ${timeout}ms`,
        actual: 'timed out',
        operator: 'assertExitCode'
      });
    }
    throw new assert.AssertionError({
      message: `Command execution error for "${command}": ${res.error.message}`,
      expected: `exit code ${expectedCode}`,
      actual: res.error.message,
      operator: 'assertExitCode'
    });
  }

  const exitCode = res.status !== null ? res.status : (res.signal ? -1 : 0);
  if (exitCode !== expectedCode) {
    const stdoutSnippet = (res.stdout || '').trim().slice(0, 300);
    const stderrSnippet = (res.stderr || '').trim().slice(0, 300);
    const detail = stderrSnippet || stdoutSnippet || 'no output';
    throw new assert.AssertionError({
      message: `Command "${command}" exited with code ${exitCode}, expected ${expectedCode}.\nOutput: ${detail}`,
      expected: expectedCode,
      actual: exitCode,
      operator: 'assertExitCode'
    });
  }

  return {
    exitCode,
    stdout: res.stdout || '',
    stderr: res.stderr || '',
    status: exitCode
  };
}

/**
 * Asserts that a URL string is valid and uses http:, https:, mailto:, or tel: protocol.
 */
function assertValidUrl(urlString, msg) {
  if (typeof urlString !== 'string' || !urlString.trim()) {
    throw new assert.AssertionError({
      message: msg || `assertValidUrl: Expected non-empty string, got ${typeof urlString}`,
      expected: 'non-empty URL string',
      actual: urlString,
      operator: 'assertValidUrl'
    });
  }
  let parsed;
  try {
    parsed = new URL(urlString);
  } catch (err) {
    throw new assert.AssertionError({
      message: msg || `Invalid URL format: "${urlString}" (${err.message})`,
      expected: 'valid URL string',
      actual: urlString,
      operator: 'assertValidUrl'
    });
  }

  const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
  if (!allowedProtocols.includes(parsed.protocol)) {
    throw new assert.AssertionError({
      message: msg || `Invalid URL protocol "${parsed.protocol}" in "${urlString}" (allowed: ${allowedProtocols.join(', ')})`,
      expected: 'one of http:, https:, mailto:, tel:',
      actual: parsed.protocol,
      operator: 'assertValidUrl'
    });
  }
  return true;
}

/**
 * Parses hex or rgb/rgba color string into [r, g, b] numbers (0-255).
 */
function parseColor(colorStr) {
  if (typeof colorStr !== 'string') {
    throw new Error(`Color must be a string, got ${typeof colorStr}`);
  }
  const trimmed = colorStr.trim();
  const hexMatch = trimmed.match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3 || hex.length === 4) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return [r, g, b];
  }

  const rgbMatch = trimmed.match(/^rgba?\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)/i);
  if (rgbMatch) {
    return [
      Math.min(255, Math.max(0, parseInt(rgbMatch[1], 10))),
      Math.min(255, Math.max(0, parseInt(rgbMatch[2], 10))),
      Math.min(255, Math.max(0, parseInt(rgbMatch[3], 10)))
    ];
  }

  throw new Error(`Unrecognized color format: "${colorStr}"`);
}

function sRGBtoLinear(channel) {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function calculateRelativeLuminance(rgb) {
  const r = sRGBtoLinear(rgb[0]);
  const g = sRGBtoLinear(rgb[1]);
  const b = sRGBtoLinear(rgb[2]);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function calculateContrastRatio(color1, color2) {
  const rgb1 = parseColor(color1);
  const rgb2 = parseColor(color2);
  const l1 = calculateRelativeLuminance(rgb1);
  const l2 = calculateRelativeLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Asserts that the WCAG 2.1 color contrast ratio between foreground and background
 * meets or exceeds minRatio (defaults to 4.5:1 for WCAG AA normal text).
 */
function assertColorContrast(foregroundHex, backgroundHex, minRatio = 4.5, msg) {
  let ratio;
  try {
    ratio = calculateContrastRatio(foregroundHex, backgroundHex);
  } catch (err) {
    throw new assert.AssertionError({
      message: msg || `Failed to calculate contrast between "${foregroundHex}" and "${backgroundHex}": ${err.message}`,
      expected: 'valid color strings',
      actual: err.message,
      operator: 'assertColorContrast'
    });
  }

  const roundedRatio = Math.round(ratio * 100) / 100;
  if (roundedRatio < minRatio) {
    throw new assert.AssertionError({
      message: msg || `Color contrast ratio ${roundedRatio.toFixed(2)}:1 between foreground "${foregroundHex}" and background "${backgroundHex}" is below required threshold ${minRatio}:1.`,
      expected: `>= ${minRatio}:1`,
      actual: `${roundedRatio.toFixed(2)}:1`,
      operator: 'assertColorContrast'
    });
  }
  return roundedRatio;
}

// -----------------------------------------------------------------------------
// Test Registry & Suite Management
// -----------------------------------------------------------------------------

class Suite {
  constructor(title, options = {}, parent = null) {
    this.title = title;
    this.options = options;
    this.parent = parent;
    this.file = options.file || (parent ? parent.file : null);
    this.tier = options.tier !== undefined ? Number(options.tier) : (parent ? parent.tier : null);
    this.feature = options.feature || (parent ? parent.feature : null);

    this.tests = [];
    this.subSuites = [];
    this.beforeHooks = [];
    this.afterHooks = [];
    this.beforeEachHooks = [];
    this.afterEachHooks = [];
  }

  getAllBeforeEachHooks() {
    const hooks = this.parent ? this.parent.getAllBeforeEachHooks() : [];
    return hooks.concat(this.beforeEachHooks);
  }

  getAllAfterEachHooks() {
    const hooks = [...this.afterEachHooks];
    if (this.parent) {
      hooks.push(...this.parent.getAllAfterEachHooks());
    }
    return hooks;
  }
}

class Test {
  constructor(title, optionsOrFn, fnOrNull, suite) {
    this.title = title;
    this.suite = suite;
    if (typeof optionsOrFn === 'function') {
      this.fn = optionsOrFn;
      this.options = {};
    } else {
      this.options = optionsOrFn || {};
      this.fn = fnOrNull;
    }

    this.file = this.options.file || (suite ? suite.file : null);
    this.tier = inferTier(this, this.file);
    this.feature = inferFeature(this, this.file, suite);
    this.skipped = !!this.options.skip || !this.fn;
    this.only = !!this.options.only;
    this.timeout = this.options.timeout || 10000;

    this.status = 'pending';
    this.durationMs = 0;
    this.error = null;
  }

  get fullTitle() {
    const parts = [];
    let cur = this.suite;
    while (cur && cur.title) {
      parts.unshift(cur.title);
      cur = cur.parent;
    }
    parts.push(this.title);
    return parts.join(' > ');
  }
}

// Global Harness State
const rootSuites = [];
const suiteStack = [];
let currentFileContext = null;
let isRunnerActive = false;
let autoRunScheduled = false;

function setRunnerActive(active) {
  isRunnerActive = active;
}

function getRunnerActive() {
  return isRunnerActive;
}

function setCurrentFileContext(ctx) {
  currentFileContext = ctx;
}

function getCurrentFileContext() {
  return currentFileContext;
}

function getCurrentSuite() {
  if (suiteStack.length > 0) {
    return suiteStack[suiteStack.length - 1];
  }
  // Create default file-level suite if none exists
  const title = currentFileContext && currentFileContext.filePath
    ? path.basename(currentFileContext.filePath)
    : 'Root Suite';
  const defaultSuite = new Suite(title, {
    file: currentFileContext ? currentFileContext.filePath : null,
    tier: currentFileContext ? currentFileContext.tier : null
  });
  rootSuites.push(defaultSuite);
  suiteStack.push(defaultSuite);
  return defaultSuite;
}

// -----------------------------------------------------------------------------
// BDD / TDD Lifecycle Functions
// -----------------------------------------------------------------------------

function describe(title, optionsOrFn, fnOrNull) {
  let options = {};
  let fn = fnOrNull;
  if (typeof optionsOrFn === 'function') {
    fn = optionsOrFn;
  } else if (typeof optionsOrFn === 'object') {
    options = optionsOrFn || {};
  }

  const parent = suiteStack.length > 0 ? suiteStack[suiteStack.length - 1] : null;
  const suiteOpts = {
    ...options,
    file: (currentFileContext && currentFileContext.filePath) || (parent ? parent.file : null),
    tier: options.tier !== undefined ? options.tier : (currentFileContext ? currentFileContext.tier : (parent ? parent.tier : null))
  };

  const suite = new Suite(title, suiteOpts, parent);
  if (parent) {
    parent.subSuites.push(suite);
  } else {
    rootSuites.push(suite);
  }

  suiteStack.push(suite);
  try {
    if (typeof fn === 'function') {
      fn();
    }
  } finally {
    suiteStack.pop();
  }
  return suite;
}

function test(title, optionsOrFn, fnOrNull) {
  const currentSuite = getCurrentSuite();
  const testInstance = new Test(title, optionsOrFn, fnOrNull, currentSuite);
  currentSuite.tests.push(testInstance);
  scheduleAutoRun();
  return testInstance;
}

const it = test;

test.skip = function (title, optionsOrFn, fnOrNull) {
  let options = typeof optionsOrFn === 'object' ? { ...optionsOrFn, skip: true } : { skip: true };
  const fn = typeof optionsOrFn === 'function' ? optionsOrFn : fnOrNull;
  return test(title, options, fn);
};
it.skip = test.skip;

test.only = function (title, optionsOrFn, fnOrNull) {
  let options = typeof optionsOrFn === 'object' ? { ...optionsOrFn, only: true } : { only: true };
  const fn = typeof optionsOrFn === 'function' ? optionsOrFn : fnOrNull;
  return test(title, options, fn);
};
it.only = test.only;

function before(fn) {
  const suite = getCurrentSuite();
  suite.beforeHooks.push(fn);
}

function after(fn) {
  const suite = getCurrentSuite();
  suite.afterHooks.push(fn);
}

function beforeEach(fn) {
  const suite = getCurrentSuite();
  suite.beforeEachHooks.push(fn);
}

function afterEach(fn) {
  const suite = getCurrentSuite();
  suite.afterEachHooks.push(fn);
}

// -----------------------------------------------------------------------------
// Test Execution Engine
// -----------------------------------------------------------------------------

async function executeFn(fn, timeoutMs = 10000) {
  if (typeof fn !== 'function') return;
  return new Promise((resolve, reject) => {
    let finished = false;
    const timer = setTimeout(() => {
      if (!finished) {
        finished = true;
        reject(new Error(`Test timed out after ${timeoutMs}ms`));
      }
    }, timeoutMs);
    if (timer.unref) timer.unref();

    const done = (err) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      if (err) reject(err);
      else resolve();
    };

    try {
      if (fn.length > 0) {
        fn(done);
      } else {
        const result = fn();
        if (result && typeof result.then === 'function') {
          result.then(
            () => done(),
            (err) => done(err)
          );
        } else {
          done();
        }
      }
    } catch (err) {
      done(err);
    }
  });
}

async function runSuite(suite, runnerOptions = {}, resultsCollector = []) {
  const { bail = false, onTestStart, onTestEnd, verbose = false } = runnerOptions;

  // Execute before hooks
  try {
    for (const hook of suite.beforeHooks) {
      await executeFn(hook, 15000);
    }
  } catch (hookErr) {
    // Before hook failed -> fail all tests in suite
    for (const testInst of suite.tests) {
      testInst.status = 'failed';
      testInst.error = extractDiagnostic(hookErr, testInst.file);
      resultsCollector.push(testInst);
      if (typeof onTestEnd === 'function') onTestEnd(testInst);
      if (bail) return resultsCollector;
    }
    return resultsCollector;
  }

  // Execute tests
  const beforeEachHooks = suite.getAllBeforeEachHooks();
  const afterEachHooks = suite.getAllAfterEachHooks();

  for (const testInst of suite.tests) {
    if (testInst.skipped) {
      testInst.status = 'skipped';
      resultsCollector.push(testInst);
      if (typeof onTestEnd === 'function') onTestEnd(testInst);
      continue;
    }

    if (typeof onTestStart === 'function') onTestStart(testInst);

    const startTime = Date.now();
    let testError = null;

    try {
      for (const bHook of beforeEachHooks) {
        await executeFn(bHook, 10000);
      }
      await executeFn(testInst.fn, testInst.timeout);
    } catch (err) {
      testError = err;
    } finally {
      for (const aHook of afterEachHooks) {
        try {
          await executeFn(aHook, 10000);
        } catch (aErr) {
          if (!testError) testError = aErr;
        }
      }
    }

    testInst.durationMs = Date.now() - startTime;
    if (testError) {
      testInst.status = 'failed';
      testInst.error = extractDiagnostic(testError, testInst.file);
    } else {
      testInst.status = 'passed';
      testInst.error = null;
    }

    resultsCollector.push(testInst);
    if (typeof onTestEnd === 'function') onTestEnd(testInst);

    if (testInst.status === 'failed' && bail) {
      break;
    }
  }

  // Execute after hooks
  try {
    for (const hook of suite.afterHooks) {
      await executeFn(hook, 15000);
    }
  } catch (afterHookErr) {
    // Record after hook error on last test if possible
    if (resultsCollector.length > 0) {
      const last = resultsCollector[resultsCollector.length - 1];
      if (last.status === 'passed') {
        last.status = 'failed';
        last.error = extractDiagnostic(afterHookErr, last.file);
      }
    }
  }

  // Execute sub-suites
  for (const sub of suite.subSuites) {
    if (bail && resultsCollector.some(t => t.status === 'failed')) {
      break;
    }
    await runSuite(sub, runnerOptions, resultsCollector);
  }

  return resultsCollector;
}

async function runRegisteredSuites(runnerOptions = {}) {
  const results = [];
  for (const suite of rootSuites) {
    if (runnerOptions.bail && results.some(t => t.status === 'failed')) {
      break;
    }
    await runSuite(suite, runnerOptions, results);
  }
  return results;
}

function clearRegisteredSuites() {
  rootSuites.length = 0;
  suiteStack.length = 0;
}

function getRegisteredSuites() {
  return [...rootSuites];
}

// -----------------------------------------------------------------------------
// Standalone Auto-Runner
// -----------------------------------------------------------------------------

function scheduleAutoRun() {
  if (isRunnerActive || autoRunScheduled) return;
  autoRunScheduled = true;

  setImmediate(async () => {
    if (isRunnerActive) return;
    if (rootSuites.length === 0) return;

    console.log(`\n${colors.cyan}${colors.bold}=== Running Standalone E2E Test Suite ===${colors.reset}`);
    const results = await runRegisteredSuites({
      verbose: true,
      onTestEnd: (t) => {
        const symbol = t.status === 'passed' ? `${colors.green}✓${colors.reset}` :
                       t.status === 'failed' ? `${colors.red}✗${colors.reset}` : `${colors.yellow}○${colors.reset}`;
        console.log(`  ${symbol} [Tier ${t.tier}] [${t.feature}] ${t.fullTitle} (${t.durationMs}ms)`);
        if (t.status === 'failed' && t.error) {
          console.log(`    ${colors.red}${t.error.message}${colors.reset}`);
          if (t.error.location) {
            console.log(`    ${colors.gray}at ${t.error.location}${colors.reset}`);
          }
        }
      }
    });

    const passed = results.filter(r => r.status === 'passed').length;
    const failed = results.filter(r => r.status === 'failed').length;
    const skipped = results.filter(r => r.status === 'skipped').length;
    console.log(`\n${colors.bold}Results:${colors.reset} ${colors.green}${passed} passed${colors.reset}, ${failed ? `${colors.red}${failed} failed${colors.reset}` : '0 failed'}, ${skipped} skipped (Total: ${results.length})`);

    if (failed > 0) {
      process.exitCode = 1;
    } else {
      process.exitCode = 0;
    }
  });
}

// -----------------------------------------------------------------------------
// Module Exports
// -----------------------------------------------------------------------------

module.exports = {
  // Test Registration & Lifecycle
  describe,
  test,
  it,
  before,
  after,
  beforeEach,
  afterEach,

  // Assertion Helpers
  assertFileExists,
  assertFileNonEmpty,
  assertFileContains,
  assertJsonMatches,
  assertExitCode,
  assertValidUrl,
  assertColorContrast,

  // Re-exported node:assert Primitives
  assert,
  strictEqual: assert.strictEqual,
  notStrictEqual: assert.notStrictEqual,
  deepStrictEqual: assert.deepStrictEqual,
  notDeepStrictEqual: assert.notDeepStrictEqual,
  ok: assert.ok,
  match: assert.match,
  doesNotMatch: assert.doesNotMatch,
  throws: assert.throws,
  doesNotThrow: assert.doesNotThrow,
  rejects: assert.rejects,
  doesNotReject: assert.doesNotReject,

  // Metadata & Internal Engine API (Used by Runner)
  FEATURES,
  inferTier,
  inferFeature,
  normalizeFeature,
  extractDiagnostic,
  calculateContrastRatio,
  setRunnerActive,
  getRunnerActive,
  setCurrentFileContext,
  getCurrentFileContext,
  runRegisteredSuites,
  clearRegisteredSuites,
  getRegisteredSuites,
  Suite,
  Test
};
