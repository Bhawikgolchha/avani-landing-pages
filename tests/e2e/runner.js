#!/usr/bin/env node
/**
 * Avani Interactive Landing Pages — Master E2E Test Runner
 * 
 * Discovers, filters, executes, and aggregates test suites across:
 * - Tier 1: Feature Coverage (tests/e2e/tier1-features/*.test.js)
 * - Tier 2: Boundary & Corner Cases (tests/e2e/tier2-boundaries/*.test.js)
 * - Tier 3: Cross-Feature Pairwise Interactions (tests/e2e/tier3-combinations/*.test.js)
 * - Tier 4: Real-World Scenarios (tests/e2e/tier4-scenarios/*.test.js)
 * 
 * Supports CLI flags:
 *   --tier=<1|2|3|4|all>, -t <tier>
 *   --feature=<F1..F16>, -f <feat>
 *   --json
 *   --verbose, -v
 *   --bail, -b
 *   --results-path=<path>
 *   --no-color
 *   --help, -h
 */

const fs = require('node:fs');
const path = require('node:path');
const harness = require('./harness');

// -----------------------------------------------------------------------------
// CLI Argument Parsing
// -----------------------------------------------------------------------------

function printHelp() {
  console.log(`
Avani E2E Test Runner & Harness
================================

Usage:
  node tests/e2e/runner.js [options] [test-files...]

Options:
  --tier=<1|2|3|4|all>, -t <tier>   Run tests for a specific tier (default: all)
  --all                             Run all tiers (default)
  --feature=<F1..F16>, -f <feat>   Filter tests by feature identifier (e.g. F1, F5)
  --json                            Output structured JSON report to stdout
  --verbose, -v                     Show individual test titles and timings
  --bail, -b                        Stop execution immediately on first failure
  --results-path=<path>             Custom destination for results.json (default: tests/e2e/results.json)
  --no-color                        Disable ANSI color formatting
  --help, -h                        Display this help message and exit

Tiers:
  Tier 1: Feature Coverage (F1 through F16)
  Tier 2: Boundary Value Analysis & Edge Cases
  Tier 3: Cross-Feature Pairwise Interactions
  Tier 4: Real-World End-to-End Application Scenarios

Examples:
  node tests/e2e/runner.js
  node tests/e2e/runner.js --tier=1 --verbose
  node tests/e2e/runner.js --feature=F1
  node tests/e2e/runner.js --bail --json
  node tests/e2e/runner.js tests/e2e/tier1-features/t1_f01_stitch_p1.test.js
`);
}

function parseArgs(args) {
  const options = {
    tier: 'all',
    feature: null,
    json: false,
    verbose: false,
    bail: false,
    noColor: false,
    help: false,
    resultsPath: path.resolve(__dirname, 'results.json'),
    files: []
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--all') {
      options.tier = 'all';
    } else if (arg.startsWith('--tier=')) {
      options.tier = arg.split('=')[1].toLowerCase();
    } else if (arg === '-t' || arg === '--tier') {
      options.tier = (args[++i] || 'all').toLowerCase();
    } else if (arg.startsWith('--feature=')) {
      options.feature = harness.normalizeFeature(arg.split('=')[1]);
    } else if (arg === '-f' || arg === '--feature') {
      options.feature = harness.normalizeFeature(args[++i] || '');
    } else if (arg === '--json') {
      options.json = true;
    } else if (arg === '--verbose' || arg === '-v') {
      options.verbose = true;
    } else if (arg === '--bail' || arg === '-b') {
      options.bail = true;
    } else if (arg === '--no-color') {
      options.noColor = true;
    } else if (arg.startsWith('--results-path=')) {
      options.resultsPath = path.resolve(process.cwd(), arg.split('=')[1]);
    } else if (arg.startsWith('--results=')) {
      options.resultsPath = path.resolve(process.cwd(), arg.split('=')[1]);
    } else if (arg === '--results-path' || arg === '--results') {
      options.resultsPath = path.resolve(process.cwd(), args[++i]);
    } else if (!arg.startsWith('-')) {
      options.files.push(path.resolve(process.cwd(), arg));
    }
  }

  return options;
}

// -----------------------------------------------------------------------------
// Terminal Styling Helpers
// -----------------------------------------------------------------------------

