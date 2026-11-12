# Avani Landing Pages — Swiss Botanical bleibtgleich.dev Replica Checklist

## Phase 1: Setup & Route Migration
- ✅ Install verified `greensock/gsap-skills` (`gsap-core`, `gsap-scrolltrigger`, `gsap-plugins`) & upgrade `gsap@^3.15.1`
- ✅ Relocate Dual-Prototype Comparison Hub from `src/app/page.tsx` to `src/app/hub/page.tsx`
- ✅ Update `Navbar.tsx` & `Footer.tsx` routes (`/` -> Avani Editorial, `/hub` -> Showcase Hub, Daylight/GlowGarden Night toggle support)

## Phase 2: Swiss Botanical Bleibtgleich Components
- ✅ Build `ThemeTransitionOverlay.tsx` (Daylight Botanical `#F9FAF7`/`#163515`/`#DCE7D4` <-> GlowGarden Night `#08140B`/`#6EE7B7` overlay transition)
- ✅ Build `EditorialHeroSpine.tsx` (37% vertical hairline spine, logo + Canva links metadata, GSAP `SplitText` staggered display typography, ambient video vignette, sticky split `AVANI` / `YOUTH` wordmark + live scroll %)
- ✅ Build `OrbitalWorkRing.tsx` + `OrbitalDrawer.tsx` (Three.js curved orbital floating card ring with double-sided non-mirrored tactile backs, 4 Flagship Events + 3 Substack Essays + Canva Infographic preview, scroll-scrub + pointer drag momentum, click-to-open drawer, mobile touch carousel fallback)
- ✅ Build `SwissIndexTable.tsx` (4-column hairline index with interactive Objectives [5] · Teams [5] · Climate Tips [11] & Climate Quiz tabs)
- ✅ Build `ManifestoFooter.tsx` (Closing staggered manifesto, 6-step `NAME_AVANI_SUBMISSION` instructions + Google Form CTA, direct contacts `+91 8050931769` & `avaniyocc@gmail.com`, circular social buttons, oversized `AVANI` wordmark)
- ✅ Assemble `src/app/page.tsx` uniting Lenis + GSAP ScrollTrigger choreography + `ThemeProvider` + `Navbar` + all 4 sections

## Phase 3: Tests, Build & Visual Verification
- ✅ Update E2E test references (`t1_f09`, `t2_f06_f09`, `t2_f14_f16`, `t3`, `t4`, `t1_f16`) for `/hub` migration & add `t1_f17_bleibtgleich_replica.test.js` (`237/237` passing)
- ✅ Pass `npm test` (`10/10`), `npm run lint` (`0` warnings), `npx tsc --noEmit` (`0` errors), `node tests/e2e/runner.js` (`237/237`), and `npm run build`
- ⬜ Final post-fix live Brave CDP screenshot verification & `walkthrough.md` update
