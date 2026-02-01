# Plan for "Coletivo" Enhancements (Relatos Integration)

## 1. Overview
The "Relatos" (Stories/Reports) feature will be integrated directly into the `CollectivePage`. This enhances the "Collective" aspect by allowing users to share their experiences. We will use a simple JSON file as a local database to store and retrieve these stories.

## 2. Architecture

### File Structure
```
src/
  lib/
    utils.ts          # Utility for class merging
  components/
    ui/               # Shadcn UI components
      button.tsx
      input.tsx
      textarea.tsx
      card.tsx
      label.tsx
      dialog.tsx      # For the submission form
  data/
    relatos.json      # JSON "Database" for stories
  pages/
    CollectivePage.tsx # Enhanced with Relatos feed and submission
```

### Data Flow
1.  **Read**: `CollectivePage` imports `src/data/relatos.json` and initializes state.
2.  **Write (Simulation)**: New submissions are added to the local React state (and would ideally be persisted, but for now we simulate persistence or just use the local state for the session). *Note: Client-side JS cannot write to the file system in production. We will persist via local storage or just session state for this demo, while initializing from the JSON file.*

## 3. Data Model

### `src/data/relatos.json`
```json
[
  {
    "id": "1",
    "name": "Maria S.",
    "email": "hidden",
    "content": "Senti uma energia vibrante durante o ritual da Lua Cheia.",
    "date": "2023-10-27T20:00:00Z"
  },
  ...
]
```

## 4. UI Changes in `CollectivePage`

### New Sections
1.  **Feed de Relatos**: A scrollable section below the "Egrégora" visualizer displaying stories.
2.  **Submission Button**: A button "Enviar Relato" that opens a Dialog/Modal.

### Components Needed
- `Dialog` (Shadcn) for the form.
- `Card` (Shadcn) for each story in the feed.
- `Input`, `Textarea`, `Button` for the form.

## 5. Implementation Steps

1.  **Utils**: Create `src/lib/utils.ts`.
2.  **Components**: Implement `Card`, `Button`, `Input`, `Textarea`, `Dialog`, `Label`.
3.  **Data**: Create `src/data/relatos.json`.
4.  **Page Logic**:
    - Import data.
    - Create `RelatosFeed` component (internal or separate).
    - Create `RelatosForm` component (internal or separate).
    - Update `CollectivePage` layout to accommodate the new section without breaking the existing "Egrégora" vibe.

## 6. Privacy
- The `email` field in the form is collected but explicitly NOT displayed in the feed.

## 7. Verification
- Verify the feed loads data from JSON.
- Verify the form opens and closes.
- Verify "submission" adds the story to the feed (visual confirmation).
