/**
 * Tier 1 Feature Coverage: F15 — Automated Build & Lint Gate
 * 
 * Verifies that automated build, TypeScript compilation, and linting scripts
 * are configured in package.json and execute cleanly with exit code 0.
 */

const path = require('node:path');
const fs = require('node:fs');
const {
  describe,
  test,
  it,
  assertFileExists,
  assertJsonMatches,
  assertExitCode,
  assert
} = require('../harness');

const PKG_FILE = path.resolve(process.cwd(), 'package.json');
const ESLINT_FILE = path.resolve(process.cwd(), '.eslintrc.json');
const TSCONFIG_FILE = path.resolve(process.cwd(), 'tsconfig.json');

describe('F15: Automated Build & Lint Gate', { feature: 'F15', tier: 1 }, () => {
  test('F15.1: package.json specifies build and lint scripts', () => {
    assertFileExists(PKG_FILE, 'package.json must exist');
    assertJsonMatches(PKG_FILE, {
      scripts: {
        build: 'next build',
        lint: 'next lint'
      }
    }, 'package.json must declare "build": "next build" and "lint": "next lint"');
  });

  test('F15.2: ESLint configuration file (.eslintrc.json) exists and extends Next.js core configs', () => {
    assertFileExists(ESLINT_FILE, '.eslintrc.json must exist');
    assertJsonMatches(ESLINT_FILE, {
      extends: 'next/core-web-vitals'
    }, '.eslintrc.json must extend next/core-web-vitals');
  });

  test('F15.3: TypeScript compiler check (tsc --noEmit) passes with exit code 0', () => {
    assertFileExists(TSCONFIG_FILE, 'tsconfig.json must exist');
    const result = assertExitCode('npx tsc --noEmit', 0, {
      timeout: 30000,
      cwd: process.cwd()
    });
    assert.strictEqual(result.exitCode, 0, 'npx tsc --noEmit must pass with exit code 0');
  });

  test('F15.4: ESLint execution (npm run lint) passes with exit code 0 and no errors', () => {
    const result = assertExitCode('npm run lint', 0, {
      timeout: 30000,
      cwd: process.cwd()
    });
    assert.strictEqual(result.exitCode, 0, 'npm run lint must exit with code 0');
    assert.ok(
      result.stdout.includes('No ESLint warnings or errors') || !result.stdout.includes('Error'),
      'Lint output must confirm no lint errors'
    );
  });

  test('F15.5: Next.js configuration and environment definitions exist', () => {
    const nextConfig = path.resolve(process.cwd(), 'next.config.mjs');
    const nextEnv = path.resolve(process.cwd(), 'next-env.d.ts');

    assertFileExists(nextConfig, 'next.config.mjs must exist');
    assertFileExists(nextEnv, 'next-env.d.ts must exist');
  });
});
