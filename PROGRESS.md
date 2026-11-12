# Progress Log

## 2026-11-12 — Avani × `bleibtgleich.dev` Botanical Replica
- Installed verified GreenSock skills (`gsap-core`, `gsap-scrolltrigger`, `gsap-plugins`) in `.agents/skills/` and upgraded `gsap@^3.15.1`.
- Relocated Showcase Hub from `/` to `/hub` (`src/app/hub/page.tsx`), updating `Navbar.tsx` and `Footer.tsx` routes.
- Built all 4 architectural editorial sections (`EditorialHeroSpine`, `OrbitalWorkRing` + `OrbitalDrawer`, `SwissIndexTable`, `ManifestoFooter`) wrapped in `ThemeTransitionOverlay` inside `src/app/page.tsx`.
- Visual audit caught two polish items: fixed duplicate inline `NAME_AVANI_SUBMISSION` token in Step 02 of `ManifestoFooter.tsx` and eliminated mirrored backfaces on rear WebGL orbital cards by adding paired non-mirrored `FrontSide` backplates in `OrbitalWorkRing.tsx`.
- Verified `npm test` (10/10), `npm run lint` (0 warnings), `tsc --noEmit` (0 errors), `node tests/e2e/runner.js` (237/237), and `npm run build`. Running final post-fix CDP visual check next.
