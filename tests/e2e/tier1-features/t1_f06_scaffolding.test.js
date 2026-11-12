/**
 * Tier 1 Feature Coverage: F6 — Next.js 14 Scaffolding
 * 
 * Verifies the foundational application stack: Next.js 14 App Router, TypeScript,
 * Tailwind CSS, Three.js, React Three Fiber, Drei, GSAP, Lenis, and directory structure.
 */

const path = require('node:path');
const fs = require('node:fs');
const {
  describe,
  test,
  it,
  assertFileExists,
  assertFileNonEmpty,
  assertFileContains,
  assertJsonMatches,
  assert
} = require('../harness');

const PKG_FILE = path.resolve(process.cwd(), 'package.json');
const TSCONFIG_FILE = path.resolve(process.cwd(), 'tsconfig.json');
const TAILWIND_FILE = path.resolve(process.cwd(), 'tailwind.config.ts');
const NEXT_CONFIG_FILE = path.resolve(process.cwd(), 'next.config.mjs');
const ROOT_LAYOUT = path.resolve(process.cwd(), 'src/app/layout.tsx');
const GLOBALS_CSS = path.resolve(process.cwd(), 'src/app/globals.css');

describe('F6: Next.js 14 Scaffolding', { feature: 'F6', tier: 1 }, () => {
  test('F6.1: package.json declares Next.js 14 and React 18 dependencies', () => {
    assertFileExists(PKG_FILE, 'package.json must exist');
    const pkg = assertJsonMatches(PKG_FILE, {
      dependencies: {
        next: (val) => typeof val === 'string' && val.includes('14.'),
        react: (val) => typeof val === 'string' && (val.includes('18.') || val.includes('^18')),
        'react-dom': (val) => typeof val === 'string' && (val.includes('18.') || val.includes('^18'))
      }
    }, 'package.json must declare Next.js 14 and React 18');

    assert.ok(pkg.scripts.build, 'package.json must define build script');
    assert.ok(pkg.scripts.dev, 'package.json must define dev script');
  });

  test('F6.2: package.json includes 3D, WebGL, and animation libraries', () => {
    const pkg = JSON.parse(fs.readFileSync(PKG_FILE, 'utf8'));
    const deps = pkg.dependencies || {};

    const requiredLibs = [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'gsap',
      'lenis'
    ];

    for (const lib of requiredLibs) {
      assert.ok(deps[lib], `package.json must include animation/3D library: "${lib}"`);
    }
  });

  test('F6.3: tsconfig.json configures TypeScript compiler and @/* path alias', () => {
    assertFileExists(TSCONFIG_FILE, 'tsconfig.json must exist');
    const tsconfig = assertJsonMatches(TSCONFIG_FILE, {
      compilerOptions: {
        paths: (val) => val && val['@/*'] && Array.isArray(val['@/*'])
      }
    }, 'tsconfig.json must configure compilerOptions.paths with @/* alias');

    const paths = tsconfig.compilerOptions.paths['@/*'];
    assert.ok(
      paths.some(p => p.includes('src/')),
      '@/* alias must resolve to ./src/*'
    );
  });

  test('F6.4: tailwind.config.ts configures content paths for src directory', () => {
    assertFileExists(TAILWIND_FILE, 'tailwind.config.ts must exist');
    assertFileContains(
      TAILWIND_FILE,
      './src/',
      'tailwind.config.ts must scan src/ directory for class utilities'
    );
  });

  test('F6.5: Next.js App Router core files exist (layout.tsx & globals.css)', () => {
    assertFileExists(ROOT_LAYOUT, 'src/app/layout.tsx must exist');
    assertFileExists(GLOBALS_CSS, 'src/app/globals.css must exist');

    assertFileContains(
      GLOBALS_CSS,
      ['@tailwind base', '@tailwind components', '@tailwind utilities'],
      'globals.css must import standard Tailwind directives'
    );
  });

  test('F6.6: next.config.mjs exists and configures Next.js runtime settings', () => {
    assertFileExists(NEXT_CONFIG_FILE, 'next.config.mjs must exist');
    const content = fs.readFileSync(NEXT_CONFIG_FILE, 'utf8');
    assert.ok(
      content.includes('nextConfig') && content.includes('export default'),
      'next.config.mjs must define and export nextConfig'
    );
  });
});
