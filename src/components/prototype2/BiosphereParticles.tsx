'use client';

import React, { useMemo, useRef, useEffect, useState } from 'react';
import {
  Color,
  Vector3,
  Group,
  ShaderMaterial,
  PointsMaterial,
  MeshBasicMaterial,
  DoubleSide,
  AdditiveBlending,
  MathUtils,
  CanvasTexture,
} from 'three';
import { useFrame, useThree } from '@react-three/fiber';

interface BiosphereParticlesProps {
  scrollProgress?: number;
  scrollVelocity?: number;
}

// Generate 10,000 points on a Fibonacci sphere for holographic Earth distribution
function generateFibonacciSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const randoms = new Float32Array(count * 3);

  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio ~1.61803398875

  const cCyan = new Color('#06b6d4');
  const cEmerald = new Color('#10b981');
  const cBlue = new Color('#38bdf8');
  const cMint = new Color('#6ee7b7');
  const cDeepTeal = new Color('#0891b2');

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

    // Palette gradient: northern latitudes lean mint/cyan, equator emerald, south cyan/blue
    const lat = (y + 1) / 2;
    const color = new Color();
    if (lat > 0.65) {
      color.lerpColors(cCyan, cMint, Math.random());
    } else if (lat > 0.35) {
      color.lerpColors(cEmerald, cCyan, Math.random());
    } else {
      color.lerpColors(cDeepTeal, cBlue, Math.random());
    }

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    sizes[i] = 1.2 + Math.random() * 2.2;

    randoms[i * 3] = Math.random();
    randoms[i * 3 + 1] = Math.random();
    randoms[i * 3 + 2] = Math.random();
  }

  return { positions, colors, sizes, randoms };
}

// Generate circular telemetry orbital ring
function generateOrbitalRing(count: number, radius: number, baseColor: string) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const col = new Color(baseColor);
  const white = new Color('#ffffff');

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = Math.sin(angle) * radius;

    // Every 15th point is an illuminated telemetry marker
    const isMarker = i % 15 === 0;
    const pointCol = isMarker ? white : col;

    colors[i * 3] = pointCol.r;
    colors[i * 3 + 1] = pointCol.g;
    colors[i * 3 + 2] = pointCol.b;
  }

  return { positions, colors };
}

// Create 2D Canvas Sprite Texture for Bangalore Beacon Label
function createBeaconLabelTexture() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 110;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 512, 110);
    // Dark glassmorphic background
    ctx.fillStyle = 'rgba(8, 12, 14, 0.92)';
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)';
    ctx.lineWidth = 3;
    if (ctx.roundRect) {
      ctx.roundRect(8, 8, 496, 94, 20);
    } else {
      ctx.rect(8, 8, 496, 94);
    }
    ctx.fill();
    ctx.stroke();

    // Pulse dot
    ctx.fillStyle = '#22d3ee';
    ctx.beginPath();
    ctx.arc(42, 55, 8, 0, Math.PI * 2);
    ctx.fill();

    // Text
    ctx.fillStyle = '#67e8f9';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('BLR BEACON · 12.9716° N, 77.5946° E', 65, 55);
  }
  return new CanvasTexture(canvas);
}

