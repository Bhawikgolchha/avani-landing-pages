'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ArrowUpRight, MapPin, Tag } from 'lucide-react';
import { OrbitalWorkItem } from './orbitalWorkItems';
import { useAvaniTheme } from './ThemeTransitionOverlay';

interface OrbitalDrawerProps {
  item: OrbitalWorkItem | null;
  onClose: () => void;
  onSelectAdjacent: (delta: number) => void;
}

/**
 * Editorial detail drawer opened when clicking any card on the 3D Orbital Work Ring.
 */
export function OrbitalDrawer({ item, onClose, onSelectAdjacent }: OrbitalDrawerProps) {
  const { isNight } = useAvaniTheme();

  useEffect(() => {
    if (!item) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelectAdjacent(1);
      if (e.key === 'ArrowLeft') onSelectAdjacent(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [item, onClose, onSelectAdjacent]);

  if (!item) return null;

  const surface = isNight
    ? 'bg-[#08140B] text-[#DCE7D4] border-[#6EE7B7]/30'
    : 'bg-[#F9FAF7] text-[#163515] border-[#163515]/25';
  const hairline = isNight ? 'border-[#6EE7B7]/20' : 'border-[#163515]/20';
  const badgeStyle = isNight
    ? 'bg-[#0D200C] text-[#6EE7B7] border-[#6EE7B7]/30'
    : 'bg-[#DCE7D4] text-[#163515] border-[#163515]/20';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="orbital-drawer-title"
      className="fixed inset-0 z-[80] flex justify-end bg-[#08140B]/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-xl h-full overflow-y-auto border-l ${surface} p-6 sm:p-8 flex flex-col justify-between shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Top Bar */}
          <div className={`pb-4 border-b ${hairline} flex items-center justify-between gap-4`}>
            <div className="flex items-center gap-2.5">
              <span className={`px-2.5 py-1 rounded-full border font-mono text-[11px] uppercase ${badgeStyle}`}>
                {item.indexLabel} · {item.categoryLabel}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close work detail drawer"
              className={`p-2 rounded-full border ${hairline} hover:opacity-75 transition-opacity`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Visual Stage (Image + optional Motion Loop) */}
          <div className={`mt-6 relative aspect-[16/10] w-full overflow-hidden border ${hairline}`}>
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-cover"
            />
          </div>

          {item.videoPreviewUrl && (
            <div className={`mt-3 relative h-20 w-full overflow-hidden border ${hairline}`}>
              <video
                src={item.videoPreviewUrl}
                autoPlay
                loop
                muted
                playsInline
                aria-label={`${item.title} ambient atmospheric preview`}
                className="w-full h-full object-cover opacity-85"
              />
              <span className="absolute bottom-1.5 right-2 font-mono text-[10px] uppercase tracking-wider text-[#F9FAF7] bg-[#08140B]/75 px-2 py-0.5">
                Ambient Loop
              </span>
            </div>
          )}

          {/* Editorial Title & Verbatim Narrative */}
          <div className="mt-6">
            <p className="font-mono text-xs uppercase tracking-wider opacity-70 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{item.dateOrLocation}</span>
            </p>
            <h3
              id="orbital-drawer-title"
              className="mt-2 font-serif text-2xl sm:text-3xl font-bold leading-tight"
            >
              {item.title}
            </h3>
            <p className="mt-1.5 text-sm font-medium opacity-80">{item.subtitle}</p>
            <p className={`mt-5 pt-5 border-t ${hairline} text-sm sm:text-base leading-relaxed`}>
              {item.description}
            </p>
          </div>

          {/* Key Impact Metrics */}
          {item.metrics && item.metrics.length > 0 && (
            <div className={`mt-6 pt-5 border-t ${hairline} grid grid-cols-2 sm:grid-cols-3 gap-3`}>
              {item.metrics.map((m) => (
                <div
                  key={m.label}
                  className={`p-3 border ${hairline} ${
                    isNight ? 'bg-[#0D200C]/60' : 'bg-white/75'
                  }`}
                >
                  <span className="font-serif text-xl font-bold block">{m.value}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider opacity-70">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center gap-1 px-2.5 py-1 border ${hairline} font-mono text-[11px]`}
              >
                <Tag className="w-3 h-3 opacity-60" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions & Ring Navigation */}
        <div className={`mt-8 pt-5 border-t ${hairline} flex flex-wrap items-center justify-between gap-3`}>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectAdjacent(-1)}
              className={`px-3.5 py-2 border ${hairline} font-mono text-xs uppercase hover:opacity-75`}
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={() => onSelectAdjacent(1)}
              className={`px-3.5 py-2 border ${hairline} font-mono text-xs uppercase hover:opacity-75`}
            >
              Next →
            </button>
          </div>

          {item.externalUrl && (
            <a
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-semibold ${
                isNight
                  ? 'bg-[#6EE7B7] text-[#08140B] hover:bg-[#10B981]'
                  : 'bg-[#163515] text-[#F9FAF7] hover:bg-[#2D5A27]'
              }`}
            >
              <span>{item.externalLabel ?? 'Open Source Link'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
