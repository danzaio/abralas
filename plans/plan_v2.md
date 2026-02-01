# Plan V2: ABRALAS Rebirth (Elegant Pitch Black)

## 1. Wipe & Reset
- [ ] Delete `src` directory to remove accumulated clutter.
- [ ] Create directory structure: `src/{assets,components,data,pages,styles}`.

## 2. Core Foundation
- [ ] **Styles**: 
    - `src/index.css`: Force rigid black background (`#000000`).
    - Typography: Inter (primary) or Sora.
    - Colors: Red Accent (`#DC2626`), White Text (`#FFFFFF`), Muted Gray for secondary text.
    - No glassmorphism bloat. Pure solid colors or subtle gradients only if necessary for depth.
- [ ] **Routing**: 
    - `src/main.tsx` & `src/App.tsx` with `react-router-dom`.
    - Simple layout wrapper (if needed) for global navigation.

## 3. Data Restoration
- [ ] Re-create `src/data/grimoire.json` with the original ABRALAS lore (Intro, Etymology, History, Correspondences, Prayer).

## 4. Components & Pages
### Home (Minimalist)
- [ ] Central Element: **The Sigil**. An SVG component.
    - Interactions: Breathing animation on hover.
    - Overlay/Counter: "Total Aberturas" (Total Openings) displayed cleanly.
- [ ] Navigation: discreet menu (hamburger or minimal links) to access other areas.

### Altar (Virtual Space)
- [ ] **Candles**: Visual representation of the Liturgy.
    - Interactive/Animated flames.
    - Colors corresponding to the intent (Red/Orange/Yellow per lore).

### Library (The Grimoire)
- [ ] Clean, readable text layout.
- [ ] Accordion or vertical scroll for sections (Intro, Prayer, etc.).
- [ ] Serif font usage for headers to evoke "ancient text" feel? Or stick to strict Sans for modern elegance. *Decision: Stick to Sans (Sora) for consistent modern elegance.*

### Calendar (Planetary Time)
- [ ] Logic to determine current Planetary Day.
    - **Sunday**: Sun (Sol). Colors: Yellow/Gold.
    - **Wednesday**: Mercury (Mercurius). Colors: Orange/Multicolor.
    - *Note: Provide context for other days if they are relevant, or focus on ABRALAS prime days.*

## 5. Technical Details
- **Tailwind**: Ensure config extends colors with `abralas-red` and `abralas-black`.
- **State**: Simple local state or Context for the Counter/Altar.

## 6. Execution Order
1. Delete `src`.
2. Setup `main.tsx`, `App.tsx`, `index.css`.
3. Restore `grimoire.json`.
4. Implement Home (Sigil + Layout).
5. Implement Library (Read data).
6. Implement Altar.
7. Implement Calendar.