export function BiosphereParticles({
  scrollProgress = 0,
  scrollVelocity = 0
}: BiosphereParticlesProps) {
  const earthGroupRef = useRef<Group>(null);
  const ring1Ref = useRef<Group>(null);
  const ring2Ref = useRef<Group>(null);
  const shaderMatRef = useRef<ShaderMaterial>(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // 10,000 holographic Earth points
  const earthData = useMemo(() => generateFibonacciSphere(10000, 2.35), []);
  // Orbital Ring 1 (Inner Cyan)
  const ring1Data = useMemo(() => generateOrbitalRing(360, 3.1, '#06b6d4'), []);
  // Orbital Ring 2 (Outer Emerald)
  const ring2Data = useMemo(() => generateOrbitalRing(480, 3.7, '#10b981'), []);

  // Bangalore Beacon Coordinates: 12.9716° N, 77.5946° E
  const beaconPos = useMemo(() => {
    const latRad = (12.9716 * Math.PI) / 180;
    const lonRad = (77.5946 * Math.PI) / 180;
    const r = 2.35;
    return new Vector3(
      r * Math.cos(latRad) * Math.sin(lonRad),
      r * Math.sin(latRad),
      r * Math.cos(latRad) * Math.cos(lonRad)
    );
  }, []);

  const beaconLabelTexture = useMemo(() => createBeaconLabelTexture(), []);

  // Track mouse for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScrollVelocity: { value: 0 },
      uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
    }),
    []
  );

  // Custom vertex and fragment shaders for 10,000 glowing particles
  const vertexShader = `
    uniform float uTime;
    uniform float uScrollVelocity;
    uniform float uPixelRatio;

    attribute vec3 aColor;
    attribute float aSize;
    attribute vec3 aRandom;

    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      vColor = aColor;
      vec3 pos = position;

      // Scroll-velocity driven wave pulsation
      float wave = sin(uTime * 1.8 + pos.y * 3.5 + pos.x * 2.0) * (0.04 + min(uScrollVelocity * 0.12, 0.25));
      pos += normalize(pos) * wave;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Dynamic size pulsation with distance attenuation
      float sizePulse = aSize * (1.0 + sin(uTime * 3.0 + aRandom.x * 6.28) * 0.25 + min(uScrollVelocity * 0.6, 1.0));
      gl_PointSize = sizePulse * uPixelRatio * (80.0 / -mvPosition.z);

      vAlpha = 0.85;
    }
  `;

  const fragmentShader = `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      // Soft circular particle with luminous core falloff
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      float core = pow(1.0 - (dist * 2.0), 2.0);
      gl_FragColor = vec4(vColor * 1.2, core * vAlpha);
    }
  `;

  // Animation frame loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (shaderMatRef.current) {
      shaderMatRef.current.uniforms.uTime.value = time;
      shaderMatRef.current.uniforms.uScrollVelocity.value = MathUtils.lerp(
        shaderMatRef.current.uniforms.uScrollVelocity.value,
        Math.abs(scrollVelocity),
        0.08
      );
    }

    // Steady planet rotation + scroll boost
    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.y += 0.0025 + Math.abs(scrollVelocity) * 0.01;
      earthGroupRef.current.rotation.z = MathUtils.degToRad(23.44);
    }

    // Dual differential orbital rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += 0.004;
      ring1Ref.current.rotation.y += 0.002;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x -= 0.003;
      ring2Ref.current.rotation.z -= 0.002;
    }

    // Camera orbit parallax responsive to cursor and scroll
    const targetCamX = mouse.x * 0.7;
    const targetCamY = mouse.y * 0.5 - (scrollProgress - 0.5) * 1.2;
    const targetCamZ = 6.8 + (scrollProgress > 0.5 ? (scrollProgress - 0.5) * 1.5 : 0);

    state.camera.position.x = MathUtils.lerp(state.camera.position.x, targetCamX, 0.05);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, targetCamY, 0.05);
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, targetCamZ, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      {/* Central Holographic 10,000-Particle Earth Globe */}
      <group ref={earthGroupRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={earthData.positions.length / 3}
              array={earthData.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-aColor"
              count={earthData.colors.length / 3}
              array={earthData.colors}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-aSize"
              count={earthData.sizes.length}
              array={earthData.sizes}
              itemSize={1}
            />
            <bufferAttribute
              attach="attributes-aRandom"
              count={earthData.randoms.length / 3}
              array={earthData.randoms}
              itemSize={3}
            />
          </bufferGeometry>
          <shaderMaterial
            ref={shaderMatRef}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </points>

        {/* Bangalore Beacon Marker (12.9716° N, 77.5946° E) */}
        <group position={[beaconPos.x, beaconPos.y, beaconPos.z]}>
          {/* Luminous beacon core */}
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#06b6d4" />
          </mesh>

          {/* Concentric pulsing telemetry ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.08, 0.12, 32]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} side={DoubleSide} />
          </mesh>

          {/* Normal telemetry antenna ray */}
          <mesh position={[beaconPos.x * 0.1, beaconPos.y * 0.1, beaconPos.z * 0.1]}>
            <cylinderGeometry args={[0.008, 0.008, 0.35, 8]} />
            <meshBasicMaterial color="#67e8f9" transparent opacity={0.8} />
          </mesh>

          {/* 3D Canvas Sprite Badge */}
          {beaconLabelTexture && (
            <sprite position={[0, 0.35, 0]} scale={[1.4, 0.3, 1]}>
              <spriteMaterial map={beaconLabelTexture} transparent depthWrite={false} />
            </sprite>
          )}
        </group>
      </group>

      {/* Dual Concentric Orbital Telemetry Rings */}
      {/* Ring 1 (Inner Cyan Ring, tilted 25 deg) */}
      <group ref={ring1Ref} rotation={[0.44, 0.2, 0.15]}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={ring1Data.positions.length / 3}
              array={ring1Data.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={ring1Data.colors.length / 3}
              array={ring1Data.colors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.06}
            vertexColors
            transparent
            opacity={0.65}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>

      {/* Ring 2 (Outer Emerald Ring, tilted -35 deg) */}
      <group ref={ring2Ref} rotation={[-0.55, -0.3, 0.4]}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={ring2Data.positions.length / 3}
              array={ring2Data.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={ring2Data.colors.length / 3}
              array={ring2Data.colors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.05}
            vertexColors
            transparent
            opacity={0.5}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>
    </group>
  );
}

export default BiosphereParticles;
