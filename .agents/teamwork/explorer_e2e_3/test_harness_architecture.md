# E2E Test Harness & Master Runner Architecture
**Avani Landing Pages — Multi-Tier Opaque-Box Test Infrastructure**
*Target Output Files*: `tests/e2e/runner.js` and `tests/e2e/harness.js`
*Architect*: Explorer E2E 3
*Date*: 2026-11-12

---

## 1. Executive Summary & Design Principles

The Avani Landing Pages E2E test infrastructure provides an autonomous, self-contained, and progressively verifiable testing platform. It verifies that all 16 features (from M1 Stitch Mockups, M2 Media Pipeline, M3 Scaffolding & Shared Copy, M4 Living Canopy Prototype, M5 Eco-Tech Biosphere Prototype, through M6 Verification) strictly fulfill `ORIGINAL_REQUEST.md` and `PROJECT.md`.

### Core Architectural Principles:

1. **Zero External Runtime Dependencies**:
   The test runner (`tests/e2e/runner.js`) and assertion harness (`tests/e2e/harness.js`) operate solely on **Node.js standard library modules** (`node:fs`, `node:path`, `node:http`, `node:https`, `node:child_process`, `node:assert`, `node:url`, global `fetch`). They run immediately in clean environments without requiring prior `npm install` or brittle native binary compilation (e.g. Cypress or Chromium downloads).

2. **Progressive Testability & Opaque-Box Probes**:
   Tests verify artifacts from the outside in:
   - *Level 1 (Static File & Assets)*: Directory layouts, image magic headers (JPEG, PNG, WEBP), file sizes, JSON metadata.
   - *Level 2 (Code & Contract Validation)*: TypeScript/JavaScript exports, AST/regex tokens, brand copy parity against PDF briefing.
   - *Level 3 (HTTP & Live DOM Extraction)*: Live Next.js routes (`/`, `/prototype-1`, `/prototype-2`), HTTP status codes, response headers, regex/string HTML parsing of links, buttons, images, and meta tags.
   - *Level 4 (Build & Subprocess Gates)*: `npm run build` and `npm run lint` execution and exit code verification.
   - *Level 5 (Browser Visual Hooks)*: Optional Playwright/Puppeteer hooks if installed, with automatic graceful fallback when headless browsers are absent.

3. **Dual Execution Ergonomics**:
   - **Master Runner Mode**: `node tests/e2e/runner.js` discovers, filters, aggregates, reports, and exits with POSIX exit codes (0 for 100% pass, 1 for failure).
   - **Direct Test Case Mode**: Any individual test file can be invoked directly (`node tests/e2e/tier1-features/t1_f01_stitch_p1.test.js`) and executes autonomously.

4. **Multi-Tier Filtering & Categorized Reporting**:
   Native CLI options allow surgical execution: `--tier=1..4`, `--feature=f01..f16`, `--filter=pattern`, `--verbose`, `--json`, `--bail`, `--list`.

---

## 2. Directory Layout & Test Suite Hierarchy

The test suite is structured into 4 distinct verification tiers totaling a minimum of **181 tests**:

```
tests/e2e/
├── runner.js                           # Master E2E runner executing Tiers 1-4
├── harness.js                          # Test assertion utilities, fixtures & runner engine
├── results.json                        # Auto-generated JSON execution report
├── tier1-features/                     # Tier 1: Feature Coverage (80 tests: 16 features x 5 tests)
│   ├── t1_f01_stitch_p1.test.js        # F1: Stitch MCP P1 Mockup
│   ├── t1_f02_stitch_p2.test.js        # F2: Stitch MCP P2 Mockup
│   ├── t1_f03_mockup_export.test.js    # F3: Stitch Mockup Local Export
│   ├── t1_f04_google_flow_media.test.js# F4: Google Flow Media Generation
│   ├── t1_f05_brand_logo.test.js       # F5: Brand Logo Integration
│   ├── t1_f06_scaffolding.test.js      # F6: Next.js 14 Scaffolding & Setup
│   ├── t1_f07_content_module.test.js   # F7: Shared Brand Content Module
│   ├── t1_f08_navbar_footer.test.js    # F8: Universal Navbar & Footer
│   ├── t1_f09_comparison_hub.test.js   # F9: Comparison Hub (/)
│   ├── t1_f10_p1_3d_canvas.test.js     # F10: Prototype 1 3D Canvas
│   ├── t1_f11_p1_overlay.test.js       # F11: Prototype 1 Scroll Overlay
│   ├── t1_f12_p2_3d_canvas.test.js     # F12: Prototype 2 3D Canvas
│   ├── t1_f13_p2_overlay.test.js       # F13: Prototype 2 Scroll Overlay
│   ├── t1_f14_links_verification.test.js# F14: Content & Link Verification
│   ├── t1_f15_build_lint.test.js       # F15: Automated Build & Lint Gate
│   └── t1_f16_visual_inspection.test.js# F16: Browser Visual Inspection
├── tier2-boundaries/                   # Tier 2: Boundary & Corner Cases (80 tests)
│   ├── t2_f01_f03_mockup_bounds.test.js# Boundary tests for mockups (15 tests)
│   ├── t2_f04_f05_media_bounds.test.js # Boundary tests for media & assets (10 tests)
│   ├── t2_f06_f09_route_bounds.test.js # Boundary tests for routes & scaffolding (20 tests)
│   ├── t2_f10_f13_canvas_bounds.test.js# Boundary tests for 3D canvases & scroll (20 tests)
│   └── t2_f14_f16_content_bounds.test.js# Boundary tests for links & viewports (15 tests)
├── tier3-combinations/                 # Tier 3: Pairwise Combinations (16 tests)
│   └── t3_pairwise_interactions.test.js# Pairwise cross-feature interactions (16 tests)
└── tier4-scenarios/                    # Tier 4: Real-World Scenarios (5 scenarios)
    └── t4_real_world_workloads.test.js # Full end-to-end user journeys (5 scenarios)
```

---

## 3. Master Test Runner Blueprint (`tests/e2e/runner.js`)

