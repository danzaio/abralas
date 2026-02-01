# Separation of Collective and Relatos Pages

## Overview
The user requested to separate the "Relatos" (Testimonials) functionality from the "Collective" (Egrégora Ritual) page.

## 1. Create `src/pages/RelatosPage.tsx`
*   **Purpose**: Display testimonials and allow users to submit new ones.
*   **Components**:
    *   List of cards displaying `relatos.json` content.
    *   "Relatar" button opening a Dialog with a form.
    *   Form fields: Name (optional), Email (required, hidden publicly), Story.
*   **Data**: Import from `src/data/relatos.json`.
*   **UI**: Use existing `shadcn` components (`Card`, `Button`, `Dialog`, `Input`, `Textarea`).

## 2. Refactor `src/pages/CollectivePage.tsx`
*   **Purpose**: A digital altar/ritual space for the Egrégora.
*   **Features**:
    *   "Connect" button to join the circle.
    *   Visualization of "Candles" or "Energies" representing connected users.
    *   Display list of connected users (mocked via a new `src/data/online_users.json` or state).
    *   **Visuals**: Keep the "Sigil" or "Flame" animation.
*   **Data**: Use a new mock file `src/data/egregora.json` or just local state to simulate the "db of users".

## 3. Update Routing & Navigation
*   **`src/App.tsx`**:
    *   Keep `/coletivo` for `CollectivePage`.
    *   Add `/relatos` for `RelatosPage`.
*   **`src/components/Layout.tsx`**:
    *   Add "Relatos" to the sidebar/navigation menu.

## 4. Implementation Steps
1.  **Extract**: Move the "Relatos" logic (state, handlers, JSX) from `CollectivePage.tsx` to a new `RelatosPage.tsx`.
2.  **Clean up**: Remove "Relatos" code from `CollectivePage.tsx`. Focus it on the "Candle/Energy" ritual.
3.  **Enhance Collective**: Implement the "Candle/User connection" logic if not already fully present (simulating the "json db" update).
4.  **Register**: Update `App.tsx` and `Layout.tsx`.

## Data Structure for `egregora.json` (Mock DB)
```json
{
  "active_users": [
    { "id": "1", "name": "Anonymous", "status": "meditating", "timestamp": "..." }
  ],
  "total_energy": 100
}
```
