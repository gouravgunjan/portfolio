# Panel 2: The Blueprint - Development Plan

## 1. Component and Asset Structure

-   [ ] Create a new component file: `src/components/panels/Blueprint.tsx`
-   [ ] Create a new module SCSS file: `src/components/panels/Blueprint.module.scss`
-   [ ] Create a dedicated asset folder: `src/assets/panels/blueprint/`

## 2. Background

-   [ ] Implement the dark blueprint grid background (`#0D1B2A`) with glowing cyan lines in `Blueprint.module.scss`.
-   [ ] Write a screenshot test to verify the look of the grid.
-   [ ] Commit changes with message: `feat(panel-2): implement blueprint grid background`

## 3. On-Screen Elements

### 3.1. UI Wireframes

-   [ ] Create SVG assets for the UI wireframes in `src/assets/panels/blueprint/`.
-   [ ] Create a new component: `src/components/panels/blueprint/Wireframe.tsx`
-   [ ] Implement the line-by-line drawing animation.
-   [ ] Write an E2E test to verify the drawing animation.
-   [ ] Commit changes with message: `feat(panel-2): create wireframe component with drawing animation`

### 3.2. Backend Architecture Diagram

-   [ ] Create an SVG asset for the backend architecture diagram in `src/assets/panels/blueprint/`.
-   [ ] Create a new component: `src/components/panels/blueprint/ArchitectureDiagram.tsx`
-   [ ] Implement the animated lines showing data flow. The diagram should be less prominent (lower opacity).
-   [ ] Write an E2E test to verify the data flow animation.
-   [ ] Commit changes with message: `feat(panel-2): create architecture diagram component with animation`

### 3.3. Key Summary Text

-   [ ] Create a new component: `src/components/panels/blueprint/SummaryText.tsx`
-   [ ] Implement the typewriter effect for the text.
-   [ ] Write an E2E test to verify the typewriter animation.
-   [ ] Commit changes with message: `feat(panel-2): create summary text component with typewriter animation`

## 4. Morphing to Panel 3 (The Toolkit)

-   [ ] Implement the morphing animation for the blueprint grid lines to rotate in 3D and form the perspective grid of the toolkit panel.
-   [ ] Implement the animation for the UI wireframes to dissolve into particles that reform into the technology icons.
-   [ ] Implement the fade-out animation for the backend architecture diagram.
-   [ ] Implement the morphing animation for the summary text to transform into the competency titles of the next panel.
-   [ ] Write an E2E test to verify the entire morphing sequence.
-   [ ] Commit changes with message: `feat(panel-2): implement morphing transition to panel 3`