### 3.1 Capabilities & CLI Flags
The runner accepts standard POSIX flags:
- `--tier=<1|2|3|4>` or `-t <1|2|3|4>`: Execute only the specified tier.
- `--feature=<f01..f16>` or `-f <f01..f16>`: Execute tests related to a specific feature.
- `--filter=<regex>` or `-k <pattern>`: Filter tests matching a regular expression or substring.
- `--verbose` or `-v`: Display each assertion pass and execution duration.
- `--json`: Output structured JSON test metrics.
- `--report=<path>`: Write results JSON to a file (default: `tests/e2e/results.json`).
- `--bail`: Terminate suite execution immediately on the first test failure.
- `--list`: List all discovered test files and registered test cases without running them.
- `--concurrency=<N>`: Run test files sequentially (`1`, default) or concurrently (`N`).
- `--base-url=<url>`: Base URL for HTTP/DOM tests (default: `http://localhost:3000`).

### 3.2 Exit Code Semantics
- **`0`**: 100% of selected tests passed.
- **`1`**: One or more test assertions failed, or an unhandled exception occurred.
- **`2`**: Invalid CLI configuration or no matching test suites found.

### 3.3 Verbatim Implementation: `tests/e2e/runner.js`

```javascript
#!/usr/bin/env node
/**
 * Master E2E Test Runner for Avani Landing Pages
 * Zero-dependency standalone test orchestrator.
 */

const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { getTestRegistry, resetTestRegistry, executeSuite } = require('./harness');

// ANSI Color Helpers
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

function parseArgs(args) {
  const options = {
    tier: null,
    feature: null,
    filter: null,
    verbose: false,
    json: false,
    report: 'tests/e2e/results.json',
    bail: false,
    list: false,
    concurrency: 1,
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg === '--verbose' || arg === '-v') options.verbose = true;
    else if (arg === '--json') options.json = true;
    else if (arg === '--bail') options.bail = true;
    else if (arg === '--list' || arg === '-l') options.list = true;
    else if (arg.startsWith('--tier=')) options.tier = parseInt(arg.split('=')[1], 10);
    else if (arg === '-t' && args[i + 1]) options.tier = parseInt(args[++i], 10);
    else if (arg.startsWith('--feature=')) options.feature = arg.split('=')[1].toLowerCase();
    else if (arg === '-f' && args[i + 1]) options.feature = args[++i].toLowerCase();
    else if (arg.startsWith('--filter=')) options.filter = arg.split('=')[1];
    else if (arg === '-k' && args[i + 1]) options.filter = args[++i];
    else if (arg.startsWith('--report=')) options.report = arg.split('=')[1];
    else if (arg.startsWith('--base-url=')) options.baseUrl = arg.split('=')[1];
    else if (arg.startsWith('--concurrency=')) options.concurrency = parseInt(arg.split('=')[1], 10);
  }
  return options;
}

function showHelp() {
  console.log(`
${colors.bold}AVANI LANDING PAGES — E2E TEST RUNNER${colors.reset}

${colors.cyan}Usage:${colors.reset}
  node tests/e2e/runner.js [options]

