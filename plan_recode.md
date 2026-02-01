# Plan: Nuclear Recode (Shadcn + Smart Grid)

## Objective
Rebuild the ABRALAS website from scratch using Shadcn UI, focusing on elegance, modern aesthetics, a "Smart Grid" layout, and minimal code.

## Strategy
1.  **Backup**: Move current `src` to `src_legacy` to preserve data and assets.
2.  **Clean Slate**: Create a fresh `src` directory.
3.  **Foundation**: Setup Tailwind CSS with Shadcn variables and utilities.
4.  **Architecture**:
    -   **Single Page Dashboard**: The main view is a responsive "Bento Grid".
    -   **Modal/Sheet Navigation**: Detailed content (Grimoire, Stories) opens in overlay Sheets/Dialogs to maintain context and fluidity (fitting the "God of Paths" theme).
    -   **Smart Components**: Reusable, small components for displaying data.

## Key Components

### 1. The Smart Grid (Bento Layout)
A CSS Grid container that adapts to screen size.
-   **Hero Cell**: Intro text & Sigil (Spans 2x2 or large).
-   **Grimoire Cell**: Preview of entries -> Opens `GrimoireSheet`.
-   **Calendar Cell**: Next event countdown -> Opens `CalendarDialog`.
-   **Relatos Cell**: Scrolling ticker of stories -> Opens `RelatosSheet`.
-   **Altar/Collective Cell**: Live status or link -> Opens `AltarPage`.

### 2. Design System (Shadcn)
-   **Theme**: Dark mode default (Pitch Black/Zinc).
-   **Typography**: Clean sans-serif (Inter/Sora).
-   **Effects**: Glassmorphism (subtle), borders, hover glows.

### 3. Data Integration
-   Reuse `grimoire.json`, `calendar.json`, `relatos.json`.
-   Type-safe interfaces for all data.

## Execution Steps
1.  **Backup**: Rename `src` -> `src_legacy`.
2.  **Scaffold**: Create `src` and core files (`main.tsx`, `App.tsx`, `vite-env.d.ts`).
3.  **Install**: Add Shadcn dependencies.
4.  **Config**: Setup `tailwind.config.js` and `index.css` (CSS Variables).
5.  **Lib**: Create `lib/utils.ts`.
6.  **UI**: Add `Card`, `Sheet`, `Dialog`, `ScrollArea`, `Button`, `Badge`, `Separator`.
7.  **Layout**: Build `BentoGrid` and `BentoItem`.
8.  **Features**:
    -   `HeroSection` (with animated Sigil).
    -   `GrimoireWidget` & `GrimoireView`.
    -   `CalendarWidget` & `CalendarView`.
    -   `RelatosWidget` & `RelatosView`.
9.  **Integration**: Assemble `App.tsx`.
10. **Refinement**: Animations and Responsive adjustments.

## Why this is "Less Code"
-   No complex routing hierarchy (flat state or simple hash routing).
-   Shared UI components reduce styling overhead.
-   JSON data drives the UI directly.