function createStyler(noColor) {
  const enabled = !noColor && !process.env.NO_COLOR && (process.stdout.isTTY || process.env.FORCE_COLOR);
  return {
    reset: enabled ? '\x1b[0m' : '',
    bold: enabled ? '\x1b[1m' : '',
    dim: enabled ? '\x1b[2m' : '',
    red: enabled ? '\x1b[31m' : '',
    green: enabled ? '\x1b[32m' : '',
    yellow: enabled ? '\x1b[33m' : '',
    blue: enabled ? '\x1b[34m' : '',
    magenta: enabled ? '\x1b[35m' : '',
    cyan: enabled ? '\x1b[36m' : '',
    white: enabled ? '\x1b[37m' : '',
    gray: enabled ? '\x1b[90m' : '',
    bgRed: enabled ? '\x1b[41m\x1b[37m' : '',
    bgGreen: enabled ? '\x1b[42m\x1b[30m' : '',
  };
}

// -----------------------------------------------------------------------------
// Tier & Feature Configuration
// -----------------------------------------------------------------------------

const TIER_CONFIG = [
  {
    tier: 1,
    id: 'tier1',
    name: 'Tier 1: Feature Coverage (F1-F16)',
    dirName: 'tier1-features',
    description: 'Unit & component level acceptance criteria verification'
  },
  {
    tier: 2,
    id: 'tier2',
    name: 'Tier 2: Boundary & Corner Cases',
    dirName: 'tier2-boundaries',
    description: 'Boundary value analysis, stress tests, empty/extreme limits'
  },
  {
    tier: 3,
    id: 'tier3',
    name: 'Tier 3: Cross-Feature Interactions',
    dirName: 'tier3-combinations',
    description: 'Pairwise combinations and cross-feature contract tests'
  },
  {
    tier: 4,
    id: 'tier4',
    name: 'Tier 4: Real-World Scenarios',
    dirName: 'tier4-scenarios',
    description: 'End-to-end user journeys, visual & interactive audits'
  }
];

function findTestFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
      if (entry.isFile() && (entry.name.endsWith('.test.js') || entry.name.endsWith('.spec.js'))) {
        files.push(path.join(dirPath, entry.name));
      }
    }
    return files.sort();
  } catch (err) {
    return [];
  }
}

// -----------------------------------------------------------------------------
// Master Execution Routine
// -----------------------------------------------------------------------------