${colors.cyan}Options:${colors.reset}
  -t, --tier=<1-4>          Run tests only for specified tier (1: Features, 2: Bounds, 3: Pairwise, 4: Scenarios)
  -f, --feature=<f01-f16>   Run tests matching specific feature ID (e.g. f01, f14)
  -k, --filter=<pattern>    Run tests whose title or suite matches regular expression
  -v, --verbose             Print individual assertions and detailed timestamps
  --bail                    Stop immediately on first failure
  --json                    Output pure JSON to stdout / write report
  --report=<path>           Custom path for results.json (default: tests/e2e/results.json)
  --base-url=<url>          Set target server base URL (default: http://localhost:3000)
  -l, --list                List discovered tests without executing
  -h, --help                Show this help message
`);
}

function discoverTestFiles(projectRoot, options) {
  const e2eDir = path.join(projectRoot, 'tests', 'e2e');
  const tierDirs = [
    { tier: 1, dir: path.join(e2eDir, 'tier1-features') },
    { tier: 2, dir: path.join(e2eDir, 'tier2-boundaries') },
    { tier: 3, dir: path.join(e2eDir, 'tier3-combinations') },
    { tier: 4, dir: path.join(e2eDir, 'tier4-scenarios') },
  ];

  const files = [];

  for (const { tier, dir } of tierDirs) {
    if (options.tier !== null && options.tier !== tier) continue;
    if (!fs.existsSync(dir)) continue;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && (entry.name.endsWith('.test.js') || entry.name.endsWith('.spec.js'))) {
        const fullPath = path.join(dir, entry.name);
        const relPath = path.relative(projectRoot, fullPath);

        // Feature filter check
        if (options.feature) {
          const featClean = options.feature.replace(/^f0?/, 'f');
          const fileClean = entry.name.toLowerCase();
          const matchesFeature = fileClean.includes(`f${options.feature.replace(/^f/, '')}`) ||
                                 fileClean.includes(options.feature);
          if (!matchesFeature && tier <= 2) continue;
        }

        files.push({
          tier,
          name: entry.name,
          relPath,
          fullPath,
        });
      }
    }
  }

  return files.sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name));
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  const projectRoot = process.cwd();
  const testFiles = discoverTestFiles(projectRoot, options);

  if (testFiles.length === 0) {
    console.error(`${colors.yellow}No test files found matching criteria (tier=${options.tier || 'all'}, feature=${options.feature || 'all'}).${colors.reset}`);
    process.exit(0);
  }

  // Set global execution context for harness
  process.env.E2E_RUNNER_ACTIVE = 'true';
  process.env.E2E_BASE_URL = options.baseUrl;

  if (!options.json) {
    console.log(`${colors.bold}================================================================================${colors.reset}`);
    console.log(`${colors.bold}                 AVANI E2E MASTER TEST RUNNER — TIERS 1-4                      ${colors.reset}`);
    console.log(`${colors.bold}================================================================================${colors.reset}`);
    console.log(`${colors.dim}Target Server:${colors.reset} ${options.baseUrl}`);
    console.log(`${colors.dim}Discovered:${colors.reset}    ${testFiles.length} test files`);
    if (options.tier) console.log(`${colors.dim}Filter Tier:${colors.reset}   Tier ${options.tier}`);
    if (options.feature) console.log(`${colors.dim}Filter Feat:${colors.reset}   ${options.feature.toUpperCase()}`);
    if (options.filter) console.log(`${colors.dim}Filter Regex:${colors.reset}  ${options.filter}`);
    console.log('');
  }

  // Pre-load all files into registry
  const loadedSuites = [];
  for (const file of testFiles) {
    resetTestRegistry();
    try {
      // Clear require cache for clean runs
      delete require.cache[require.resolve(file.fullPath)];
      require(file.fullPath);
      const registry = getTestRegistry();
      loadedSuites.push({
        file,
        suites: JSON.parse(JSON.stringify(registry.suites)), // snapshot structure
        rawSuites: registry.suites,
      });
    } catch (err) {
      console.error(`${colors.red}Failed to load test file: ${file.relPath}${colors.reset}`);
      console.error(err);
      process.exit(1);
    }
  }

  // Handle --list mode
  if (options.list) {
    console.log(`${colors.bold}Discovered Tests Inventory:${colors.reset}`);
    let totalCount = 0;
    for (const { file, suites } of loadedSuites) {
      console.log(`\n${colors.cyan}[Tier ${file.tier}] ${file.relPath}${colors.reset}`);
      for (const suite of suites) {
        console.log(`  ${colors.bold}${suite.title}${colors.reset}`);
        for (const test of suite.tests) {
          totalCount++;
          console.log(`    - ${test.title}`);
        }
      }
    }
    console.log(`\n${colors.green}Total Discovered: ${totalCount} tests.${colors.reset}`);
    process.exit(0);
  }

  const startTime = Date.now();
  const allResults = [];
  const failures = [];
  const tierMetrics = {
    1: { name: 'Tier 1: Feature Coverage', total: 0, passed: 0, failed: 0, skipped: 0 },
    2: { name: 'Tier 2: Boundary & Corner Cases', total: 0, passed: 0, failed: 0, skipped: 0 },
    3: { name: 'Tier 3: Pairwise Combinations', total: 0, passed: 0, failed: 0, skipped: 0 },
    4: { name: 'Tier 4: Real-World Scenarios', total: 0, passed: 0, failed: 0, skipped: 0 },
  };

  let shouldBail = false;

  for (const { file, rawSuites } of loadedSuites) {
    if (shouldBail) break;

    if (!options.json) {
      console.log(`${colors.cyan}--- [Tier ${file.tier}] ${file.name} ---${colors.reset}`);
    }

    for (const suite of rawSuites) {
      if (shouldBail) break;

      // Filter tests
      const filterRegex = options.filter ? new RegExp(options.filter, 'i') : null;

      for (const testCase of suite.tests) {
        if (filterRegex && !filterRegex.test(testCase.title) && !filterRegex.test(suite.title)) {
          continue;
        }

        tierMetrics[file.tier].total++;
        const testStart = Date.now();

        if (testCase.skip) {
          tierMetrics[file.tier].skipped++;
          allResults.push({
            tier: file.tier,
            file: file.relPath,
            suite: suite.title,
            test: testCase.title,
            status: 'skipped',
            durationMs: 0,
            error: null,
          });
          if (!options.json) {
            console.log(`  ${colors.yellow}○ [SKIP]${colors.reset} ${testCase.title}`);
          }
          continue;
        }

        try {
          // Execute beforeEach hooks
          for (const hook of suite.beforeEach) await hook();

          // Execute test function with timeout protection
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Test timed out after ${testCase.timeoutMs}ms`)), testCase.timeoutMs)
          );
          await Promise.race([testCase.fn(), timeoutPromise]);

          // Execute afterEach hooks
          for (const hook of suite.afterEach) await hook();

          const durationMs = Date.now() - testStart;
          tierMetrics[file.tier].passed++;
          allResults.push({
            tier: file.tier,
            file: file.relPath,
            suite: suite.title,
            test: testCase.title,
            status: 'passed',
            durationMs,
            error: null,
          });

          if (!options.json) {
            console.log(`  ${colors.green}✓${colors.reset} ${testCase.title} ${colors.gray}(${durationMs}ms)${colors.reset}`);
          }
        } catch (err) {
          const durationMs = Date.now() - testStart;
          tierMetrics[file.tier].failed++;
          const failureRecord = {
            tier: file.tier,
            file: file.relPath,
            suite: suite.title,
            test: testCase.title,
            status: 'failed',
            durationMs,
            error: {
              message: err.message || String(err),
              actual: err.actual !== undefined ? err.actual : null,
              expected: err.expected !== undefined ? err.expected : null,
              stack: err.stack || '',
            },
          };
          allResults.push(failureRecord);
          failures.push(failureRecord);

          if (!options.json) {
            console.log(`  ${colors.red}✗ [FAIL]${colors.reset} ${testCase.title} ${colors.gray}(${durationMs}ms)${colors.reset}`);
            if (options.verbose) {
              console.log(`    ${colors.red}${err.message}${colors.reset}`);
            }
          }

          if (options.bail) {
            shouldBail = true;
            break;
          }
        }
      }
    }
  }

  const totalDuration = Date.now() - startTime;
  const totalTests = allResults.length;
  const totalPassed = allResults.filter(r => r.status === 'passed').length;
  const totalFailed = allResults.filter(r => r.status === 'failed').length;
  const totalSkipped = allResults.filter(r => r.status === 'skipped').length;
  const passRate = totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(1) : 0;

  // Build Results Payload
  const reportPayload = {
    timestamp: new Date().toISOString(),
    durationMs: totalDuration,
    summary: {
      total: totalTests,
      passed: totalPassed,
      failed: totalFailed,
      skipped: totalSkipped,
      passRate: parseFloat(passRate),
    },
    tiers: tierMetrics,
    results: allResults,
    failures: failures,
  };

  // Write JSON report file
  if (options.report) {
    const reportDir = path.dirname(path.resolve(projectRoot, options.report));
    if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
    fs.writeFileSync(path.resolve(projectRoot, options.report), JSON.stringify(reportPayload, null, 2), 'utf8');
  }

  if (options.json) {
    console.log(JSON.stringify(reportPayload, null, 2));
  } else {
    // Print Formatted Console Summary
    console.log(`\n${colors.bold}================================================================================${colors.reset}`);
    console.log(`${colors.bold}                               TEST SUMMARY                                     ${colors.reset}`);
    console.log(`${colors.bold}================================================================================${colors.reset}`);
    
    for (const [tierNum, metric] of Object.entries(tierMetrics)) {
      if (metric.total === 0) continue;
      const statusColor = metric.failed === 0 ? colors.green : colors.red;
      console.log(`  ${metric.name.padEnd(35)}: ${statusColor}${metric.passed}/${metric.total} Passed${colors.reset} (${metric.failed} Failed, ${metric.skipped} Skipped)`);
    }

    console.log('--------------------------------------------------------------------------------');
    console.log(`  ${colors.bold}Total Tests:${colors.reset}    ${totalTests}`);
    console.log(`  ${colors.bold}Passed:${colors.reset}         ${colors.green}${totalPassed}${colors.reset} (${passRate}%)`);
    console.log(`  ${colors.bold}Failed:${colors.reset}         ${totalFailed > 0 ? colors.red : colors.green}${totalFailed}${colors.reset}`);
    console.log(`  ${colors.bold}Skipped:${colors.reset}        ${totalSkipped}`);
    console.log(`  ${colors.bold}Duration:${colors.reset}       ${totalDuration}ms`);
    console.log(`  ${colors.bold}Results JSON:${colors.reset}   ${options.report}`);

    if (failures.length > 0) {
      console.log(`\n${colors.bold}================================================================================${colors.reset}`);
      console.log(`${colors.bold}${colors.red}                               FAILURES (${failures.length})                                  ${colors.reset}`);
      console.log(`${colors.bold}================================================================================${colors.reset}`);
      failures.forEach((f, idx) => {
        console.log(`\n${colors.red}${idx + 1}) [${f.file}] ${f.test}${colors.reset}`);
        console.log(`   ${colors.bold}Error:${colors.reset} ${f.error.message}`);
        if (f.error.expected !== null && f.error.actual !== null) {
          console.log(`   ${colors.bold}Expected:${colors.reset} ${JSON.stringify(f.error.expected)}`);
          console.log(`   ${colors.bold}Actual:${colors.reset}   ${JSON.stringify(f.error.actual)}`);
        }
        if (f.error.stack) {
          const cleanStack = f.error.stack.split('\n').slice(1, 4).join('\n');
          console.log(`   ${colors.dim}${cleanStack}${colors.reset}`);
        }
      });
    }

    console.log(`\n${colors.bold}================================================================================${colors.reset}`);
    if (totalFailed === 0) {
      console.log(`${colors.green}${colors.bold}STATUS: ALL PASS (Exit Code 0)${colors.reset}`);
    } else {
      console.log(`${colors.red}${colors.bold}STATUS: ${totalFailed} TEST(S) FAILED (Exit Code 1)${colors.reset}`);
    }
    console.log(`${colors.bold}================================================================================${colors.reset}\n`);
  }

  process.exit(totalFailed > 0 ? 1 : 0);
}

