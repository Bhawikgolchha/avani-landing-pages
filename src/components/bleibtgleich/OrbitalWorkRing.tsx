'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { getOrbitalWorkItems, OrbitalWorkItem } from './orbitalWorkItems';
import { OrbitalDrawer } from './OrbitalDrawer';
import { useAvaniTheme } from './ThemeTransitionOverlay';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Generates an editorial crisp high-DPI CanvasTexture for each card on the 3D Orbital Ring,
 * drawing the local asset photo into a framed Swiss card layout.
 */
function buildCardCanvasTexture(
  item: OrbitalWorkItem,
  isNight: boolean
): { canvas: HTMLCanvasElement; texture: THREE.CanvasTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 660;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  const paint = (img?: HTMLImageElement) => {
    if (!ctx) return;
    const bg = isNight ? '#19261B' : '#F4EFEA';
    const fg = isNight ? '#ECEFE9' : '#163515';
    const accent = isNight ? '#86B87A' : '#568203';

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Outer 2px Swiss border
    ctx.strokeStyle = isNight ? 'rgba(110, 231, 183, 0.35)' : 'rgba(22, 53, 21, 0.28)';
    ctx.lineWidth = 3;
    ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

    // Header strip: index & category
    ctx.fillStyle = accent;
    ctx.font = 'bold 18px monospace';
    ctx.fillText(`${item.indexLabel} / ${item.categoryLabel.toUpperCase()}`, 28, 44);

    // Photo frame
    const imgX = 28;
    const imgY = 64;
    const imgW = canvas.width - 56;
    const imgH = 390;

    if (img && img.complete && img.naturalWidth > 0) {
      const scale = Math.max(imgW / img.naturalWidth, imgH / img.naturalHeight);
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      const offsetX = imgX + (imgW - drawW) / 2;
      const offsetY = imgY + (imgH - drawH) / 2;

      ctx.save();
      ctx.beginPath();
      ctx.rect(imgX, imgY, imgW, imgH);
      ctx.clip();
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      ctx.restore();
    } else {
      ctx.fillStyle = isNight ? '#163515' : '#DCE7D4';
      ctx.fillRect(imgX, imgY, imgW, imgH);
    }

    ctx.strokeStyle = isNight ? 'rgba(110, 231, 183, 0.25)' : 'rgba(22, 53, 21, 0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(imgX, imgY, imgW, imgH);

    // Title wrapping (max 2 lines)
    ctx.fillStyle = fg;
    ctx.font = 'bold 28px Georgia, serif';
    const words = item.title.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    for (const word of words) {
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      if (ctx.measureText(candidate).width > imgW && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = candidate;
      }
    }
    if (currentLine) lines.push(currentLine);

    lines.slice(0, 2).forEach((line, idx) => {
      ctx.fillText(line, 28, 505 + idx * 36);
    });

    // Footer action hint
    ctx.fillStyle = isNight ? 'rgba(220, 231, 212, 0.72)' : 'rgba(22, 53, 21, 0.7)';
    ctx.font = '16px monospace';
    ctx.fillText('CLICK TO INSPECT →', 28, 616);

    texture.needsUpdate = true;
  };

  paint();

  const img = new window.Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => paint(img);
  img.src = item.imageUrl;

  return { canvas, texture };
}

/**
 * Section 2 (`.featured`):
 * Models bleibtgleich.dev's monumental Work Showcase with Three.js 3D orbital floating card ring,
 * flanked by oversized editorial typography ("Initiatives" · "'25–'26"), scroll-linked + drag inertia,
 * raycasted click-to-open OrbitalDrawer, and responsive mobile card carousel.
 */
