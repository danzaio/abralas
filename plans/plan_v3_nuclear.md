# Plan V3: The Nuclear Reset

The user has requested a complete re-code from scratch, including killing npm processes and reinstalling dependencies. This addresses potential underlying build/cache issues or simply ensures a pristine state.

## 1. System Purge
- [ ] **Kill Processes**: Ensure no `vite` or `node` processes are locking files.
- [ ] **Deep Clean**:
    - Delete `node_modules`.
    - Delete `src` directory.
    - Delete `package-lock.json`.
    - Delete `dist` (if exists).

## 2. Re-Initialization
- [ ] **Dependencies**: Run `npm install` to get a fresh `node_modules` tree.
- [ ] **Structure**: Create `src` and subdirectories (`pages`, `data`, `styles`).

## 3. Code Reconstruction (Strict)
- [ ] **Configuration**:
    - `tailwind.config.js`: Ensure "Elegant Pitch Black" configuration.
    - `vite.config.ts`: Verify settings.
    - `index.html`: Clean head, proper font imports (Inter/Sora).
- [ ] **Core**:
    - `src/index.css`: CSS Variables for Black/Red/White.
    - `src/main.tsx`: Entry point.
    - `src/App.tsx`: Routing hub.
- [ ] **Pages** (Ensure correct `export default`):
    - `src/pages/HomePage.tsx`: Sigil, Counter, Menu.
    - `src/pages/LibraryPage.tsx`: Grimoire viewer.
    - `src/pages/AltarPage.tsx`: Interactive Candles.
    - `src/pages/CalendarPage.tsx`: Planetary Day logic.
- [ ] **Data**:
    - `src/data/grimoire.json`: Lore content.

## 4. Launch & Verify
- [ ] Start development server (`npm run dev`).
- [ ] Verify no runtime errors (specifically looking out for "does not provide an export" errors).