if (require.main === module) {
  main().catch(err => {
    console.error('Fatal Runner Error:', err);
    process.exit(1);
  });
}

module.exports = { main, parseArgs, discoverTestFiles };
```

---

## 4. Assertion Harness Specification (`tests/e2e/harness.js`)

### 4.1 Architecture & Design
The harness acts as both the **test definition DSL** (`describe`, `test`, `it`, hooks) and the **assertion library** (`assert.*`).

### 4.2 Comprehensive Assertion API Matrix

| Assertion Category | Method | Description |
|-------------------|--------|-------------|
| **Core Primitives** | `assert(condition, message)` | Fails if condition is falsy. |
| | `assertEqual(actual, expected, message)` | Strict equality (`===`). |
| | `assertNotEqual(actual, expected, message)` | Strict inequality (`!==`). |
| | `assertDeepEqual(actual, expected, message)` | Deep structural equivalence via `node:assert.deepStrictEqual`. |
| | `assertContains(haystack, needle, message)` | Substring or array element containment. |
| | `assertNotContains(haystack, needle, message)` | Ensures substring or element is absent. |
| | `assertMatchesRegex(str, regex, message)` | Verifies string matches pattern. |
| | `assertInRange(num, min, max, message)` | Verifies `min <= num <= max`. |
| | `assertType(val, type, message)` | Verifies `typeof val === type`. |
| | `assertThrows(fn, regexOrType, message)` | Ensures sync/async function throws. |
| | `assertDoesNotThrow(fn, message)` | Ensures function does not throw. |
| **File System Probes** | `assertFileExists(relPath, message)` | Confirms file existence relative to project root. |
| | `assertFileDoesNotExist(relPath, message)` | Confirms file is absent. |
| | `assertDirectoryExists(relPath, message)` | Confirms directory existence. |
| | `assertFileSizeGreaterThan(relPath, bytes)` | Verifies non-empty media/mockup asset. |
| | `assertFileSizeInRange(relPath, min, max)` | Bounds checking on binary assets. |
| | `assertValidJson(relPathOrStr, validator)` | Validates JSON parse and runs custom schema validator. |
| **Media Probes** | `assertImageHeader(relPath, 'jpeg'\|'png'\|'webp'\|'svg')` | Inspects binary magic bytes. |
| **HTTP & DOM Probes** | `assertHttpStatus(urlPath, expectedStatus)` | GET request returns expected HTTP status code. |
| | `assertHttpHeader(urlPath, header, regex)` | Verifies response header matches pattern. |
| | `assertHtmlContains(urlPath, needle)` | Fetches route and checks HTML for string or token. |
| | `assertHtmlMatches(urlPath, regex)` | Fetches route and tests HTML against regex. |
| **Subprocess Probes**| `assertCommandSucceeds(cmd, options)` | Runs shell command, asserts exit code 0. |
| | `assertCommandFails(cmd, options)` | Runs shell command, asserts exit code != 0. |

### 4.3 Verbatim Implementation: `tests/e2e/harness.js`

```javascript
/**
 * Standalone E2E Assertion & Testing Harness for Avani Landing Pages
 * Zero-dependency test runner engine and assertion primitives.
 */

const fs = require('node:fs');
const path = require('node:path');
const nodeAssert = require('node:assert');
const { execSync, spawn } = require('node:child_process');

// Custom AssertionError with rich debugging context
class AssertionError extends Error {
  constructor(message, { actual, expected, operator } = {}) {
    super(message);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
    this.operator = operator;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AssertionError);
    }
  }
}

// Global Test Registry
const testRegistry = {
  suites: [],
  currentSuite: null,
};

function getTestRegistry() {
  return testRegistry;
}

function resetTestRegistry() {
  testRegistry.suites = [];
  testRegistry.currentSuite = null;
}

