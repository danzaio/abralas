# Plan for "Relatos" (Reports/Testimonials) Page

## 1. Overview
Design and implement a new page "Relatos" where users can submit stories/testimonials. The page will include a submission form and a list of mock community stories.

## 2. Architecture

### File Structure
```
src/
  lib/
    utils.ts          # Utility for class merging (required for shadcn)
  components/
    ui/               # Shadcn UI components
      button.tsx
      input.tsx
      textarea.tsx
      card.tsx
      label.tsx
  pages/
    RelatosPage.tsx   # Main page component
  data/
    relatos.json      # Mock data for community stories
```

### Routing
- **Path**: `/relatos`
- **Integration**: Add to `App.tsx` routes and `Layout.tsx` navigation bar.

## 3. Data Model

### Interface: `Relato`
```typescript
interface Relato {
  id: string;
  name?: string;      // Optional (defaults to "Anônimo")
  email: string;      // Required (Private, never displayed)
  content: string;    // The story
  date: string;       // ISO Date
}
```

### Mock Data Strategy
- A local JSON file or array in the component to simulate fetched data.
- State management in `RelatosPage` to handle new submissions (appending to the list temporarily).

## 4. UI Design & Components

### Layout
- **Header**: Title "Relatos" with a subtitle explaining the purpose.
- **Submission Form**:
  - Name (Input, Optional)
  - Email (Input, Required, marked private)
  - Story (Textarea, Required)
  - Submit Button
- **Feed**: A vertical list of `Card` components displaying submitted stories.

### Shadcn Components
Since the project does not have the CLI configured, we will manually implement the necessary components using `tailwind-merge` and `clsx` (already in dependencies).

1.  **Button**: Standard variant.
2.  **Input**: For text fields.
3.  **Textarea**: For the main content.
4.  **Card**: `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`.
5.  **Label**: For form accessibility.

## 5. Implementation Steps

1.  **Setup Utilities**: Create `src/lib/utils.ts`.
2.  **Create Components**: Add `Button`, `Input`, `Textarea`, `Card`, `Label` to `src/components/ui`.
3.  **Create Mock Data**: Create initial list of stories.
4.  **Develop Page**: Build `src/pages/RelatosPage.tsx` with the form and feed.
5.  **Integrate**:
    - Add Route in `App.tsx`.
    - Add Link in `Layout.tsx`.

## 6. Verification
- Verify the form validates the Email field.
- Verify the Email is NOT shown in the feed.
- Verify the layout responsiveness (mobile/desktop).
