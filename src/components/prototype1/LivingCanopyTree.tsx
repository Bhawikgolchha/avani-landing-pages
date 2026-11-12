'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

interface LivingCanopyTreeProps {
  scrollProgress: number; // 0 to 1
  scrollVelocity?: number;
}

// Branch data definition for procedural tree of life
interface BranchSegment {
  start: [number, number, number];
  end: [number, number, number];
  radiusTop: number;
  radiusBottom: number;
}

export default function LivingCanopyTree({
  scrollProgress,
  scrollVelocity = 0,
}: LivingCanopyTreeProps) {
  const { camera } = useThree();
  const treeGroupRef = useRef<THREE.Group>(null);
  const foliageGroupRef = useRef<THREE.Group>(null);
  const sporesPointsRef = useRef<THREE.Points>(null);
  const poolRef = useRef<THREE.Mesh>(null);
  const sunLightRef = useRef<THREE.DirectionalLight>(null);
  const moonLightRef = useRef<THREE.DirectionalLight>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);
  const poolLightRef = useRef<THREE.PointLight>(null);

  // Smooth interpolated camera targets
  const currentCamPos = useRef(new THREE.Vector3(0, 3.2, 5.0));
  const currentCamLook = useRef(new THREE.Vector3(0, 2.0, 0));

  // 1. Procedural Branch Network
  const branches = useMemo<BranchSegment[]>(() => {
    const list: BranchSegment[] = [];

    // Main Trunk (thick tapering base)
    list.push({
      start: [0, -3.8, 0],
      end: [0, -1.8, 0],
      radiusBottom: 0.65,
      radiusTop: 0.5,
    });
    list.push({
      start: [0, -1.8, 0],
      end: [0.1, -0.2, 0.05],
      radiusBottom: 0.5,
      radiusTop: 0.38,
    });
    list.push({
      start: [0.1, -0.2, 0.05],
      end: [-0.05, 1.2, -0.1],
      radiusBottom: 0.38,
      radiusTop: 0.28,
    });

    // Major Limbs (Tier 1)
    list.push({
      start: [0, -1.2, 0],
      end: [1.3, -0.2, 0.6],
      radiusBottom: 0.32,
      radiusTop: 0.2,
    });
    list.push({
      start: [0, -1.0, 0],
      end: [-1.4, -0.1, -0.5],
      radiusBottom: 0.32,
      radiusTop: 0.2,
    });
    list.push({
      start: [0.05, -0.5, 0],
      end: [-0.8, 0.6, 1.2],
      radiusBottom: 0.28,
      radiusTop: 0.18,
    });
    list.push({
      start: [0.05, -0.5, 0],
      end: [0.9, 0.8, -1.1],
      radiusBottom: 0.28,
      radiusTop: 0.18,
    });

    // Secondary Canopy Branches (Tier 2)
    list.push({
      start: [1.3, -0.2, 0.6],
      end: [2.2, 0.8, 1.0],
      radiusBottom: 0.2,
      radiusTop: 0.12,
    });
    list.push({
      start: [1.3, -0.2, 0.6],
      end: [1.8, 0.5, -0.2],
      radiusBottom: 0.18,
      radiusTop: 0.1,
    });
    list.push({
      start: [-1.4, -0.1, -0.5],
      end: [-2.4, 0.7, -0.8],
      radiusBottom: 0.2,
      radiusTop: 0.12,
    });
    list.push({
      start: [-1.4, -0.1, -0.5],
      end: [-1.9, 0.6, 0.4],
      radiusBottom: 0.18,
      radiusTop: 0.1,
    });
    list.push({
      start: [-0.8, 0.6, 1.2],
      end: [-1.3, 1.7, 1.8],
      radiusBottom: 0.18,
      radiusTop: 0.1,
    });
    list.push({
      start: [-0.8, 0.6, 1.2],
      end: [-0.2, 1.8, 1.6],
      radiusBottom: 0.16,
      radiusTop: 0.08,
    });
    list.push({
      start: [0.9, 0.8, -1.1],
      end: [1.5, 1.9, -1.6],
      radiusBottom: 0.18,
      radiusTop: 0.1,
    });
    list.push({
      start: [0.9, 0.8, -1.1],
      end: [0.3, 2.0, -1.4],
      radiusBottom: 0.16,
      radiusTop: 0.08,
    });

    // Crown Branches (Top Canopy)
    list.push({
      start: [-0.05, 1.2, -0.1],
      end: [0.7, 2.4, 0.3],
      radiusBottom: 0.24,
      radiusTop: 0.12,
    });
    list.push({
      start: [-0.05, 1.2, -0.1],
      end: [-0.8, 2.5, -0.2],
      radiusBottom: 0.24,
      radiusTop: 0.12,
    });
    list.push({
      start: [-0.05, 1.2, -0.1],
      end: [0.1, 2.9, -0.1],
      radiusBottom: 0.2,
      radiusTop: 0.08,
    });

    return list;
  }, []);

  // 2. Foliage Clusters (Canopy Volume)
  const foliageClusters = useMemo(() => {
    return [
      // Crown Clusters
      { pos: [0.1, 3.2, 0], scale: [1.5, 1.1, 1.5], color: '#38A169' },
      { pos: [0.8, 2.7, 0.4], scale: [1.3, 0.9, 1.2], color: '#48BB78' },
      { pos: [-0.9, 2.8, -0.3], scale: [1.3, 0.9, 1.2], color: '#2F855A' },
      { pos: [0.2, 2.4, -1.3], scale: [1.2, 0.8, 1.1], color: '#568203' },
      { pos: [-0.4, 2.3, 1.4], scale: [1.2, 0.8, 1.1], color: '#68D391' },

      // Mid-level Outer Canopy
      { pos: [2.3, 1.0, 1.1], scale: [1.4, 0.9, 1.3], color: '#2F855A' },
      { pos: [1.9, 0.7, -0.3], scale: [1.2, 0.8, 1.1], color: '#38A169' },
      { pos: [-2.5, 0.9, -0.8], scale: [1.4, 0.9, 1.3], color: '#48BB78' },
      { pos: [-2.0, 0.8, 0.5], scale: [1.2, 0.8, 1.1], color: '#568203' },
      { pos: [-1.4, 1.9, 1.9], scale: [1.3, 0.8, 1.2], color: '#276749' },
      { pos: [1.6, 2.1, -1.7], scale: [1.3, 0.8, 1.2], color: '#38A169' },

      // Lower Canopy Accent Cushions
      { pos: [1.4, -0.1, 0.7], scale: [1.0, 0.7, 0.9], color: '#2F855A' },
      { pos: [-1.5, 0.0, -0.6], scale: [1.0, 0.7, 0.9], color: '#38A169' },
      { pos: [-0.8, 0.8, 1.3], scale: [0.9, 0.6, 0.8], color: '#48BB78' },
      { pos: [0.9, 1.0, -1.2], scale: [0.9, 0.6, 0.8], color: '#68D391' },
    ];
  }, []);

  // 3. Bioluminescent Floral Nodes (Canva 12-13 GlowGarden)
  const floralNodes = useMemo(() => {
    return [
      { pos: [0.1, 2.9, 0.1], color: '#4ADE80', size: 0.16 },
      { pos: [0.7, 2.5, 0.3], color: '#2DD4BF', size: 0.14 },
      { pos: [-0.8, 2.6, -0.2], color: '#A7F3D0', size: 0.15 },
      { pos: [1.4, 1.0, 0.7], color: '#38BDF8', size: 0.13 },
      { pos: [-1.5, 0.9, -0.5], color: '#34D399', size: 0.14 },
      { pos: [-0.9, 1.8, 1.7], color: '#6EE7B7', size: 0.15 },
      { pos: [1.5, 1.8, -1.5], color: '#FCD34D', size: 0.13 },
      { pos: [2.1, 0.9, 1.0], color: '#2DD4BF', size: 0.14 },
      { pos: [-2.3, 0.8, -0.7], color: '#4ADE80', size: 0.14 },
      { pos: [0.1, 0.5, 0.1], color: '#A7F3D0', size: 0.15 },
      { pos: [-0.1, -0.8, 0.2], color: '#34D399', size: 0.13 },
      { pos: [0.0, -2.2, 0.3], color: '#2DD4BF', size: 0.14 },
      // Near base & roots (Glowing Undergrowth)
      { pos: [0.6, -3.4, 0.8], color: '#4ADE80', size: 0.16 },
      { pos: [-0.7, -3.5, 0.7], color: '#38BDF8', size: 0.15 },
      { pos: [0.8, -3.6, -0.6], color: '#FCD34D', size: 0.14 },
      { pos: [-0.8, -3.5, -0.7], color: '#6EE7B7', size: 0.15 },
    ];
  }, []);

  // 4. Bioluminescent Spores Particle System (1,500 drifting particles)
  const sporesData = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    const palette = [
      new THREE.Color('#4ADE80'), // Emerald green
      new THREE.Color('#2DD4BF'), // Teal
      new THREE.Color('#38BDF8'), // Cyan
      new THREE.Color('#A7F3D0'), // Mint
      new THREE.Color('#FEF08A'), // Golden pollen
    ];

    for (let i = 0; i < count; i++) {
      // Cylindrical distribution around tree
      const radius = 0.4 + Math.random() * 4.2;
      const angle = Math.random() * Math.PI * 2;
      const y = -3.8 + Math.random() * 7.5;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      speeds[i] = 0.2 + Math.random() * 0.45;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { count, positions, colors, speeds, phases };
  }, []);

  // 5. Materials Setup
  const barkMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#241a12',
      roughness: 0.9,
      metalness: 0.05,
      flatShading: true,
    });
  }, []);

  // 6. Animation Frame: Wind Physics, Spore Drift, Lighting Transitions & Camera Choreography
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Gentle tree sway
    if (treeGroupRef.current) {
      const windSpeed = 1.2 + Math.abs(scrollVelocity) * 2.0;
      treeGroupRef.current.rotation.y = Math.sin(t * 0.2) * 0.05;
      treeGroupRef.current.rotation.z = Math.sin(t * windSpeed * 0.5) * 0.015;
    }

    // Foliage flutter
    if (foliageGroupRef.current) {
      foliageGroupRef.current.children.forEach((child, idx) => {
        child.rotation.x = Math.sin(t * 1.4 + idx) * 0.04;
        child.rotation.y = Math.cos(t * 1.1 + idx) * 0.04;
        child.scale.x = 1 + Math.sin(t * 2.0 + idx) * 0.02;
        child.scale.y = 1 + Math.cos(t * 2.0 + idx) * 0.02;
      });
    }

    // Drifting Bioluminescent Spores
    if (sporesPointsRef.current) {
      const positions = sporesPointsRef.current.geometry.attributes.position
        .array as Float32Array;
      const { speeds, phases, count } = sporesData;

      for (let i = 0; i < count; i++) {
        // Upward drift
        positions[i * 3 + 1] += speeds[i] * delta * 0.8;

        // Subtle organic horizontal turbulence
        positions[i * 3] += Math.sin(t * 1.2 + phases[i]) * 0.003;
        positions[i * 3 + 2] += Math.cos(t * 1.2 + phases[i]) * 0.003;

        // Reset if spore rises above canopy
        if (positions[i * 3 + 1] > 4.2) {
          positions[i * 3 + 1] = -3.8;
          const radius = 0.5 + Math.random() * 3.8;
          const angle = Math.random() * Math.PI * 2;
          positions[i * 3] = Math.cos(angle) * radius;
          positions[i * 3 + 2] = Math.sin(angle) * radius;
        }
      }
      sporesPointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Reflecting Pool Ripple & Rotation
    if (poolRef.current) {
      poolRef.current.rotation.z = t * 0.02;
    }

    // Dynamic Dusk-to-Night Volumetric Lighting Transitions
    // Stage 1 (0.0): Sunlit Golden Daylight
    // Stage 5 (1.0): Mystical Bioluminescent Nocturnal Sanctuary
    const nightFactor = Math.min(1, Math.max(0, scrollProgress));

    if (sunLightRef.current) {
      // Sunbeams fade from 1.6 down to 0.1
      sunLightRef.current.intensity = THREE.MathUtils.lerp(1.6, 0.1, nightFactor);
    }

    if (moonLightRef.current) {
      // Moonbeams ramp up from 0.1 to 1.8
      moonLightRef.current.intensity = THREE.MathUtils.lerp(0.1, 1.8, nightFactor);
    }

    if (glowLightRef.current) {
      // Tree canopy bioluminescent node light intensifies at night
      glowLightRef.current.intensity = THREE.MathUtils.lerp(0.4, 2.5, nightFactor);
    }

    if (poolLightRef.current) {
      // Pool reflection light surges in stage 4-5
      const poolActive = Math.max(0, (nightFactor - 0.5) * 2);
      poolLightRef.current.intensity = poolActive * 2.8;
    }

    // Camera Scroll Choreography Across 5 Narrative Stages
    // Target position and lookAt calculations based on scrollProgress
    let targetX = 0;
    let targetY = 3.2;
    let targetZ = 5.2;
    let lookTargetY = 2.0;

    if (scrollProgress <= 0.2) {
      // Stage 1: Hero Living Canopy (Tops of golden sunlit crown)
      const p = scrollProgress / 0.2;
      targetX = THREE.MathUtils.lerp(0, 1.2, p);
      targetY = THREE.MathUtils.lerp(3.2, 2.2, p);
      targetZ = THREE.MathUtils.lerp(5.2, 4.6, p);
      lookTargetY = THREE.MathUtils.lerp(2.2, 1.6, p);
    } else if (scrollProgress <= 0.4) {
      // Stage 2: Mid-level Foliage (5 Core Objectives)
      const p = (scrollProgress - 0.2) / 0.2;
      targetX = THREE.MathUtils.lerp(1.2, -1.4, p);
      targetY = THREE.MathUtils.lerp(2.2, 0.9, p);
      targetZ = THREE.MathUtils.lerp(4.6, 4.8, p);
      lookTargetY = THREE.MathUtils.lerp(1.6, 0.5, p);
    } else if (scrollProgress <= 0.6) {
      // Stage 3: Trunk & Major Branches (5 Specialized Teams)
      const p = (scrollProgress - 0.4) / 0.2;
      targetX = THREE.MathUtils.lerp(-1.4, 1.8, p);
      targetY = THREE.MathUtils.lerp(0.9, -0.6, p);
      targetZ = THREE.MathUtils.lerp(4.8, 5.2, p);
      lookTargetY = THREE.MathUtils.lerp(0.5, -0.8, p);
    } else if (scrollProgress <= 0.8) {
      // Stage 4: Undergrowth & Forest Floor (4 Flagship Events)
      const p = (scrollProgress - 0.6) / 0.2;
      targetX = THREE.MathUtils.lerp(1.8, -0.9, p);
      targetY = THREE.MathUtils.lerp(-0.6, -2.2, p);
      targetZ = THREE.MathUtils.lerp(5.2, 4.9, p);
      lookTargetY = THREE.MathUtils.lerp(-0.8, -2.4, p);
    } else {
      // Stage 5: Deep Tranquil Nocturnal Pool (Climate Tips & Join Form)
      const p = (scrollProgress - 0.8) / 0.2;
      targetX = THREE.MathUtils.lerp(-0.9, 0.0, p);
      targetY = THREE.MathUtils.lerp(-2.2, -3.2, p);
      targetZ = THREE.MathUtils.lerp(4.9, 5.8, p);
      lookTargetY = THREE.MathUtils.lerp(-2.4, -3.2, p);
    }

    // Subtle natural mouse/scroll parallax offset
    const targetVec = new THREE.Vector3(targetX, targetY, targetZ);
    const lookVec = new THREE.Vector3(0, lookTargetY, 0);

    // Smooth lerp camera movement
    currentCamPos.current.lerp(targetVec, 0.05);
    currentCamLook.current.lerp(lookVec, 0.05);

    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentCamLook.current);
  });

  return (
    <>
      {/* Dynamic Directional & Volumetric Lights */}
      {/* Daytime Sunbeams */}
      <directionalLight
        ref={sunLightRef}
        position={[5, 9, 4]}
        intensity={1.6}
        color="#FEF3C7"
      />
      {/* Nighttime Moonbeams */}
      <directionalLight
        ref={moonLightRef}
        position={[-4, 7, -3]}
        intensity={0.2}
        color="#38BDF8"
      />
      {/* Canopy Bioluminescent Internal Point Light */}
      <pointLight
        ref={glowLightRef}
        position={[0, 1.2, 0]}
        intensity={0.8}
        color="#4ADE80"
        distance={9}
      />
      {/* Forest Floor Nocturnal Pool Light */}
      <pointLight
        ref={poolLightRef}
        position={[0, -3.4, 0]}
        intensity={0.5}
        color="#2DD4BF"
        distance={8}
      />

      <group ref={treeGroupRef} position={[0, 0, 0]}>
        {/* Procedural Tree Trunk & Branches */}
        {branches.map((b, idx) => {
          const vStart = new THREE.Vector3(...b.start);
          const vEnd = new THREE.Vector3(...b.end);
          const dir = new THREE.Vector3().subVectors(vEnd, vStart);
          const length = dir.length();
          const mid = new THREE.Vector3().addVectors(vStart, vEnd).multiplyScalar(0.5);

          // Calculate cylinder rotation aligned to branch direction
          const orientation = new THREE.Matrix4();
          orientation.lookAt(vStart, vEnd, new THREE.Vector3(0, 1, 0));
          const rotation = new THREE.Euler().setFromRotationMatrix(orientation);

          return (
            <mesh
              key={`branch-${idx}`}
              position={[mid.x, mid.y, mid.z]}
              rotation={[rotation.x, rotation.y, rotation.z]}
              material={barkMaterial}
            >
              <cylinderGeometry
                args={[b.radiusTop, b.radiusBottom, length, 8, 1]}
              />
            </mesh>
          );
        })}

        {/* Translucent Foliage Clusters */}
        <group ref={foliageGroupRef}>
          {foliageClusters.map((fc, idx) => (
            <mesh
              key={`foliage-${idx}`}
              position={fc.pos as [number, number, number]}
              scale={fc.scale as [number, number, number]}
            >
              <dodecahedronGeometry args={[1, 1]} />
              <meshStandardMaterial
                color={fc.color}
                roughness={0.4}
                metalness={0.1}
                transparent
                opacity={0.82}
              />
            </mesh>
          ))}
        </group>

        {/* Glowing Bioluminescent Floral Nodes (Canva 12-13) */}
        {floralNodes.map((fn, idx) => (
          <mesh
            key={`floral-${idx}`}
            position={fn.pos as [number, number, number]}
          >
            <sphereGeometry args={[fn.size, 16, 16]} />
            <meshStandardMaterial
              color={fn.color}
              emissive={fn.color}
              emissiveIntensity={0.8 + scrollProgress * 2.2}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        ))}

        {/* Drifting Bioluminescent Spores Point Cloud */}
        <points ref={sporesPointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={sporesData.count}
              array={sporesData.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={sporesData.count}
              array={sporesData.colors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.065}
            vertexColors
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
            depthWrite={false}
          />
        </points>

        {/* Reflecting Forest Pool at Tree Base */}
        <mesh
          ref={poolRef}
          position={[0, -3.85, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[6.2, 48]} />
          <meshStandardMaterial
            color="#051c1f"
            roughness={0.12}
            metalness={0.88}
            transparent
            opacity={0.92}
          />
        </mesh>
      </group>
    </>
  );
}
