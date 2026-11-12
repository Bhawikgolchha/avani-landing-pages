import { AVANI_EVENTS, EXTERNAL_LINKS, CLIMATE_TIPS } from '@/lib/avaniContent';

export type OrbitalWorkKind = 'event' | 'substack' | 'infographic';

export interface OrbitalWorkItem {
  id: string;
  indexLabel: string;
  kind: OrbitalWorkKind;
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  dateOrLocation: string;
  imageUrl: string;
  externalUrl?: string;
  externalLabel?: string;
  videoPreviewUrl?: string;
  metrics?: { label: string; value: string }[];
  tags: string[];
  accentHex: string;
}

/**
 * Derives the 8 cards displayed on the Three.js 3D Orbital Work Ring directly
 * from `src/lib/avaniContent.ts`:
 * - 4 Flagship Community Events
 * - 3 Verified Substack Investigations
 * - 1 Canva Infographic & Visual Mood Board Feature Card
 */
export function getOrbitalWorkItems(): OrbitalWorkItem[] {
  const eventItems: OrbitalWorkItem[] = AVANI_EVENTS.map((ev, idx) => ({
    id: ev.id,
    indexLabel: `0${idx + 1}`,
    kind: 'event',
    categoryLabel: 'Flagship Event',
    title: ev.title,
    subtitle: ev.subtitle,
    description: ev.verbatimCopy ?? ev.description ?? ev.subtitle,
    dateOrLocation: `${ev.location} · ${ev.timeframe}`,
    imageUrl: ev.image,
    videoPreviewUrl:
      idx % 2 === 0
        ? '/assets/videos/canopy_bioluminescent_loop.mp4'
        : '/assets/videos/biosphere_telemetry_loop.mp4',
    metrics: ev.metrics,
    tags: ev.tags ?? [],
    accentHex: idx % 2 === 0 ? '#568203' : '#2D5A27',
  }));

  const substackItems: OrbitalWorkItem[] = EXTERNAL_LINKS.substackArticles.map((art, idx) => ({
    id: `substack-${art.id}`,
    indexLabel: `0${eventItems.length + idx + 1}`,
    kind: 'substack',
    categoryLabel: 'Substack Essay',
    title: art.title,
    subtitle: art.subtitle,
    description: `Published ${art.publishedDate} by Avani's Research & Writing team on Substack. Click below to read the full investigation.`,
    dateOrLocation: `Substack · ${art.publishedDate}`,
    imageUrl:
      idx === 0
        ? '/assets/images/hero_nature_canopy.webp'
        : idx === 1
        ? '/assets/images/hero_ecotech_globe.webp'
        : '/assets/videos/canopy_poster.webp',
    externalUrl: art.url,
    externalLabel: 'Read Essay on Substack',
    metrics: [
      { label: 'Published', value: art.publishedDate },
      { label: 'Desk', value: 'Research & Writing' },
    ],
    tags: ['Substack', 'Climate Journalism', 'Avani Research'],
    accentHex: '#1A4B4E',
  }));

  const infographicItem: OrbitalWorkItem = {
    id: 'avani-canva-infographic',
    indexLabel: '08',
    kind: 'infographic',
    categoryLabel: 'Visual Artifact',
    title: '11 Climate Tips Infographic & Mood Board',
    subtitle: 'Canva editorial visual guide & daily action poster crafted by Avani Design',
    description: `Companion visual guide illustrating all ${CLIMATE_TIPS.length} everyday climate habits alongside Avani's Canva brand mood boards in Cream (#F9FAF7), Tea Green (#DCE7D4), and Forest Green (#163515).`,
    dateOrLocation: 'Avani Design Studio · Canva Archive',
    imageUrl: '/assets/images/climate_tips_infographic.webp',
    externalUrl: EXTERNAL_LINKS.canvaMoodBoard1,
    externalLabel: 'Open Canva Mood Board',
    videoPreviewUrl: '/assets/videos/canopy_bioluminescent_loop.mp4',
    metrics: [
      { label: 'Daily Actions', value: `${CLIMATE_TIPS.length} Tips` },
      { label: 'Boards Linked', value: '2 Canva Files' },
    ],
    tags: ['Infographic', 'Canva Mood Board', 'Brand System'],
    accentHex: '#10B981',
  };

  return [...eventItems, ...substackItems, infographicItem];
}
