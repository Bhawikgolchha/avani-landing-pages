# Scope: M3 — Core Scaffolding & Shared Base

## Objective
Initialize the Next.js 14 App Router project with all necessary 3D, animation, and styling dependencies, implement the universal Avani content model (`src/lib/avaniContent.ts`), create global styling and layouts, universal Navbar and Footer, and the central Comparison Hub (`src/app/page.tsx`).

## Deliverables Status: DONE
- `package.json` with Next.js 14.2.15, React 18, TypeScript, Tailwind CSS, Three.js, `@react-three/fiber`, `@react-three/drei`, `gsap`, `@studio-freight/lenis`, `lenis`, `lucide-react`, `clsx`, `tailwind-merge` [DONE]
- Configurations: `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs` [DONE]
- `src/lib/avaniContent.ts` containing verbatim PDF/briefing data: [DONE]
  - 5 organizational objectives
  - 5 teams (Research & Writing, Design, HR & Comms, Social Media, Event Planning)
  - 4 events (DPS Donation Drive, Invictus Denim Stall, Aarogi Orphanage Drive, Beyond Waste Workshop)
  - 11 climate action tips
  - All external links (Application Form, LinkedIn, Substack, Instagram, Substack articles, Email, Phone)
- `src/components/common/Navbar.tsx` (responsive, prototype switcher, Avani logo) [DONE]
- `src/components/common/Footer.tsx` (all social links, contact email, phone number, copyright) [DONE]
- `src/app/page.tsx` (Comparison Hub showcasing both prototypes with design philosophy and live route links) [DONE]
- Stubs for `src/app/prototype-1/page.tsx` and `src/app/prototype-2/page.tsx` [DONE]
- Passing `npm run build`, `npm run lint`, and `npm test` with exit code 0 [DONE]

## Verification Gate Summary
- **Worker**: worker_m3_1 (DONE)
- **Reviewers**: reviewer_m3_1 (APPROVE), reviewer_m3_2 (APPROVE)
- **Challengers**: challenger_m3_1 (APPROVE), challenger_m3_2 (APPROVE)
- **Auditor**: auditor_m3_1 (CLEAN — zero integrity violations)
- **Final Gate**: PASS