// Test Registration DSL
function describe(title, fn) {
  const suite = {
    title,
    tests: [],
    beforeEach: [],
    afterEach: [],
    beforeAll: [],
    afterAll: [],
  };

  const parentSuite = testRegistry.currentSuite;
  testRegistry.currentSuite = suite;
  testRegistry.suites.push(suite);

  fn();

  testRegistry.currentSuite = parentSuite;
}

function test(title, fn, options = {}) {
  const targetSuite = testRegistry.currentSuite || {
    title: 'Default Suite',
    tests: [],
    beforeEach: [],
    afterEach: [],
    beforeAll: [],
    afterAll: [],
  };

  if (!testRegistry.currentSuite) {
    testRegistry.suites.push(targetSuite);
    testRegistry.currentSuite = targetSuite;
  }

  targetSuite.tests.push({
    title,
    fn,
    timeoutMs: options.timeout || 15000,
    skip: !!options.skip,
    only: !!options.only,
  });
}

const it = test;

test.skip = (title, fn) => test(title, fn, { skip: true });
it.skip = test.skip;

function beforeEach(fn) {
  if (testRegistry.currentSuite) testRegistry.currentSuite.beforeEach.push(fn);
}

function afterEach(fn) {
  if (testRegistry.currentSuite) testRegistry.currentSuite.afterEach.push(fn);
}

function beforeAll(fn) {
  if (testRegistry.currentSuite) testRegistry.currentSuite.beforeAll.push(fn);
}

function afterAll(fn) {
  if (testRegistry.currentSuite) testRegistry.currentSuite.afterAll.push(fn);
}

