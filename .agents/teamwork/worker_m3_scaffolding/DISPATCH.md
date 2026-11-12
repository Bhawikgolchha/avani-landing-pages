## 2026-11-12T09:06:29Z

You are the Worker agent for Milestone M3 (Core Scaffolding & Shared Base) of the Avani Landing Pages project.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

MANDATORY INPUTS — READ THESE BEFORE STARTING:
1. `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/ORIGINAL_REQUEST.md`
2. `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md`
3. `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m3_scaffolding/SCOPE.md`
4. `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_m3_arch/report.md`
5. `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_m3_content/report.md`
6. `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_m3_components/report.md`

WORKING DIRECTORY:
`/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`

YOUR STATE FOLDER:
`/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m3_scaffolding`

FILE OWNERSHIP (Exclusive write access):
- `package.json`, `package-lock.json`
- `tsconfig.json`
- `next.config.mjs`
- `tailwind.config.ts`
- `postcss.config.mjs`
- `.eslintrc.json`
- `.gitignore`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/prototype-1/page.tsx`
- `src/app/prototype-2/page.tsx`
- `src/lib/avaniContent.ts`
- `src/components/common/Navbar.tsx`
- `src/components/common/Footer.tsx`
- `src/hooks/useLenis.ts`
- `public/` assets (create directory and copy/link any static assets if needed)

TASK SPECIFICATIONS:
1. Scaffold Next.js 14 App Router project directly into `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`:
   - Follow Strategy A (Direct Configuration Authoring) from `explorer_m3_arch/report.md § 1` so you do not collide with `.agents/` or existing files.
   - Pinned React version: `react@18.3.1` and `react-dom@18.3.1`.
   - Production dependencies: `next@14.2.35`, `three@^0.165.0`, `@types/three@^0.165.0`, `@react-three/fiber@^8.18.0`, `@react-three/drei@^9.122.0`, `gsap@^3.15.1`, `lenis@^1.3.27`, `framer-motion@^11.18.2`, `lucide-react@^0.395.0`.
   - Dev dependencies: `typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `tailwindcss`, `postcss`, `autoprefixer`, `eslint`, `eslint-config-next`.
   - Run `npm install` and verify 0 peer dependency errors.
2. Setup configurations:
   - `tsconfig.json` with `"paths": { "@/*": ["./src/*"] }` and `"jsx": "preserve"`.
   - `next.config.mjs` with `transpilePackages: ['three']` and reactStrictMode: true.
   - `tailwind.config.ts` with Avani 7 brand colors (`#163515`, `#D0E8C5`, `#8ED1E0`, `#22C55E`, `#0F2410`, `#F9FAF7`, `#1A201C`) and typography tokens (Cinzel, Plus Jakarta Sans, JetBrains Mono) as specified in `explorer_m3_arch/report.md § 3`.
   - `postcss.config.mjs` with tailwindcss and autoprefixer.
   - `.eslintrc.json` extending `next/core-web-vitals`.
3. Implement `src/lib/avaniContent.ts`:
   - Use the complete, verbatim TypeScript code provided in `explorer_m3_content/report.md § 5`.
   - Must contain all 5 objectives, 5 teams, 4 flagship events, 11 climate tips, all 7 external links, 3 rich Substack articles, and 6 application form steps.
   - Export `AVANI_CONTENT`, `AVANI_OBJECTIVES`, `AVANI_TEAMS`, `AVANI_EVENTS`, `CLIMATE_TIPS`, `EXTERNAL_LINKS`, and full TypeScript types.
4. Implement shared UI components:
   - `src/components/common/Navbar.tsx`: Avani brand logo ("Earth In Our Hands"), navigation links, Join Cohort 2025 CTA (external Google Form), responsive pathname-aware Prototype Switcher (`/` Hub, `/prototype-1` Living Canopy, `/prototype-2` Eco-Tech Biosphere), mobile hamburger drawer. Code in `explorer_m3_components/report.md § 1`.
   - `src/components/common/Footer.tsx`: Universal 4-column footer with all verified social links, direct contacts (`theavaniorg@gmail.com`, `+91 91191 19307`), 3 Substack articles, cohort recruitment callout, and legal copyright. Code in `explorer_m3_components/report.md § 2`.
   - `src/hooks/useLenis.ts`: Lenis smooth scroll hook integrated with GSAP ScrollTrigger ticker and lagSmoothing(0). Code in `explorer_m3_components/report.md § 3`.
5. Implement Routes:
   - `src/app/layout.tsx`: Root layout with Google Fonts (`Cinzel`, `Plus_Jakarta_Sans`, `JetBrains_Mono`), Navbar, Footer, and Lenis smooth scroll.
   - `src/app/globals.css`: Base Tailwind styles, custom scrollbar, root font variables.
   - `src/app/page.tsx`: Comparison Showcase Hub with hero, dual interactive prototype preview cards, 8-dimension feature matrix, and Avani mission overview. Code in `explorer_m3_components/report.md § 4`.
   - `src/app/prototype-1/page.tsx`: Living Canopy shell stub with dynamic `{ ssr: false }` WebGL canvas container and narrative chapter overlays. Code in `explorer_m3_components/report.md § 5`.
   - `src/app/prototype-2/page.tsx`: Eco-Tech Biosphere shell stub with dynamic `{ ssr: false }` WebGL canvas container and telemetry HUD overlays. Code in `explorer_m3_components/report.md § 6`.
6. Verification & Build:
   - Run `npm run build` and `npm run lint`.
   - Verify exit code 0, zero lint errors, and zero type errors.
   - Verify all 3 routes (`/`, `/prototype-1`, `/prototype-2`) compile as static / prerendered pages without SSR hydration crashes.
7. Report:
   - Write your progress to `.agents/teamwork/worker_m3_scaffolding/progress.md`.
   - Write your completion handoff report to `.agents/teamwork/worker_m3_scaffolding/handoff.md`. Include exact build commands, outputs, and verified file paths.
   - Send completion message to this orchestrator via send_message.