export function OrbitalWorkRing() {
  const items = useMemo(() => getOrbitalWorkItems(), []);
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [drawerItem, setDrawerItem] = useState<OrbitalWorkItem | null>(null);
  const [webglReady, setWebglReady] = useState(true);
  const { isNight } = useAvaniTheme();

  // Mutable animation state shared between Three.js loop, ScrollTrigger, and Drag
  const orbitStateRef = useRef({
    targetRotation: 0,
    currentRotation: 0,
    scrollOffset: 0,
    dragOffset: 0,
    velocity: 0,
    isDragging: false,
    dragMoved: false,
    lastPointerX: 0,
    hoveredIndex: -1,
  });

  const focusItemByIndex = useCallback(
    (idx: number) => {
      const count = items.length;
      const wrapped = ((idx % count) + count) % count;
      const step = (Math.PI * 2) / count;
      const state = orbitStateRef.current;
      // Rotate ring so card `wrapped` faces forward (+Z in local camera view)
      const desiredTotal = -wrapped * step;
      state.dragOffset = desiredTotal - state.scrollOffset;
      state.velocity = 0;
      setActiveIndex(wrapped);
    },
    [items.length]
  );

  const handleOpenDrawerAt = useCallback(
    (idx: number) => {
      const wrapped = ((idx % items.length) + items.length) % items.length;
      setActiveIndex(wrapped);
      setDrawerItem(items[wrapped]);
    },
    [items]
  );

  const handleDrawerAdjacent = useCallback(
    (delta: number) => {
      if (!drawerItem) return;
      const currentIdx = items.findIndex((i) => i.id === drawerItem.id);
      const nextIdx = ((currentIdx + delta) % items.length + items.length) % items.length;
      setActiveIndex(nextIdx);
      setDrawerItem(items[nextIdx]);
    },
    [drawerItem, items]
  );

  useEffect(() => {
    const host = canvasHostRef.current;
    const section = sectionRef.current;
    if (!host || !section || typeof window === 'undefined') return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglReady(false);
      return;
    }

    const width = Math.max(host.clientWidth, 320);
    const height = Math.max(host.clientHeight, 360);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    host.innerHTML = '';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 8.8);
    camera.lookAt(0, 0, 0);

    const ringGroup = new THREE.Group();
    ringGroup.rotation.x = 0.08;
    scene.add(ringGroup);

    const radius = 3.85;
    const stepAngle = (Math.PI * 2) / items.length;
    const cardGeom = new THREE.PlaneGeometry(1.85, 2.38, 12, 1);

    // Subtle cylindrical curvature on card vertices matching curved orbital studio feel
    const posAttr = cardGeom.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const zCurve = -(x * x) * 0.08;
      posAttr.setZ(i, zCurve);
    }
    cardGeom.computeVertexNormals();

    const meshes: THREE.Mesh[] = [];
    const textures: THREE.CanvasTexture[] = [];
    const backMat = new THREE.MeshBasicMaterial({
      color: isNight ? 0x0a1c0d : 0xdce7d4,
      side: THREE.FrontSide,
    });

    items.forEach((item, idx) => {
      const angle = idx * stepAngle;
      const { texture } = buildCardCanvasTexture(item, isNight);
      textures.push(texture);

      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide,
        transparent: true,
      });

      const cardHolder = new THREE.Group();
      cardHolder.position.set(
        Math.sin(angle) * radius,
        Math.sin(idx * 1.4) * 0.18,
        Math.cos(angle) * radius
      );
      cardHolder.rotation.y = angle;

      const frontMesh = new THREE.Mesh(cardGeom, mat);
      frontMesh.userData = { index: idx };
      cardHolder.add(frontMesh);

      const backMesh = new THREE.Mesh(cardGeom, backMat);
      backMesh.rotation.y = Math.PI;
      backMesh.position.z = -0.01;
      backMesh.userData = { index: idx };
      cardHolder.add(backMesh);

      ringGroup.add(cardHolder);
      meshes.push(frontMesh);
    });

    // Subtle wireframe orbital guide ring matching Swiss architecture
    const ringTrackGeom = new THREE.RingGeometry(radius - 0.012, radius + 0.012, 96);
    const ringTrackMat = new THREE.MeshBasicMaterial({
      color: isNight ? 0x6ee7b7 : 0x163515,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    });
    const ringTrack = new THREE.Mesh(ringTrackGeom, ringTrackMat);
    ringTrack.rotation.x = Math.PI / 2;
    ringTrack.position.y = -1.45;
    ringGroup.add(ringTrack);

    // Raycaster for hover + click card inspection
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();

    const onPointerDown = (e: PointerEvent) => {
      const s = orbitStateRef.current;
      s.isDragging = true;
      s.dragMoved = false;
      s.lastPointerX = e.clientX;
      s.velocity = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer!.domElement.getBoundingClientRect();
      pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const s = orbitStateRef.current;
      if (s.isDragging) {
        const dx = e.clientX - s.lastPointerX;
        if (Math.abs(dx) > 3) s.dragMoved = true;
        s.lastPointerX = e.clientX;
        const deltaAngle = dx * 0.0055;
        s.dragOffset += deltaAngle;
        s.velocity = deltaAngle;
      }

      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(meshes, false);
      s.hoveredIndex = hits.length > 0 ? (hits[0].object.userData.index as number) : -1;
      renderer!.domElement.style.cursor = s.isDragging
        ? 'grabbing'
        : s.hoveredIndex >= 0
        ? 'pointer'
        : 'grab';
    };

    const onPointerUp = (e: PointerEvent) => {
      const s = orbitStateRef.current;
      const wasClick = s.isDragging && !s.dragMoved;
      s.isDragging = false;

      if (wasClick) {
        const rect = renderer!.domElement.getBoundingClientRect();
        pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointerNdc, camera);
        const hits = raycaster.intersectObjects(meshes, false);
        if (hits.length > 0) {
          const hitIdx = hits[0].object.userData.index as number;
          setDrawerItem(items[hitIdx]);
          setActiveIndex(hitIdx);
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // GSAP ScrollTrigger scrub rotates the 3D orbital ring smoothly on scroll
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 0.8,
        onUpdate: (self) => {
          orbitStateRef.current.scrollOffset = -self.progress * Math.PI * 1.65;
        },
      });
    }, section);

    let rafId = 0;
    const renderLoop = (t: number) => {
      const s = orbitStateRef.current;
      if (!s.isDragging && Math.abs(s.velocity) > 0.0001) {
        s.dragOffset += s.velocity;
        s.velocity *= 0.94;
      }

      s.targetRotation = s.scrollOffset + s.dragOffset;
      s.currentRotation += (s.targetRotation - s.currentRotation) * 0.12;
      ringGroup.rotation.y = s.currentRotation;

      // Determine frontmost card & subtle hover/floating wave
      let bestZ = -Infinity;
      let frontIdx = 0;
      const worldVec = new THREE.Vector3();

      meshes.forEach((mesh, idx) => {
        const holder = mesh.parent as THREE.Object3D;
        holder.position.y = Math.sin(t * 0.0014 + idx * 1.1) * 0.11;
        const targetScale = s.hoveredIndex === idx ? 1.07 : 1.0;
        holder.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.14);

        mesh.getWorldPosition(worldVec);
        if (worldVec.z > bestZ) {
          bestZ = worldVec.z;
          frontIdx = idx;
        }
      });

      setActiveIndex((prev) => (prev === frontIdx ? prev : frontIdx));
      renderer?.render(scene, camera);
      rafId = window.requestAnimationFrame(renderLoop);
    };

    rafId = window.requestAnimationFrame(renderLoop);

    const onResize = () => {
      if (!host || !renderer) return;
      const w = Math.max(host.clientWidth, 320);
      const h = Math.max(host.clientHeight, 360);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      ctx.revert();
      cardGeom.dispose();
      ringTrackGeom.dispose();
      ringTrackMat.dispose();
      backMat.dispose();
      meshes.forEach((m) => (m.material as THREE.Material).dispose());
      textures.forEach((tx) => tx.dispose());
      renderer?.dispose();
    };
  }, [isNight, items]);

  const activeItem = items[activeIndex] ?? items[0];
  const hairline = isNight ? 'border-white/10' : 'border-[#163515]/20';
  const mutedText = isNight ? 'text-[#9CAEA0]' : 'text-[#2D5A27]';

  return (
    <section
      id="events"
      ref={sectionRef}
      className={`featured relative border-t ${hairline} py-16 sm:py-24 overflow-hidden`}
    >
      {/* Continuous subtle guide line */}
      <div
        aria-hidden="true"
        className={`hidden lg:block pointer-events-none absolute top-0 bottom-0 left-[37%] w-px ${
          isNight ? 'bg-white/10' : 'bg-[#163515]/10'
        }`}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative">
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className={`font-sans text-xs font-medium ${mutedText}`}>
              Selected Initiatives, Substack &amp; Visuals
            </span>
          </div>
          <p className="font-sans text-xs opacity-70">
            Scroll or drag 3D ring · Click card to inspect
          </p>
        </div>

        {/* Flanking Typography + Centered 3D WebGL Orbital Canvas */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center min-h-[430px] sm:min-h-[520px] gap-4">
          {/* Left Flanking Headline (`Work`) */}
          <div className="lg:col-span-3 z-10 pointer-events-none">
            <span className="block font-serif font-medium tracking-tight leading-none text-[clamp(2.5rem,5vw,4.5rem)]">
              Work
            </span>
            <span className={`mt-2 block font-sans text-xs font-medium ${mutedText}`}>
              {items.length} Curated Works
            </span>
          </div>

          {/* Center WebGL Orbital Ring Host */}
          <div className="lg:col-span-6 relative h-[370px] sm:h-[460px] w-full">
            <div
              ref={canvasHostRef}
              aria-label="3D orbital ring of Avani events, Substack articles, and infographic"
              className="w-full h-full touch-pan-y select-none"
            />
            {!webglReady && (
              <div className={`inset-0 flex items-center justify-center p-6 border ${hairline}`}>
                <p className="font-mono text-xs">Interactive 3D showcase fallback ready below.</p>
              </div>
            )}
          </div>

          {/* Right Flanking Headline (`'24–'26`) */}
          <div className="lg:col-span-3 z-10 text-left lg:text-right pointer-events-none">
            <span className="block font-serif italic font-medium tracking-tight leading-none text-[clamp(2.5rem,5vw,4.5rem)]">
              &apos;24—&apos;26
            </span>
            <span className={`mt-2 block font-sans text-xs font-medium ${mutedText}`}>
              Events &middot; Substack &middot; Action
            </span>
          </div>
        </div>

        {/* Active Focus Readout + Mobile-First Touch Strip for all 8 Orbital Items */}
        <div className={`mt-8 pt-6 border-t ${hairline}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className={`font-sans text-xs font-medium ${mutedText}`}>
                {activeItem.indexLabel} · {activeItem.categoryLabel}
              </span>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold leading-tight">
                {activeItem.title}
              </h2>
              <p className="mt-1 text-sm opacity-80 max-w-2xl">{activeItem.subtitle}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => focusItemByIndex(activeIndex - 1)}
                aria-label="Previous orbital work"
                className={`p-2.5 rounded-full border ${hairline} hover:opacity-75 transition-opacity`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => focusItemByIndex(activeIndex + 1)}
                aria-label="Next orbital work"
                className={`p-2.5 rounded-full border ${hairline} hover:opacity-75 transition-opacity`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDrawerItem(activeItem)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-semibold ${
                  isNight
                    ? 'bg-[#86B87A] text-[#0E1610] hover:bg-[#10B981]'
                    : 'bg-[#163515] text-[#F9FAF7] hover:bg-[#2D5A27]'
                }`}
              >
                <Expand className="w-3.5 h-3.5" />
                <span>Inspect Full Brief</span>
              </button>
              {activeItem.externalUrl && (
                <a
                  href={activeItem.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-full border ${hairline} text-xs font-mono hover:opacity-75`}
                >
                  <span>Open</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Compact 8-Card Selector Strip (responsive 2 cols mobile -> 4/8 cols desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {items.map((item, idx) => {
              const selected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleOpenDrawerAt(idx)}
                  onMouseEnter={() => focusItemByIndex(idx)}
                  className={`group text-left p-2 border transition-all ${
                    selected
                      ? isNight
                        ? 'border-[#86B87A] bg-[#19261B]'
                        : 'border-[#163515] bg-[#DCE7D4]/70'
                      : `${hairline} hover:opacity-90`
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden mb-2">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="180px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className={`font-mono text-[10px] block ${mutedText}`}>
                    {item.indexLabel} · {item.kind.toUpperCase()}
                  </span>
                  <span className="font-serif text-xs font-semibold line-clamp-1">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Click-to-open Editorial Drawer */}
      <OrbitalDrawer
        item={drawerItem}
        onClose={() => setDrawerItem(null)}
        onSelectAdjacent={handleDrawerAdjacent}
      />
    </section>
  );
}