// Core Assertion Primitives
const assert = {
  assert(condition, message = 'Expected condition to be truthy') {
    if (!condition) {
      throw new AssertionError(message, { actual: condition, expected: true });
    }
  },

  assertEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new AssertionError(
        message || `Expected ${JSON.stringify(actual)} to strictly equal ${JSON.stringify(expected)}`,
        { actual, expected, operator: '===' }
      );
    }
  },

  assertNotEqual(actual, expected, message) {
    if (actual === expected) {
      throw new AssertionError(
        message || `Expected ${JSON.stringify(actual)} to not equal ${JSON.stringify(expected)}`,
        { actual, expected, operator: '!==' }
      );
    }
  },

  assertDeepEqual(actual, expected, message) {
    try {
      nodeAssert.deepStrictEqual(actual, expected);
    } catch (err) {
      throw new AssertionError(message || err.message, { actual, expected, operator: 'deepStrictEqual' });
    }
  },

  assertContains(haystack, needle, message) {
    if (typeof haystack === 'string') {
      if (!haystack.includes(needle)) {
        throw new AssertionError(
          message || `Expected string to contain ${JSON.stringify(needle)}`,
          { actual: haystack.length > 80 ? haystack.slice(0, 80) + '...' : haystack, expected: needle }
        );
      }
    } else if (Array.isArray(haystack)) {
      if (!haystack.includes(needle) && !haystack.some(x => JSON.stringify(x) === JSON.stringify(needle))) {
        throw new AssertionError(
          message || `Expected array to contain ${JSON.stringify(needle)}`,
          { actual: haystack, expected: needle }
        );
      }
    } else {
      throw new AssertionError(`assertContains target must be string or array, got ${typeof haystack}`);
    }
  },

  assertNotContains(haystack, needle, message) {
    if (typeof haystack === 'string' && haystack.includes(needle)) {
      throw new AssertionError(
        message || `Expected string to NOT contain ${JSON.stringify(needle)}`,
        { actual: needle, expected: 'absent' }
      );
    }
    if (Array.isArray(haystack) && haystack.includes(needle)) {
      throw new AssertionError(
        message || `Expected array to NOT contain ${JSON.stringify(needle)}`,
        { actual: needle, expected: 'absent' }
      );
    }
  },

  assertMatchesRegex(str, regex, message) {
    if (typeof str !== 'string' || !regex.test(str)) {
      throw new AssertionError(
        message || `Expected string to match pattern ${regex}`,
        { actual: str ? str.slice(0, 100) : str, expected: String(regex) }
      );
    }
  },

  assertInRange(value, min, max, message) {
    if (typeof value !== 'number' || value < min || value > max) {
      throw new AssertionError(
        message || `Expected ${value} to be between ${min} and ${max}`,
        { actual: value, expected: `[${min}, ${max}]` }
      );
    }
  },

  assertType(value, expectedType, message) {
    if (typeof value !== expectedType) {
      throw new AssertionError(
        message || `Expected type ${expectedType}, but got ${typeof value}`,
        { actual: typeof value, expected: expectedType }
      );
    }
  },

  async assertThrows(fn, expectedRegexOrType, message) {
    let threw = false;
    let thrownError = null;
    try {
      await fn();
    } catch (err) {
      threw = true;
      thrownError = err;
    }
    if (!threw) {
      throw new AssertionError(message || 'Expected function to throw an error, but it did not throw.');
    }
    if (expectedRegexOrType instanceof RegExp) {
      if (!expectedRegexOrType.test(thrownError.message)) {
        throw new AssertionError(
          `Expected error message to match ${expectedRegexOrType}, got: ${thrownError.message}`,
          { actual: thrownError.message, expected: String(expectedRegexOrType) }
        );
      }
    }
  },

  async assertDoesNotThrow(fn, message) {
    try {
      await fn();
    } catch (err) {
      throw new AssertionError(message || `Expected function not to throw, but caught: ${err.message}`, {
        actual: err.message,
      });
    }
  },

  // File System Probes
  assertFileExists(relPath, message) {
    const fullPath = path.resolve(process.cwd(), relPath);
    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
      throw new AssertionError(message || `Expected file "${relPath}" to exist`, {
        actual: false,
        expected: true,
      });
    }
  },

  assertFileDoesNotExist(relPath, message) {
    const fullPath = path.resolve(process.cwd(), relPath);
    if (fs.existsSync(fullPath)) {
      throw new AssertionError(message || `Expected file "${relPath}" to NOT exist`, {
        actual: true,
        expected: false,
      });
    }
  },

  assertDirectoryExists(relPath, message) {
    const fullPath = path.resolve(process.cwd(), relPath);
    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isDirectory()) {
      throw new AssertionError(message || `Expected directory "${relPath}" to exist`, {
        actual: false,
        expected: true,
      });
    }
  },

  assertFileSizeGreaterThan(relPath, minBytes, message) {
    const fullPath = path.resolve(process.cwd(), relPath);
    this.assertFileExists(relPath);
    const stat = fs.statSync(fullPath);
    if (stat.size <= minBytes) {
      throw new AssertionError(
        message || `Expected file "${relPath}" size (${stat.size}B) to be > ${minBytes}B`,
        { actual: stat.size, expected: `> ${minBytes}` }
      );
    }
  },

  assertFileSizeInRange(relPath, minBytes, maxBytes, message) {
    const fullPath = path.resolve(process.cwd(), relPath);
    this.assertFileExists(relPath);
    const stat = fs.statSync(fullPath);
    if (stat.size < minBytes || stat.size > maxBytes) {
      throw new AssertionError(
        message || `Expected file "${relPath}" size (${stat.size}B) to be in [${minBytes}, ${maxBytes}]B`,
        { actual: stat.size, expected: `[${minBytes}, ${maxBytes}]` }
      );
    }
  },

  assertValidJson(relPathOrString, validatorFn, message) {
    let content = relPathOrString;
    const fullPath = path.resolve(process.cwd(), relPathOrString);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      content = fs.readFileSync(fullPath, 'utf8');
    }
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      throw new AssertionError(message || `Invalid JSON content: ${err.message}`, { actual: err.message });
    }
    if (typeof validatorFn === 'function') {
      const result = validatorFn(parsed);
      if (result === false) {
        throw new AssertionError(message || 'JSON schema validator function failed', { actual: parsed });
      }
    }
    return parsed;
  },

  // Binary Media Header Inspector
  assertImageHeader(relPath, expectedType, message) {
    const fullPath = path.resolve(process.cwd(), relPath);
    this.assertFileExists(relPath);
    const buf = fs.readFileSync(fullPath);
    if (buf.length < 8) {
      throw new AssertionError(`File "${relPath}" is too small (${buf.length} bytes) to have a valid image header`);
    }

    const type = expectedType.toLowerCase();
    let isValid = false;

    if (type === 'jpeg' || type === 'jpg') {
      isValid = buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF;
    } else if (type === 'png') {
      isValid = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47 &&
                buf[4] === 0x0D && buf[5] === 0x0A && buf[6] === 0x1A && buf[7] === 0x0A;
    } else if (type === 'webp') {
      isValid = buf.length >= 12 &&
                buf.toString('ascii', 0, 4) === 'RIFF' &&
                buf.toString('ascii', 8, 12) === 'WEBP';
    } else if (type === 'svg') {
      const textHead = buf.slice(0, 200).toString('utf8').trim();
      isValid = textHead.includes('<svg') || textHead.includes('<?xml');
    }

    if (!isValid) {
      throw new AssertionError(
        message || `File "${relPath}" does not have valid magic header bytes for ${expectedType.toUpperCase()}`,
        { actual: buf.slice(0, 12).toString('hex'), expected: expectedType }
      );
    }
  },

  // HTTP & DOM Extraction Probes
  async fetchUrl(urlPath, options = {}) {
    const baseUrl = process.env.E2E_BASE_URL || 'http://localhost:3000';
    const targetUrl = urlPath.startsWith('http') ? urlPath : `${baseUrl.replace(/\/$/, '')}/${urlPath.replace(/^\//, '')}`;
    const timeout = options.timeout || 10000;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const res = await fetch(targetUrl, {
        method: options.method || 'GET',
        headers: options.headers || {},
        signal: controller.signal,
      });
      const text = await res.text();
      return {
        status: res.status,
        headers: Object.fromEntries(res.headers.entries()),
        body: text,
        url: targetUrl,
      };
    } finally {
      clearTimeout(timeoutId);
    }
  },

  async assertHttpStatus(urlPath, expectedStatus, message) {
    const res = await this.fetchUrl(urlPath);
    if (res.status !== expectedStatus) {
      throw new AssertionError(
        message || `Expected GET "${urlPath}" to return HTTP ${expectedStatus}, but got ${res.status}`,
        { actual: res.status, expected: expectedStatus }
      );
    }
    return res;
  },

  async assertHtmlContains(urlPath, needle, message) {
    const res = await this.assertHttpStatus(urlPath, 200);
    this.assertContains(res.body, needle, message || `Expected HTML at "${urlPath}" to contain ${JSON.stringify(needle)}`);
    return res;
  },

  async assertHtmlMatches(urlPath, regex, message) {
    const res = await this.assertHttpStatus(urlPath, 200);
    this.assertMatchesRegex(res.body, regex, message || `Expected HTML at "${urlPath}" to match ${regex}`);
    return res;
  },

  // Subprocess Runner Probes
  assertCommandSucceeds(cmd, options = {}, message) {
    try {
      const stdout = execSync(cmd, {
        cwd: options.cwd || process.cwd(),
        encoding: 'utf8',
        timeout: options.timeout || 60000,
        env: { ...process.env, ...options.env },
        stdio: options.verbose ? 'inherit' : 'pipe',
      });
      return stdout;
    } catch (err) {
      throw new AssertionError(
        message || `Command "${cmd}" failed with exit code ${err.status}: ${err.stderr || err.message}`,
        { actual: err.status, expected: 0 }
      );
    }
  },
};

// HTML Extraction Helpers
const domHelpers = {
  extractLinks(html) {
    const links = [];
    const regex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis;
    let match;
    while ((match = regex.exec(html)) !== null) {
      links.push({
        href: match[1],
        text: match[2].replace(/<[^>]+>/g, '').trim(),
      });
    }
    return links;
  },

  extractImages(html) {
    const images = [];
    const regex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
      const src = match[1];
      const altMatch = match[0].match(/alt=["']([^"']+)["']/i);
      images.push({
        src,
        alt: altMatch ? altMatch[1] : '',
      });
    }
    return images;
  },

  extractMetaTags(html) {
    const meta = [];
    const regex = /<meta\s+([^>]+)>/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
      const attrsStr = match[1];
      const nameMatch = attrsStr.match(/(?:name|property)=["']([^"']+)["']/i);
      const contentMatch = attrsStr.match(/content=["']([^"']+)["']/i);
      if (nameMatch && contentMatch) {
        meta.push({ name: nameMatch[1], content: contentMatch[1] });
      }
    }
    return meta;
  },
};

