# Panel 1: Ideation - Development Plan

## 1. Component and Asset Structure

-   [x] Create a new component file: `src/components/panels/Ideation.tsx`
-   [x] Create a new module SCSS file: `src/components/panels/Ideation.module.scss`
-   [ ] Create a dedicated asset folder: `src/assets/panels/ideation/`

## 2. Background

-   [x] Implement the dark, ethereal space background (`#0A0A10`) in `Ideation.module.scss`.
-   [x] Add a subtle parallax effect on mouse movement.
-   [x] Write an E2E test to verify the parallax effect.
-   [ ] Commit changes with message: `feat(panel-1): implement ethereal background with parallax effect`

## 3. Floating Abstract Elements

### 3.1. Ethereal Lines

-   [ ] Create a new component: `src/components/panels/ideation/EtherealLine.tsx`
-   [ ] Implement the line as an SVG with a glowing effect.
-   [ ] Add a gentle, slow-drifting and bending animation.
-   [ ] Write a screenshot test to verify the look of the line.
-   [ ] Write an E2E test to verify the animation.
-   [ ] Commit changes with message: `feat(panel-1): create ethereal line component with animation`

### 3.2. Glowing Panels

-   [ ] Create a new component: `src/components/panels/ideation/GlowingPanel.tsx`
-   [ ] Implement the semi-transparent, glowing rectangular panel.
-   [ ] Add a fade in and out animation.
-   [ ] Write a screenshot test to verify the look of the panel.
-   [ ] Write an E2E test to verify the animation.
-   [ ] Commit changes with message: `feat(panel-1): create glowing panel component with animation`

### 3.3. Alphabetic Characters

-   [ ] Create a new component: `src/components/panels/ideation/FloatingChar.tsx`
-   [ ] Implement the soft, pulsating glow effect.
-   [ ] Animate the characters to float separately.
-   [ ] Write a screenshot test to verify the look of the characters.
-   [ ] Write an E2E test to verify the floating animation.
-   [ ] Commit changes with message: `feat(panel-1): create floating character component with animation`

### 3.4. Nebula Clouds

-   [ ] Create a new component: `src/components/panels/ideation/NebulaCloud.tsx`
-   [ ] Implement the wispy, nebula-like clouds using fine particles (e.g., with a particle library or custom shaders).
-   [ ] Add a slow drifting animation.
-   [ ] Write an E2E test to verify the animation.
-   [ ] Commit changes with message: `feat(panel-1): create nebula cloud component with animation`

### 3.5. UI Sketches

-   [ ] Create SVG assets for the UI component sketches in `src/assets/panels/ideation/`.
-   [ ] Create a new component: `src/components/panels/ideation/UiSketch.tsx`
-   [ ] Implement the faint, hand-drawn style.
-   [ ] Add an animation to appear and disappear like fleeting thoughts.
-   [ ] Write an E2E test to verify the animation.
-   [ ] Commit changes with message: `feat(panel-1): create UI sketch component with animation`

### 3.6. Company Logos

-   [ ] Create monochrome SVG versions of the company logos in `src/assets/panels/ideation/`.
-   [ ] Create a new component: `src/components/panels/ideation/FloatingLogo.tsx`
-   [ ] Implement the subtle drifting animation in the background.
-   [ ] Write an E2E test to verify the animation.
-   [ ] Commit changes with message: `feat(panel-1): create floating logo component with animation`

## 4. Text

-   [ ] Add the text "Gourav Gunjan" and "Creative UI Developer" to the `Ideation.tsx` component.
-   [ ] Implement the subtle drift and soft glow effect.
-   [ ] Write an E2E test to verify the animation.
-   [ ] Commit changes with message: `feat(panel-1): add animated text to ideation panel`

## 5. Morphing to Panel 2 (The Blueprint)

-   [ ] Implement the morphing animation for the ethereal lines to form the blueprint grid.
-   [ ] Implement the animation for the alphabetic characters to coalesce and form the title of Panel 2.
-   [ ] Implement the fade-out animation for the clouds and UI sketches.
-   [ ] Implement the background transition.
-   [ ] Write an E2E test to verify the entire morphing sequence.
-   [ ] Commit changes with message: `feat(panel-1): implement morphing transition to panel 2`