async function run() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    process.exit(0);
  }

  const s = createStyler(options.noColor);
  harness.setRunnerActive(true);

  const startTime = Date.now();
  const projectRoot = path.resolve(__dirname, '../..');

  // Determine tiers to scan
  const activeTiers = TIER_CONFIG.filter(cfg => {
    if (options.tier === 'all') return true;
    return String(cfg.tier) === String(options.tier);
  });

  if (!options.json) {
    console.log(`\n${s.cyan}${s.bold}================================================================================${s.reset}`);
    console.log(`${s.cyan}${s.bold}                    AVANI LANDING PAGES E2E TEST RUNNER                         ${s.reset}`);
    console.log(`${s.cyan}${s.bold}================================================================================${s.reset}`);
    console.log(`${s.gray}Working Directory: ${projectRoot}${s.reset}`);
    console.log(`${s.gray}Selected Tier(s):  ${options.tier.toUpperCase()}${options.feature ? ` | Feature Filter: ${options.feature}` : ''}${s.reset}`);
    console.log(`${s.gray}Flags:             verbose=${options.verbose}, bail=${options.bail}, json=${options.json}${s.reset}\n`);
  }

  // Collect test files
  const testFilesQueue = [];
  if (options.files.length > 0) {
    for (const f of options.files) {
      if (fs.existsSync(f)) {
        const tier = harness.inferTier(null, f);
        testFilesQueue.push({ filePath: f, tier });
      } else {
        if (!options.json) {
          console.warn(`${s.yellow}[WARN] Specified test file not found: ${f}${s.reset}`);
        }
      }
    }
  } else {
    for (const tierCfg of activeTiers) {
      const tierDir = path.join(__dirname, tierCfg.dirName);
      if (!fs.existsSync(tierDir)) {
        if (!options.json && options.verbose) {
          console.log(`${s.gray}[Tier ${tierCfg.tier}] Directory not found: ${path.relative(projectRoot, tierDir)} (skipping)${s.reset}`);
        }
        continue;
      }

      const files = findTestFiles(tierDir);
      if (files.length === 0) {
        if (!options.json && options.verbose) {
          console.log(`${s.gray}[Tier ${tierCfg.tier}] No test files found in ${path.relative(projectRoot, tierDir)}${s.reset}`);
        }
        continue;
      }

      for (const file of files) {
        testFilesQueue.push({ filePath: file, tier: tierCfg.tier });
      }
    }
  }

  // Aggregation state
  const aggregatedResults = [];
  const tierMetrics = {
    1: { name: 'Tier 1: Feature Coverage (F1-F16)', total: 0, passed: 0, failed: 0, skipped: 0, durationMs: 0 },
    2: { name: 'Tier 2: Boundary & Corner Cases', total: 0, passed: 0, failed: 0, skipped: 0, durationMs: 0 },
    3: { name: 'Tier 3: Cross-Feature Interactions', total: 0, passed: 0, failed: 0, skipped: 0, durationMs: 0 },
    4: { name: 'Tier 4: Real-World Scenarios', total: 0, passed: 0, failed: 0, skipped: 0, durationMs: 0 }
  };

  const featureMetrics = {};
  for (let i = 1; i <= 16; i++) {
    const key = `F${i}`;
    featureMetrics[key] = {
      name: harness.FEATURES[key] || `Feature ${i}`,
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0
    };
  }
  featureMetrics['General'] = {
    name: 'General / Cross-Cutting Scenarios',
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0
  };

  const failures = [];
  let bailedOut = false;

  if (testFilesQueue.length === 0 && !options.json) {
    console.log(`${s.yellow}No test files found matching criteria.${s.reset}`);
    console.log(`${s.gray}Test directories checked: tests/e2e/tier1-features/, tests/e2e/tier2-boundaries/, tests/e2e/tier3-combinations/, tests/e2e/tier4-scenarios/${s.reset}\n`);
  }

  // Execute test files sequentially
  for (const item of testFilesQueue) {
    if (bailedOut) break;

    const relPath = path.relative(projectRoot, item.filePath);
    const fileStartTime = Date.now();

    // Prepare harness file context
    harness.clearRegisteredSuites();
    harness.setCurrentFileContext({ filePath: item.filePath, tier: item.tier });

    try {
      // Clear require cache to ensure fresh suite evaluation
      delete require.cache[require.resolve(item.filePath)];
      require(item.filePath);
    } catch (loadErr) {
      const diag = harness.extractDiagnostic(loadErr, item.filePath);
      const fakeTest = {
        title: `Load test file: ${relPath}`,
        fullTitle: `${relPath} > Load Error`,
        file: item.filePath,
        tier: item.tier,
        feature: harness.inferFeature(null, item.filePath),
        status: 'failed',
        durationMs: Date.now() - fileStartTime,
        error: diag
      };
      aggregatedResults.push(fakeTest);
      failures.push(fakeTest);

      if (!options.json) {
        console.log(`${s.red}${s.bold}FAIL${s.reset} ${relPath}`);
        console.log(`  ${s.red}Error loading test file: ${loadErr.message}${s.reset}\n`);
      }
      if (options.bail) {
        bailedOut = true;
        break;
      }
      continue;
    }

    // Filter tests by feature if requested
    const registeredSuites = harness.getRegisteredSuites();
    if (options.feature) {
      for (const suite of registeredSuites) {
        suite.tests = suite.tests.filter(t => t.feature === options.feature);
      }
    }

    // Run suites in this file
    const fileTestResults = await harness.runRegisteredSuites({
      bail: options.bail,
      onTestEnd: (testInst) => {
        if (options.verbose && !options.json) {
          const sym = testInst.status === 'passed' ? `${s.green}✓${s.reset}` :
                      testInst.status === 'failed' ? `${s.red}✗${s.reset}` : `${s.yellow}○${s.reset}`;
          console.log(`    ${sym} [${testInst.feature}] ${testInst.title} ${s.gray}(${testInst.durationMs}ms)${s.reset}`);
          if (testInst.status === 'failed' && testInst.error) {
            console.log(`      ${s.red}${testInst.error.message}${s.reset}`);
            if (testInst.error.location) {
              console.log(`      ${s.gray}at ${testInst.error.location}${s.reset}`);
            }
          }
        }
      }
    });

    const fileDuration = Date.now() - fileStartTime;
    const filePassed = fileTestResults.filter(t => t.status === 'passed').length;
    const fileFailed = fileTestResults.filter(t => t.status === 'failed').length;
    const fileSkipped = fileTestResults.filter(t => t.status === 'skipped').length;

    // Print file outcome in non-json mode
    if (!options.json && fileTestResults.length > 0) {
      if (fileFailed === 0) {
        console.log(`${s.green}${s.bold}PASS${s.reset} ${relPath} ${s.gray}(${fileTestResults.length} tests, ${fileDuration}ms)${s.reset}`);
      } else {
        console.log(`${s.red}${s.bold}FAIL${s.reset} ${relPath} ${s.gray}(${filePassed} passed, ${fileFailed} failed, ${fileDuration}ms)${s.reset}`);
      }
    }

    // Accumulate metrics
    for (const testInst of fileTestResults) {
      aggregatedResults.push(testInst);

      const tierKey = testInst.tier || item.tier || 1;
      if (tierMetrics[tierKey]) {
        tierMetrics[tierKey].total++;
        tierMetrics[tierKey].durationMs += testInst.durationMs;
        if (testInst.status === 'passed') tierMetrics[tierKey].passed++;
        else if (testInst.status === 'failed') tierMetrics[tierKey].failed++;
        else if (testInst.status === 'skipped') tierMetrics[tierKey].skipped++;
      }

      const featKey = testInst.feature || 'General';
      if (!featureMetrics[featKey]) {
        featureMetrics[featKey] = {
          name: harness.FEATURES[featKey] || featKey,
          total: 0,
          passed: 0,
          failed: 0,
          skipped: 0
        };
      }
      featureMetrics[featKey].total++;
      if (testInst.status === 'passed') featureMetrics[featKey].passed++;
      else if (testInst.status === 'failed') featureMetrics[featKey].failed++;
      else if (testInst.status === 'skipped') featureMetrics[featKey].skipped++;

      if (testInst.status === 'failed') {
        failures.push(testInst);
        if (options.bail) {
          bailedOut = true;
          break;
        }
      }
    }
  }

  const totalDuration = Date.now() - startTime;
  const totalTests = aggregatedResults.length;
  const passedTests = aggregatedResults.filter(t => t.status === 'passed').length;
  const failedTests = aggregatedResults.filter(t => t.status === 'failed').length;
  const skippedTests = aggregatedResults.filter(t => t.status === 'skipped').length;
  const passRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 1000) / 10 : 0;
  const exitCode = failedTests > 0 ? 1 : 0;

  // Prepare full JSON report
  const resultsPayload = {
    timestamp: new Date().toISOString(),
    command: process.argv.join(' '),
    config: {
      tier: options.tier,
      feature: options.feature,
      verbose: options.verbose,
      bail: options.bail,
      totalFilesScanned: testFilesQueue.length
    },
    summary: {
      total: totalTests,
      passed: passedTests,
      failed: failedTests,
      skipped: skippedTests,
      durationMs: totalDuration,
      passRate: passRate,
      status: failedTests === 0 ? 'PASSED' : 'FAILED',
      exitCode
    },
    breakdownByTier: tierMetrics,
    breakdownByFeature: featureMetrics,
    failures: failures.map(f => ({
      fullTitle: f.fullTitle,
      file: f.file ? path.relative(projectRoot, f.file) : 'unknown',
      tier: f.tier,
      feature: f.feature,
      durationMs: f.durationMs,
      error: f.error
    })),
    tests: aggregatedResults.map(t => ({
      title: t.title,
      fullTitle: t.fullTitle,
      file: t.file ? path.relative(projectRoot, t.file) : 'unknown',
      tier: t.tier,
      feature: t.feature,
      status: t.status,
      durationMs: t.durationMs,
      error: t.error ? t.error.message : null
    }))
  };

  // Write results.json to disk
  try {
    const resultsDir = path.dirname(options.resultsPath);
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    fs.writeFileSync(options.resultsPath, JSON.stringify(resultsPayload, null, 2), 'utf8');
  } catch (writeErr) {
    if (!options.json) {
      console.warn(`${s.yellow}[WARN] Could not write results.json: ${writeErr.message}${s.reset}`);
    }
  }

  // Print results
  if (options.json) {
    console.log(JSON.stringify(resultsPayload, null, 2));
  } else {
    // Print failure diagnostics if any
    if (failures.length > 0) {
      console.log(`\n${s.red}${s.bold}================================================================================${s.reset}`);
      console.log(`${s.red}${s.bold}                             FAILURES & DIAGNOSTICS                             ${s.reset}`);
      console.log(`${s.red}${s.bold}================================================================================${s.reset}\n`);

      failures.forEach((fail, idx) => {
        console.log(`${s.red}${s.bold}${idx + 1}) ${fail.fullTitle}${s.reset}`);
        console.log(`   ${s.gray}Tier: ${fail.tier} | Feature: ${fail.feature} | File: ${fail.file ? path.relative(projectRoot, fail.file) : 'unknown'}${s.reset}`);
        if (fail.error) {
          console.log(`   ${s.red}${fail.error.message}${s.reset}`);
          if (fail.error.location) {
            console.log(`   ${s.gray}Location: ${fail.error.location}${s.reset}`);
          }
          if (fail.error.expected !== undefined || fail.error.actual !== undefined) {
            console.log(`   ${s.gray}Expected: ${JSON.stringify(fail.error.expected)}${s.reset}`);
            console.log(`   ${s.gray}Actual:   ${JSON.stringify(fail.error.actual)}${s.reset}`);
          }
        }
        console.log('');
      });
    }

    // Print Tier Breakdown
    console.log(`\n${s.cyan}${s.bold}--------------------------------------------------------------------------------${s.reset}`);
    console.log(`${s.cyan}${s.bold}                                 TIER BREAKDOWN                                 ${s.reset}`);
    console.log(`${s.cyan}${s.bold}--------------------------------------------------------------------------------${s.reset}`);
    for (const tKey of [1, 2, 3, 4]) {
      const tm = tierMetrics[tKey];
      const tierRate = tm.total > 0 ? `${Math.round((tm.passed / tm.total) * 1000) / 10}%` : 'N/A';
      const tierColor = tm.failed > 0 ? s.red : (tm.total > 0 ? s.green : s.gray);
      console.log(`  ${s.bold}Tier ${tKey}${s.reset}: ${tm.name.padEnd(42)} ${tierColor}${tm.passed}/${tm.total} passed (${tierRate})${s.reset} ${s.gray}[${tm.durationMs}ms]${s.reset}`);
    }

    // Print Feature Breakdown (only features with tests, or all if verbose)
    console.log(`\n${s.cyan}${s.bold}--------------------------------------------------------------------------------${s.reset}`);
    console.log(`${s.cyan}${s.bold}                                FEATURE BREAKDOWN                               ${s.reset}`);
    console.log(`${s.cyan}${s.bold}--------------------------------------------------------------------------------${s.reset}`);
    const featKeys = Object.keys(featureMetrics).filter(k => k !== 'General');
    let hasFeatureData = false;
    for (const fKey of featKeys) {
      const fm = featureMetrics[fKey];
      if (fm.total > 0 || options.verbose) {
        hasFeatureData = true;
        const fStatus = fm.failed > 0 ? `${s.red}[FAIL]${s.reset}` : (fm.total > 0 ? `${s.green}[PASS]${s.reset}` : `${s.gray}[EMPTY]${s.reset}`);
        const fRate = fm.total > 0 ? `(${Math.round((fm.passed / fm.total) * 100)}%)` : '';
        console.log(`  ${fKey.padEnd(5)} ${fm.name.padEnd(36)} ${fStatus} ${String(fm.passed).padStart(3)} / ${String(fm.total).padEnd(3)} ${fRate}`);
      }
    }
    if (!hasFeatureData) {
      console.log(`  ${s.gray}No feature-tagged tests executed yet.${s.reset}`);
    }

    if (featureMetrics['General'].total > 0) {
      const gm = featureMetrics['General'];
      const gStatus = gm.failed > 0 ? `${s.red}[FAIL]${s.reset}` : `${s.green}[PASS]${s.reset}`;
      console.log(`  ${'GEN'.padEnd(5)} ${gm.name.padEnd(36)} ${gStatus} ${String(gm.passed).padStart(3)} / ${String(gm.total).padEnd(3)}`);
    }

    // Print Master Summary Banner
    console.log(`\n${s.cyan}${s.bold}================================================================================${s.reset}`);
    console.log(`${s.cyan}${s.bold}                                  FINAL SUMMARY                                 ${s.reset}`);
    console.log(`${s.cyan}${s.bold}================================================================================${s.reset}`);
    const summaryBadge = failedTests > 0
      ? `${s.bgRed} FAILED ${s.reset}`
      : `${s.bgGreen} PASSED ${s.reset}`;
    console.log(`  Overall Status:  ${summaryBadge}`);
    console.log(`  Total Tests:     ${totalTests}`);
    console.log(`  Passed:          ${s.green}${passedTests}${s.reset}`);
    console.log(`  Failed:          ${failedTests > 0 ? `${s.red}${failedTests}${s.reset}` : '0'}`);
    console.log(`  Skipped:         ${skippedTests > 0 ? `${s.yellow}${skippedTests}${s.reset}` : '0'}`);
    console.log(`  Pass Rate:       ${s.bold}${passRate}%${s.reset}`);
    console.log(`  Duration:        ${(totalDuration / 1000).toFixed(2)}s`);
    console.log(`  Report Saved:    ${s.cyan}${path.relative(projectRoot, options.resultsPath)}${s.reset}`);
    console.log(`${s.cyan}${s.bold}================================================================================${s.reset}\n`);
  }

  process.exit(exitCode);
}

run().catch((fatalErr) => {
  console.error('\nFatal Error in Test Runner:\n', fatalErr);
  process.exit(1);
});