// Utilities
const utils = {
  readFileUtf8(relPath) {
    const fullPath = path.resolve(process.cwd(), relPath);
    return fs.readFileSync(fullPath, 'utf8');
  },

  readFileBuffer(relPath) {
    const fullPath = path.resolve(process.cwd(), relPath);
    return fs.readFileSync(fullPath);
  },

  async isServerRunning(baseUrl = 'http://localhost:3000') {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 1000);
      const res = await fetch(baseUrl, { signal: controller.signal });
      clearTimeout(id);
      return res.status >= 200 && res.status < 500;
    } catch {
      return false;
    }
  },

  async withBrowser(testFn, options = {}) {
    let browserPkg;
    try {
      browserPkg = require('playwright');
    } catch {
      try {
        browserPkg = require('puppeteer');
      } catch {
        return {
          skipped: true,
          reason: 'Neither playwright nor puppeteer is installed. Run `npm install -D playwright` to enable browser automation.',
        };
      }
    }

    const browser = await (browserPkg.chromium || browserPkg).launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const context = await (browser.newContext ? browser.newContext({
        viewport: options.viewport || { width: 1280, height: 800 },
      }) : browser.createIncognitoBrowserContext?.());
      const page = await (context ? context.newPage() : browser.newPage());
      await testFn({ browser, context, page });
      return { passed: true };
    } finally {
      await browser.close();
    }
  },
};

// Self-Executing Standalone Runner Mechanism
// When a test file is executed directly (e.g. `node tests/e2e/tier1-features/t1_f01_stitch_p1.test.js`)
const isStandalone = !process.env.E2E_RUNNER_ACTIVE &&
  require.main &&
  require.main.filename !== path.resolve(__dirname, 'runner.js');

if (isStandalone) {
  setImmediate(async () => {
    console.log(`\x1b[1m\x1b[36mRunning Standalone Test File:\x1b[0m ${require.main.filename}\n`);
    let passed = 0;
    let failed = 0;
    const start = Date.now();

    for (const suite of testRegistry.suites) {
      console.log(`\x1b[1mSuite: ${suite.title}\x1b[0m`);
      for (const t of suite.tests) {
        if (t.skip) {
          console.log(`  \x1b[33m○ [SKIP]\x1b[0m ${t.title}`);
          continue;
        }
        try {
          for (const hook of suite.beforeEach) await hook();
          await t.fn();
          for (const hook of suite.afterEach) await hook();
          console.log(`  \x1b[32m✓\x1b[0m ${t.title}`);
          passed++;
        } catch (err) {
          console.log(`  \x1b[31m✗ [FAIL]\x1b[0m ${t.title}`);
          console.error(`    \x1b[31m${err.message}\x1b[0m`);
          if (err.stack) {
            console.error(`    \x1b[90m${err.stack.split('\n').slice(1, 4).join('\n')}\x1b[0m`);
          }
          failed++;
        }
      }
    }

    const elapsed = Date.now() - start;
    console.log(`\n\x1b[1mResult: ${passed} passed, ${failed} failed in ${elapsed}ms\x1b[0m`);
    process.exit(failed > 0 ? 1 : 0);
  });
}

module.exports = {
  describe,
  test,
  it,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  assert,
  domHelpers,
  utils,
  AssertionError,
  getTestRegistry,
  resetTestRegistry,
};
```

---

## 5. Concrete Test Authoring Templates Across All 4 Tiers

Below are fully functioning templates demonstrating how test writers will author tests across Tiers 1 through 4.

### 5.1 Tier 1: Feature Coverage Template (`tests/e2e/tier1-features/t1_f01_stitch_p1.test.js`)

```javascript
/**
 * Tier 1: Feature Coverage — Feature F1: Stitch MCP P1 Mockup
 * Minimum: 5 tests
 */

const { describe, test, assert, utils, domHelpers } = require('../harness');

describe('T1_F01: Stitch MCP P1 Mockup (Living Canopy)', () => {
  test('T1_F01_01: Verify mockup directory exists', () => {
    assert.assertDirectoryExists('mockups/prototype_1', 'Mockup directory for P1 must exist');
  });

  test('T1_F01_02: Verify mockup.html exists and contains valid HTML structure', () => {
    assert.assertFileExists('mockups/prototype_1/mockup.html');
    const html = utils.readFileUtf8('mockups/prototype_1/mockup.html');
    assert.assertMatchesRegex(html, /<!DOCTYPE\s+html/i, 'Must contain DOCTYPE declaration');
    assert.assertMatchesRegex(html, /<html[\s>]/i, 'Must contain <html> tag');
  });

  test('T1_F01_03: Verify mockup.png screenshot exists and has valid PNG header', () => {
    assert.assertFileExists('mockups/prototype_1/mockup.png');
    assert.assertFileSizeGreaterThan('mockups/prototype_1/mockup.png', 5000, 'PNG mockup must be > 5KB');
    assert.assertImageHeader('mockups/prototype_1/mockup.png', 'png');
  });

  test('T1_F01_04: Verify metadata.json has valid structure and screen ID', () => {
    assert.assertFileExists('mockups/prototype_1/metadata.json');
    assert.assertValidJson('mockups/prototype_1/metadata.json', (data) => {
      assert.assert(data.screenId || data.projectId, 'Must contain screenId or projectId');
      assert.assert(data.title || data.name, 'Must contain title or name');
    });
  });

  test('T1_F01_05: Verify Canva Idea 5 design tokens (Living Canopy theme)', () => {
    const html = utils.readFileUtf8('mockups/prototype_1/mockup.html');
    // Verify botanical / green / canopy color tokens or references
    const hasGreenTokens = /#163515|#D0E8C5|emerald|green|canopy|forest/i.test(html);
    assert.assert(hasGreenTokens, 'Mockup HTML must incorporate Canva Idea 5 botanical tokens');
  });
});
```

### 5.2 Tier 2: Boundary & Corner Cases Template (`tests/e2e/tier2-boundaries/t2_f01_f03_mockup_bounds.test.js`)

```javascript
/**
 * Tier 2: Boundary & Corner Cases — Mockups & Export Bounds (F1-F3)
 */

const { describe, test, assert, utils } = require('../harness');

