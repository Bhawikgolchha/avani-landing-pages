import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

test('Dependency Graph, Resolution & Bundle Size Oracle', async (t) => {
  await t.test('Test 1: Core 3D, Animation & Smooth Scroll Resolution', async () => {
    // 1. Three.js
    const three = await import('three');
    assert.strictEqual(three.REVISION, '160', 'Three.js must resolve to revision 160');

    // 2. React Three Fiber
    const r3f = await import('@react-three/fiber');
    assert.ok(r3f.Canvas, 'R3F Canvas export must be available');
    assert.ok(r3f.addEffect, 'R3F addEffect must be available');

    // 3. Drei
    const drei = await import('@react-three/drei');
    assert.ok(Object.keys(drei).length > 50, 'Drei must provide comprehensive component suite');

    // 4. GSAP & ScrollTrigger
    const gsap = (await import('gsap')).default;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger.js');
    assert.strictEqual(gsap.version, '3.15.1', 'GSAP must resolve to version 3.15.1');
    assert.strictEqual(ScrollTrigger.version, '3.15.1', 'ScrollTrigger version must match GSAP version exactly');

    // 5. Lenis
    const Lenis = (await import('lenis')).default;
    assert.ok(Lenis, 'Lenis constructor must resolve cleanly');
  });

  await t.test('Test 2: Peer dependency health check via npm ls', () => {
    // Execute npm ls --json to inspect dependency graph
    const output = execSync('npm ls --json', { encoding: 'utf-8', cwd: process.cwd() });
    const tree = JSON.parse(output);

    assert.strictEqual(tree.name, 'avani-landing-pages', 'Project package name must match');
    assert.ok(tree.dependencies, 'Dependencies tree must be present');
    
    // Check that there are no problems array or unmet dependencies reported
    assert.strictEqual(
      tree.problems,
      undefined,
      `npm ls reported dependency problems: ${JSON.stringify(tree.problems)}`
    );
  });

  await t.test('Test 3: Production bundle size validation', async () => {
    const buildManifestPath = path.resolve(process.cwd(), '.next/build-manifest.json');
    
    // Allow up to 10s in case a concurrent process was finishing a build
    let found = false;
    for (let i = 0; i < 20; i++) {
      if (fs.existsSync(buildManifestPath)) {
        found = true;
        break;
      }
      await new Promise((r) => setTimeout(r, 500));
    }
    if (!found) {
      execSync('npm run build', { cwd: process.cwd() });
    }

    assert.ok(fs.existsSync(buildManifestPath), '.next/build-manifest.json must exist from production build');

    const manifest = JSON.parse(fs.readFileSync(buildManifestPath, 'utf-8'));
    const chunksDir = path.resolve(process.cwd(), '.next/static/chunks');

    // Verify chunk files exist and measure sizes
    const chunkFiles = fs.readdirSync(chunksDir).filter((f) => f.endsWith('.js'));
    assert.ok(chunkFiles.length > 0, 'Production build must emit JS chunk files');

    for (const chunk of chunkFiles) {
      const stats = fs.statSync(path.join(chunksDir, chunk));
      // No individual client chunk in initial scaffolding should exceed 350 KB uncompressed
      assert.ok(
        stats.size < 350 * 1024,
        `Chunk ${chunk} (${(stats.size / 1024).toFixed(1)} KB) exceeds 350 KB threshold`
      );
    }

    // Verify first load JS shared by all routes is within healthy bounds (< 300 KB uncompressed)
    const rootChunks = manifest.pages['/_app'] || [];
    let totalAppChunksSize = 0;
    for (const file of rootChunks) {
      const fullPath = path.resolve(process.cwd(), '.next', file);
      if (fs.existsSync(fullPath)) {
        totalAppChunksSize += fs.statSync(fullPath).size;
      }
    }

    assert.ok(
      totalAppChunksSize < 300 * 1024,
      `Total shared root chunks size (${(totalAppChunksSize / 1024).toFixed(1)} KB) exceeds 300 KB budget`
    );
  });

  await t.test('Test 4: Dead package audit for @studio-freight/lenis', () => {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    // Check if both @studio-freight/lenis and lenis are present in package.json
    const hasStudioFreight = Boolean(pkg.dependencies['@studio-freight/lenis']);
    const hasLenis = Boolean(pkg.dependencies['lenis']);

    // Check if @studio-freight/lenis is actually imported in src/
    const srcGrep = execSync('grep -rn "@studio-freight" src/ || true', {
      encoding: 'utf-8',
      cwd: process.cwd(),
    }).trim();

    // Finding: @studio-freight/lenis is in dependencies to satisfy SCOPE.md, but src/ uses 'lenis'
    assert.strictEqual(
      srcGrep,
      '',
      '@studio-freight/lenis is not imported in src/, confirming modern lenis is used'
    );
    assert.strictEqual(hasLenis, true, 'Modern lenis must be installed and used');
  });
});
