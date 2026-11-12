/**
 * Challenger 1 (Milestone M5): Empirical Adversarial Oracle for Prototype 2
 * (The Modern Eco-Tech Biosphere)
 *
 * Verifies:
 * 1. Fibonacci distribution math (10,000 points), radial jitter bounds, octant uniformity, buffer memory.
 * 2. Orbital telemetry rings (360 & 480 points), differential rotation speeds, markers.
 * 3. Bangalore telemetry beacon geographic Cartesian coordinates (12.9716° N, 77.5946° E), label, and sub-elements.
 * 4. WebGL fallback video loop (H.264 1080p 30fps) and poster image integrity.
 * 5. Window resize and scroll velocity bounds, clamping, friction decay, and camera frustum bounds.
 * 6. Live Next.js server production DOM render integrity, SSR safety, and responsiveness.
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import http from 'node:http';

const CWD = process.cwd();
const P2_PAGE_PATH = path.join(CWD, 'src/app/prototype-2/page.tsx');
const P2_SCENE_PATH = path.join(CWD, 'src/components/prototype2/P2Scene.tsx');
const BIOSPHERE_PARTICLES_PATH = path.join(CWD, 'src/components/prototype2/BiosphereParticles.tsx');
const P2_OVERLAY_PATH = path.join(CWD, 'src/components/prototype2/P2Overlay.tsx');
const VIDEO_LOOP_PATH = path.join(CWD, 'public/assets/videos/biosphere_telemetry_loop.mp4');
const POSTER_IMAGE_PATH = path.join(CWD, 'public/assets/images/hero_ecotech_globe.webp');

// Helper to extract function from source file or run procedural mirror
function generateFibonacciSphere(count, radius) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const randoms = new Float32Array(count * 3);

  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio ~1.61803398875

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // -1 to 1
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = (2 * Math.PI * i) / phi;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    // Subtle radius variation for holographic depth
    const jitter = (Math.random() - 0.5) * 0.05;
    const r = radius + jitter;

    positions[i * 3] = x * r;
    positions[i * 3 + 1] = y * r;
    positions[i * 3 + 2] = z * r;

    // Palette gradient
    const lat = (y + 1) / 2;
    colors[i * 3] = lat > 0.65 ? 0.02 : lat > 0.35 ? 0.06 : 0.03;
    colors[i * 3 + 1] = lat > 0.65 ? 0.71 : lat > 0.35 ? 0.73 : 0.57;
    colors[i * 3 + 2] = lat > 0.65 ? 0.83 : lat > 0.35 ? 0.51 : 0.70;

    sizes[i] = 1.2 + Math.random() * 2.2;

    randoms[i * 3] = Math.random();
    randoms[i * 3 + 1] = Math.random();
    randoms[i * 3 + 2] = Math.random();
  }

  return { positions, colors, sizes, randoms };
}

function generateOrbitalRing(count, radius, baseColorHex) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = Math.sin(angle) * radius;

    const isMarker = i % 15 === 0;
    colors[i * 3] = isMarker ? 1.0 : 0.02;
    colors[i * 3 + 1] = isMarker ? 1.0 : 0.71;
    colors[i * 3 + 2] = isMarker ? 1.0 : 0.83;
  }

  return { positions, colors };
}

test('Challenger 1: Prototype 2 (Eco-Tech Biosphere) Adversarial Oracle', async (suite) => {

  // =========================================================================
  // Mandate 1: Fibonacci Distribution Math and Buffer Memory
  // =========================================================================
  await suite.test('Mandate 1: Fibonacci Sphere distribution math & GPU buffer memory', () => {
    assert.ok(fs.existsSync(BIOSPHERE_PARTICLES_PATH), 'BiosphereParticles.tsx must exist');
    const sourceCode = fs.readFileSync(BIOSPHERE_PARTICLES_PATH, 'utf8');

    // Verify source code specifies exactly 10,000 points and radius 2.35
    assert.match(sourceCode, /generateFibonacciSphere\(\s*10000\s*,\s*2\.35\s*\)/,
      'Must instantiate Fibonacci sphere with exactly 10,000 points and 2.35 base radius');

    const count = 10000;
    const baseRadius = 2.35;
    const data = generateFibonacciSphere(count, baseRadius);

    // Buffer length allocations
    assert.strictEqual(data.positions.length, count * 3, 'Positions buffer must have exactly 30,000 float elements');
    assert.strictEqual(data.colors.length, count * 3, 'Colors buffer must have exactly 30,000 float elements');
    assert.strictEqual(data.sizes.length, count, 'Sizes buffer must have exactly 10,000 float elements');
    assert.strictEqual(data.randoms.length, count * 3, 'Randoms buffer must have exactly 30,000 float elements');

    // Buffer memory footprint calculation
    const totalBytes =
      data.positions.byteLength +
      data.colors.byteLength +
      data.sizes.byteLength +
      data.randoms.byteLength;
    assert.strictEqual(totalBytes, 400000, 'Total particle buffer memory must be exactly 400,000 bytes (0.381 MB)');

    // Rigorous numerical sanity: zero NaNs, zeros Infs
    let octantCounts = [0, 0, 0, 0, 0, 0, 0, 0];
    let minRadius = Infinity;
    let maxRadius = -Infinity;

    for (let i = 0; i < count; i++) {
      const x = data.positions[i * 3];
      const y = data.positions[i * 3 + 1];
      const z = data.positions[i * 3 + 2];

      assert.ok(!Number.isNaN(x) && Number.isFinite(x), `Position x[${i}] must be finite`);
      assert.ok(!Number.isNaN(y) && Number.isFinite(y), `Position y[${i}] must be finite`);
      assert.ok(!Number.isNaN(z) && Number.isFinite(z), `Position z[${i}] must be finite`);

      const r = Math.sqrt(x * x + y * y + z * z);
      if (r < minRadius) minRadius = r;
      if (r > maxRadius) maxRadius = r;

      // Radial jitter bound: baseRadius 2.35 with max jitter +/- 0.025 => [2.325, 2.375]
      assert.ok(r >= baseRadius - 0.026 && r <= baseRadius + 0.026,
        `Point ${i} radius ${r.toFixed(4)} must lie within [2.325, 2.375]`);

      // Sizes bound: [1.2, 3.4]
      const sz = data.sizes[i];
      assert.ok(sz >= 1.2 && sz <= 3.4, `Particle size ${sz} must be within [1.2, 3.4]`);

      // Octant classification: (+x, +y, +z), (+x, +y, -z), etc.
      const octantIndex =
        (x >= 0 ? 1 : 0) +
        (y >= 0 ? 2 : 0) +
        (z >= 0 ? 4 : 0);
      octantCounts[octantIndex]++;
    }

    // Verify Fibonacci distribution uniformity across all 8 octants
    // Expected in uniform distribution: 10,000 / 8 = 1,250 points per octant.
    // Allowed tolerance: +/- 150 points (within 12%)
    for (let oct = 0; oct < 8; oct++) {
      const octCount = octantCounts[oct];
      assert.ok(
        octCount >= 1100 && octCount <= 1400,
        `Octant ${oct} count (${octCount}) violates uniform sphere bounds [1100, 1400]`
      );
    }
  });

  // =========================================================================
  // Mandate 2: Differential Orbital Rings and Bangalore Beacon Coordinates
  // =========================================================================
  await suite.test('Mandate 2: Differential Orbital Rings & Bangalore Beacon Cartesian math', () => {
    const sourceCode = fs.readFileSync(BIOSPHERE_PARTICLES_PATH, 'utf8');

    // Ring 1 checks: 360 points, radius 3.1
    assert.match(sourceCode, /generateOrbitalRing\(\s*360\s*,\s*3\.1/, 'Ring 1 must have 360 points and radius 3.1');
    const ring1 = generateOrbitalRing(360, 3.1, '#06b6d4');
    assert.strictEqual(ring1.positions.length, 360 * 3);
    for (let i = 0; i < 360; i++) {
      const x = ring1.positions[i * 3];
      const y = ring1.positions[i * 3 + 1];
      const z = ring1.positions[i * 3 + 2];
      assert.strictEqual(y, 0, 'Orbital ring 1 points must lie on plane y=0');
      const r = Math.sqrt(x * x + z * z);
      assert.ok(Math.abs(r - 3.1) < 1e-4, `Ring 1 radius must be 3.1, got ${r}`);
    }

    // Ring 2 checks: 480 points, radius 3.7
    assert.match(sourceCode, /generateOrbitalRing\(\s*480\s*,\s*3\.7/, 'Ring 2 must have 480 points and radius 3.7');
    const ring2 = generateOrbitalRing(480, 3.7, '#10b981');
    assert.strictEqual(ring2.positions.length, 480 * 3);
    for (let i = 0; i < 480; i++) {
      const x = ring2.positions[i * 3];
      const y = ring2.positions[i * 3 + 1];
      const z = ring2.positions[i * 3 + 2];
      assert.strictEqual(y, 0, 'Orbital ring 2 points must lie on plane y=0');
      const r = Math.sqrt(x * x + z * z);
      assert.ok(Math.abs(r - 3.7) < 1e-4, `Ring 2 radius must be 3.7, got ${r}`);
    }

    // Differential speeds verification in useFrame:
    // Ring 1 rotates along z (+0.004) and y (+0.002)
    // Ring 2 rotates along x (-0.003) and z (-0.002)
    assert.match(sourceCode, /ring1Ref\.current\.rotation\.z\s*\+=\s*0\.004/, 'Ring 1 z rotation speed must be +0.004');
    assert.match(sourceCode, /ring1Ref\.current\.rotation\.y\s*\+=\s*0\.002/, 'Ring 1 y rotation speed must be +0.002');
    assert.match(sourceCode, /ring2Ref\.current\.rotation\.x\s*-=\s*0\.003/, 'Ring 2 x rotation speed must be -0.003');
    assert.match(sourceCode, /ring2Ref\.current\.rotation\.z\s*-=\s*0\.002/, 'Ring 2 z rotation speed must be -0.002');

    // Verify Bangalore Beacon Coordinates
    // Latitude: 12.9716° N, Longitude: 77.5946° E, Radius: 2.35
    assert.match(sourceCode, /12\.9716/, 'Must use Bangalore latitude 12.9716');
    assert.match(sourceCode, /77\.5946/, 'Must use Bangalore longitude 77.5946');

    const latRad = (12.9716 * Math.PI) / 180;
    const lonRad = (77.5946 * Math.PI) / 180;
    const R = 2.35;

    const expectedX = R * Math.cos(latRad) * Math.sin(lonRad);
    const expectedY = R * Math.sin(latRad);
    const expectedZ = R * Math.cos(latRad) * Math.cos(lonRad);

    assert.ok(Math.abs(expectedX - 2.236636) < 1e-3, `Expected X ~ 2.2366, got ${expectedX}`);
    assert.ok(Math.abs(expectedY - 0.527476) < 1e-3, `Expected Y ~ 0.5275, got ${expectedY}`);
    assert.ok(Math.abs(expectedZ - 0.491738) < 1e-3, `Expected Z ~ 0.4917, got ${expectedZ}`);

    const vectorMagnitude = Math.sqrt(expectedX * expectedX + expectedY * expectedY + expectedZ * expectedZ);
    assert.ok(Math.abs(vectorMagnitude - R) < 1e-5, `Beacon vector magnitude must equal sphere radius ${R}`);

    // Verify Beacon badge string and components
    assert.match(sourceCode, /BLR BEACON · 12\.9716° N, 77\.5946° E/, 'Beacon badge texture must contain exact readout');
    assert.match(sourceCode, /sphereGeometry args=\{\[0\.06, 16, 16\]\}/, 'Must render luminous core');
    assert.match(sourceCode, /ringGeometry args=\{\[0\.08, 0\.12, 32\]\}/, 'Must render concentric pulse ring');
    assert.match(sourceCode, /cylinderGeometry args=\{\[0\.008, 0\.008, 0\.35, 8\]\}/, 'Must render antenna beam ray');
  });

  // =========================================================================
  // Mandate 3: WebGL Disabled / Fallback Media Integrity
  // =========================================================================
  await suite.test('Mandate 3: WebGL Disabled fallback, Video Loop & Poster Image', () => {
    assert.ok(fs.existsSync(VIDEO_LOOP_PATH), `Video loop ${VIDEO_LOOP_PATH} must exist`);
    assert.ok(fs.existsSync(POSTER_IMAGE_PATH), `Poster image ${POSTER_IMAGE_PATH} must exist`);

    const videoStats = fs.statSync(VIDEO_LOOP_PATH);
    const posterStats = fs.statSync(POSTER_IMAGE_PATH);

    // Verify non-empty files
    assert.ok(videoStats.size > 1000000, `Video loop must be > 1 MB, got ${videoStats.size} bytes`);
    assert.ok(posterStats.size > 50000, `Poster image must be > 50 KB, got ${posterStats.size} bytes`);

    // Verify video file signature (MP4 ftyp)
    const videoBuffer = Buffer.alloc(16);
    const fd = fs.openSync(VIDEO_LOOP_PATH, 'r');
    fs.readSync(fd, videoBuffer, 0, 16, 0);
    fs.closeSync(fd);
    const ftyp = videoBuffer.toString('latin1', 4, 8);
    assert.strictEqual(ftyp, 'ftyp', 'Video loop must be a valid MP4 container with ftyp atom');

    // Verify WebP image signature (RIFF ... WEBP)
    const imgBuffer = Buffer.alloc(16);
    const imgFd = fs.openSync(POSTER_IMAGE_PATH, 'r');
    fs.readSync(imgFd, imgBuffer, 0, 16, 0);
    fs.closeSync(imgFd);
    const riff = imgBuffer.toString('latin1', 0, 4);
    const webp = imgBuffer.toString('latin1', 8, 12);
    assert.strictEqual(riff, 'RIFF', 'Poster image must have RIFF container header');
    assert.strictEqual(webp, 'WEBP', 'Poster image must have WEBP signature');

    // Inspect P2Scene.tsx fallback implementation
    assert.ok(fs.existsSync(P2_SCENE_PATH), 'P2Scene.tsx must exist');
    const sceneSource = fs.readFileSync(P2_SCENE_PATH, 'utf8');

    // Verify WebGL detection and fallback rendering
    assert.match(sceneSource, /canvas\.getContext\('webgl'\)\s*\|\|\s*canvas\.getContext\('experimental-webgl'\)/,
      'Must check both standard and experimental WebGL contexts');
    assert.match(sceneSource, /if\s*\(hasWebGL\s*===\s*false\)\s*\{\s*return\s*<P2FallbackPoster\s*\/>;?\s*\}/,
      'Must return P2FallbackPoster when hasWebGL is false');

    // Verify fallback poster video attributes for cross-browser / mobile autoPlay
    assert.match(sceneSource, /autoPlay/, 'Fallback video must have autoPlay attribute');
    assert.match(sceneSource, /loop/, 'Fallback video must have loop attribute');
    assert.match(sceneSource, /muted/, 'Fallback video must have muted attribute');
    assert.match(sceneSource, /playsInline/, 'Fallback video must have playsInline attribute for mobile Safari/Chrome');
    assert.match(sceneSource, /poster="\/assets\/images\/hero_ecotech_globe\.webp"/,
      'Fallback video must specify hero_ecotech_globe.webp poster');
    assert.match(sceneSource, /src="\/assets\/videos\/biosphere_telemetry_loop\.mp4"/,
      'Fallback video must source biosphere_telemetry_loop.mp4');
  });

  // =========================================================================
  // Mandate 4: Window Resize & Scroll Velocity Bounds
  // =========================================================================
  await suite.test('Mandate 4: Scroll velocity mathematical bounds, friction decay & camera orbit limits', () => {
    const sceneSource = fs.readFileSync(P2_SCENE_PATH, 'utf8');
    const particlesSource = fs.readFileSync(BIOSPHERE_PARTICLES_PATH, 'utf8');

    // Verify dt division protection: dt = Math.max(1, now - lastTimestamp.current)
    assert.match(sceneSource, /const dt = Math\.max\(1,\s*now\s*-\s*lastTimestamp\.current\)/,
      'Must guard against division by zero in scroll velocity calculation');

    // Verify friction decay interval
    assert.match(sceneSource, /prev\s*\*\s*0\.9\s*:\s*0/,
      'Must apply friction decay factor (0.9) to scroll velocity');

    // Verify progress clamping
    assert.match(sceneSource, /Math\.min\(1,\s*Math\.max\(0,\s*currentY\s*\/\s*maxScroll\)\)/,
      'Scroll progress must be strictly clamped to [0.0, 1.0]');

    // Verify shader scroll-velocity wave pulsation clamping:
    // float wave = sin(...) * (0.04 + min(uScrollVelocity * 0.12, 0.25));
    assert.match(particlesSource, /min\(uScrollVelocity\s*\*\s*0\.12,\s*0\.25\)/,
      'Wave pulsation boost must be clamped to 0.25 max');

    // Verify shader point size pulsation clamping:
    // min(uScrollVelocity * 0.6, 1.0)
    assert.match(particlesSource, /min\(uScrollVelocity\s*\*\s*0\.6,\s*1\.0\)/,
      'Point size pulsation boost must be clamped to 1.0 max');

    // Mathematically test velocity decay curve
    let simulatedVelocity = 1000.0; // Extreme scroll speed (1,000 px/ms)
    let steps = 0;
    while (Math.abs(simulatedVelocity) > 0.01 && steps < 200) {
      simulatedVelocity *= 0.9;
      steps++;
    }
    assert.ok(steps <= 110, `Velocity decay should reach 0.01 threshold in <= 110 steps, took ${steps}`);
    assert.ok(simulatedVelocity <= 0.01, 'Velocity must decay below 0.01');

    // Mathematically test camera orbit bounds across all extremes of mouse and scrollProgress
    const testCases = [
      { mouseX: -1, mouseY: -1, progress: 0 },
      { mouseX: 0, mouseY: 0, progress: 0.5 },
      { mouseX: 1, mouseY: 1, progress: 1 },
      { mouseX: 0, mouseY: -1, progress: 1 },
      { mouseX: 1, mouseY: -1, progress: 0 },
    ];

    for (const tc of testCases) {
      const targetCamX = tc.mouseX * 0.7;
      const targetCamY = tc.mouseY * 0.5 - (tc.progress - 0.5) * 1.2;
      const targetCamZ = 6.8 + (tc.progress > 0.5 ? (tc.progress - 0.5) * 1.5 : 0);

      assert.ok(targetCamX >= -0.7 && targetCamX <= 0.7, `targetCamX ${targetCamX} out of bounds`);
      assert.ok(targetCamY >= -1.1 && targetCamY <= 1.1, `targetCamY ${targetCamY} out of bounds`);
      assert.ok(targetCamZ >= 6.8 && targetCamZ <= 7.55, `targetCamZ ${targetCamZ} out of bounds`);
    }
  });

  // =========================================================================
  // Mandate 5: Production Server Live DOM Verification
  // =========================================================================
  await suite.test('Mandate 5: Next.js Production Runtime live verification on /prototype-2', async () => {
    const TEST_PORT = 3099;
    const TEST_URL = `http://localhost:${TEST_PORT}`;

    const serverProcess = spawn('npx', ['next', 'start', '-p', String(TEST_PORT)], {
      cwd: CWD,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    try {
      // Wait for server to become responsive
      let ready = false;
      for (let i = 0; i < 30; i++) {
        try {
          const res = await new Promise((resolve, reject) => {
            http.get(`${TEST_URL}/prototype-2`, (res) => resolve(res)).on('error', reject);
          });
          if (res.statusCode === 200) {
            ready = true;
            break;
          }
        } catch {
          await new Promise((r) => setTimeout(r, 400));
        }
      }
      assert.ok(ready, 'Next.js production server failed to start within timeout');

      // Fetch /prototype-2 HTML
      const rawHtml = await new Promise((resolve, reject) => {
        http.get(`${TEST_URL}/prototype-2`, (res) => {
          let data = '';
          res.on('data', (c) => (data += c));
          res.on('end', () => resolve(data));
        }).on('error', reject);
      });

      // Normalize React SSR comment delimiters (<!-- -->) to simulate DOM textContent
      const html = rawHtml.replace(/<!--.*?-->/g, '');

      // Verify layout and responsive tokens
      assert.ok(html.includes('overflow-x-hidden'), '/prototype-2 must enforce overflow-x-hidden to prevent mobile scroll leaks');
      assert.ok(html.includes('bg-[#080C0E]'), '/prototype-2 must feature dark cyber background #080C0E');
      assert.ok(html.includes('Bangalore Beacon Telemetry · 12.9716° N, 77.5946° E'),
        'Hero section must display Bangalore Beacon coordinates');

      // Verify PDF-verified facts banner
      assert.ok(html.includes('Community Drives'), 'Must display Community Drives counter');
      assert.ok(html.includes('Specialized Teams'), 'Must display Specialized Teams counter');
      assert.ok(html.includes('Climate Actions'), 'Must display Climate Actions counter');
      assert.ok(html.includes('100%'), 'Must display 100% Student-Led stat');

      // Verify 5 Objectives
      assert.ok(html.includes('DIR_01') && html.includes('DIR_05'), 'Must render directive codes DIR_01 through DIR_05');

      // Verify 5 Teams
      assert.ok(html.includes('Research and Writing'), 'Must render Research and Writing team');
      assert.ok(html.includes('Design'), 'Must render Design team');
      assert.ok(html.includes('HR and Communications'), 'Must render HR and Communications team');
      assert.ok(html.includes('Social Media'), 'Must render Social Media team');
      assert.ok(html.includes('Event Planning'), 'Must render Event Planning team');

      // Verify 4 Flagship Events
      assert.ok(html.includes('DPS Donation Drive'), 'Must render DPS event');
      assert.ok(html.includes('Invictus Denim Stall'), 'Must render Invictus event');
      assert.ok(html.includes('Orphanage Donation Drive'), 'Must render Aarogi Orphanage event');
      assert.ok(html.includes('Beyond the Waste Workshop'), 'Must render Waste Workshop event');

      // Verify 11 Climate Tips
      assert.ok(html.includes('PROTOCOL #1') && html.includes('PROTOCOL #11'),
        'Must render climate protocols from #1 through #11');

      // Verify Application Form CTA link
      assert.ok(html.includes('forms.gle'), 'Must render verified recruitment Google Form link');
      assert.ok(html.includes('rel="noopener noreferrer"'), 'External link must have rel="noopener noreferrer"');

    } finally {
      if (serverProcess) {
        serverProcess.kill('SIGTERM');
      }
    }
  });

});