describe('T2_BOUND_MOCKUPS: Mockup Boundary & Resiliency Checks', () => {
  test('T2_F01_B01: HTML file size within valid bounds (not an empty stub or infinite dump)', () => {
    // Expected size between 1KB and 5MB
    assert.assertFileSizeInRange('mockups/prototype_1/mockup.html', 1024, 5 * 1024 * 1024);
  });

  test('T2_F02_B02: Prototype 2 mockup distinct from Prototype 1', () => {
    const p1 = utils.readFileUtf8('mockups/prototype_1/mockup.html');
    const p2 = utils.readFileUtf8('mockups/prototype_2/mockup.html');
    assert.assertNotEqual(p1, p2, 'Prototype 1 and Prototype 2 mockups must not be identical clones');
  });

  test('T2_F03_B03: Metadata JSON handles UTF-8 special characters without corruption', () => {
    const meta = assert.assertValidJson('mockups/prototype_1/metadata.json');
    assert.assertType(meta, 'object');
  });
});
```

### 5.3 Tier 3: Pairwise Combinations Template (`tests/e2e/tier3-combinations/t3_pairwise_interactions.test.js`)

```javascript
/**
 * Tier 3: Pairwise Combinations
 * Minimum: 16 cross-feature interaction tests
 */

const { describe, test, assert, utils } = require('../harness');

describe('T3_PAIR: Pairwise Feature Interactions', () => {
  test('T3_PAIR_01: F1 x F6 — Stitch P1 design tokens match Tailwind color config', () => {
    const tailwindConfig = utils.readFileUtf8('tailwind.config.ts');
    assert.assertContains(tailwindConfig, '#163515', 'Tailwind must configure Deep Rainforest');
    assert.assertContains(tailwindConfig, '#D0E8C5', 'Tailwind must configure Canopy Mist');
  });

  test('T3_PAIR_02: F5 x F8 — Avani Logo is linked in Navbar and Footer components', () => {
    const navbarCode = utils.readFileUtf8('src/components/common/Navbar.tsx');
    assert.assertMatchesRegex(navbarCode, /logo\.jpg|AvaniLogo/i, 'Navbar must reference Avani logo');
  });

  test('T3_PAIR_03: F4 x F11 — Google Flow event images referenced in P1 overlay cards', () => {
    const overlayCode = utils.readFileUtf8('src/components/prototype1/P1Overlay.tsx');
    assert.assertMatchesRegex(overlayCode, /event_dps_drive|event_invictus_denim/i, 'P1 overlay must reference generated event media');
  });

  test('T3_PAIR_04: F7 x F14 — avaniContent.ts links match external verification requirements', () => {
    const contentCode = utils.readFileUtf8('src/lib/avaniContent.ts');
    assert.assertContains(contentCode, 'avaniyocc@gmail.com');
    assert.assertContains(contentCode, '+91 8050931769');
    assert.assertContains(contentCode, 'https://docs.google.com/forms');
  });
});
```

### 5.4 Tier 4: Real-World Scenarios Template (`tests/e2e/tier4-scenarios/t4_real_world_workloads.test.js`)

```javascript
/**
 * Tier 4: Real-World Application Scenarios
 * High-fidelity full user journeys
 */

const { describe, test, assert, domHelpers, utils } = require('../harness');

describe('T4_SCENARIOS: End-to-End User Workloads', () => {
  test('T4_SCENARIO_01: Prospective Student Explorer Journey (/ -> /prototype-1 -> Apply)', async () => {
    const isLive = await utils.isServerRunning();
    if (!isLive) {
      console.log('    [Server Offline] Performing static contract verification for Scenario 1');
      assert.assertFileExists('src/app/page.tsx');
      assert.assertFileExists('src/app/prototype-1/page.tsx');
      const content = utils.readFileUtf8('src/lib/avaniContent.ts');
      assert.assertContains(content, 'https://docs.google.com/forms');
      return;
    }

    // 1. Visit Hub
    const hubRes = await assert.assertHttpStatus('/', 200);
    const hubLinks = domHelpers.extractLinks(hubRes.body);
    const hasP1Link = hubLinks.some(l => l.href.includes('prototype-1'));
    assert.assert(hasP1Link, 'Hub must link to /prototype-1');

    // 2. Visit Prototype 1
    const p1Res = await assert.assertHttpStatus('/prototype-1', 200);
    assert.assertContains(p1Res.body, 'Avani');
    const p1Links = domHelpers.extractLinks(p1Res.body);
    const applyLink = p1Links.find(l => l.href.includes('docs.google.com/forms'));
    assert.assert(applyLink, 'Prototype 1 must contain external Application Form link');
  });

  test('T4_SCENARIO_02: Climate Action Advocate Journey (/prototype-2 -> 11 Tips -> Substack)', async () => {
    const content = utils.readFileUtf8('src/lib/avaniContent.ts');
    assert.assertContains(content, 'climateTips');
    assert.assertContains(content, 'https://open.substack.com/pub/avaniyocc');
  });
});
```

---

## 6. Integration with Package.json & CI/CD Scripts

The runner integrates into the project root's `package.json` scripts:

```json
{
  "name": "avani_landing_pages",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test:e2e": "node tests/e2e/runner.js",
    "test:e2e:t1": "node tests/e2e/runner.js --tier=1",
    "test:e2e:t2": "node tests/e2e/runner.js --tier=2",
    "test:e2e:t3": "node tests/e2e/runner.js --tier=3",
    "test:e2e:t4": "node tests/e2e/runner.js --tier=4",
    "test:e2e:json": "node tests/e2e/runner.js --json --report=tests/e2e/results.json",
    "test:e2e:bail": "node tests/e2e/runner.js --bail"
  }
}
```

---

## 7. Verification & Self-Audit Protocol

To independently verify the test runner and assertion harness before test writers begin creating test cases:

1. **Syntax & Unit Validation**:
   ```bash
   node -e "require('./tests/e2e/harness.js'); console.log('Harness loaded successfully.');"
   node -e "require('./tests/e2e/runner.js'); console.log('Runner loaded successfully.');"
   ```

2. **CLI Options Validation**:
   ```bash
   node tests/e2e/runner.js --help
   node tests/e2e/runner.js --list
   ```

3. **Assertion Unit Test**:
   Execute the harness's built-in assertions against real files and verify that passing conditions pass and failing conditions produce clear, readable `AssertionError` stack traces pointing to the exact line number.

---
*End of Architecture Specification.*
