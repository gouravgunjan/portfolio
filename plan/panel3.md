# Panel 3: The Toolkit - Development Plan

## 1. Component and Asset Structure

-   [ ] Create a new component file: `src/components/panels/Toolkit.tsx`
-   [ ] Create a new module SCSS file: `src/components/panels/Toolkit.module.scss`
-   [ ] Create a dedicated asset folder: `src/assets/panels/toolkit/`

## 2. Background and Grid

-   [ ] Implement the clean, dark, professional background (`#1A1A1A`) in `Toolkit.module.scss`.
-   [ ] Create a new component: `src/components/panels/toolkit/PerspectiveGrid.tsx`
-   [ ] Implement the 3D perspective grid that recedes into the distance.
-   [ ] Add a slow rotation animation to the grid.
-   [ ] Write an E2E test to verify the rotation animation.
-   [ ] Commit changes with message: `feat(panel-3): implement 3D perspective grid`

## 3. On-Screen Elements

### 3.1. Technology Icons

-   [ ] Download or create SVG logos for all required technologies and place them in `src/assets/panels/toolkit/`.
-   [ ] Create a new component: `src/components/panels/toolkit/TechIcon.tsx`
-   [ ] Implement the subtle pulse or slight rotation on hover effect.
-   [ ] Write an E2E test to verify the hover effect.
-   [ ] Commit changes with message: `feat(panel-3): create tech icon component with hover effect`

### 3.2. Competency Titles

-   [ ] Create a new component: `src/components/panels/toolkit/CompetencyTitle.tsx`
-   [ ] Implement the glowing effect for the title and corresponding icons on scroll.
-   [ ] Write an E2E test to verify the scroll-based glowing effect.
-   [ ] Commit changes with message: `feat(panel-3): create competency title component with scroll effect`

## 4. Morphing to Panel 4 (Google)

-   [ ] Implement the animation for the 3D grid to flatten and fade away.
-   [ ] Implement the animation for the relevant technology icons to enlarge, fly to the center, and merge.
-   [ ] Implement the fade-out animation for the other icons.
-   [ ] Implement the morphing animation for the competency titles to transform into the title of the Google panel.
-   [ ] Write an E2E test to verify the entire morphing sequence.
-   [ ] Commit changes with message: `feat(panel-3): implement morphing transition to panel 4`
