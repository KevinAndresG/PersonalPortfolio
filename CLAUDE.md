# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server
npm run build     # tsc + vite build
npm run lint      # eslint (0 max-warnings)
npm run preview   # preview production build
```

No test suite configured.

## Stack

React 18 + TypeScript + Vite (SWC). SCSS modules per component. Framer Motion for page transitions. `react-intl` for i18n. `react-router-dom` v6 for routing. `scrollreveal` and `matter-js` for visual effects.

## Architecture

**Entry:** `src/main.tsx` → `src/Routes/Router.tsx`

**Routing:** Four pages — `/home`, `/about`, `/work`, `/knowledge`. `AnimatePresence` wraps `<Routes>` for page transitions. `Header`/`Footer` are outside the routes (always visible). `CustomCursor` renders only when `screenWidth > 768`.

**i18n:** Two-layer context pattern.
- Outer `LanguageProvider` (in `Router.tsx`) wraps everything in `IntlProvider` — reads `state.messages` from context.
- Inner `LanguageProvider` (`src/Contexts/LanguageSelector/Index.tsx`) owns the reducer + `changeLanguage` function, persists choice to `localStorage`.
- Translation files: `src/lang/en.json` and `src/lang/es.json`.
- Pages wrap their content in a second `<IntlProvider>` using the same `state.messages` — this is a pattern in use, not a bug.

**Models:** `src/models/LogicItems/LogicItems.ts` (LogicItem interface with ReactElement fields), `src/models/LogicItems/Workinfo.ts` (WorkInfo with title/img/url/techs).

**Components:** Each component lives in `src/Components/<Name>/` with a `.tsx` and co-located `.scss`. Pages live in `src/Pages/<Name>/`.

**Assets:** SVGs and PNGs in `src/assets/`. Tech icons follow `<TechName>Techs.svg` naming (used in Knowledge page), social icons are plain `<Name>.svg`.
