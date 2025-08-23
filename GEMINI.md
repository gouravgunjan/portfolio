# Gemini Agent Project Guide: Portfolio

This document contains the official operating instructions for the Portfolio project. All actions must strictly adhere to these protocols.

## 1. Core Project Philosophy

- **Source of Truth:** The `plan/storyboard.md` is the definitive guide for all visual and interactive elements. All implementation must match the storyboard's descriptions.
- **Planning is Mandatory:** All development work is broken down into panel-specific checklists in the `plan/` directory (e.g., `plan/panel1.md`). These checklists must be followed and updated as work is completed.
- **Test-Driven Development:** This project follows a strict TDD workflow. No code change is complete until it is verified by an automated test.

## 2. Mandatory Development Workflow

### Step 1: Understand the Task

- Before writing any code, review the relevant sections of `plan/storyboard.md` and the corresponding `plan/panelX.md` checklist.

### Step 2: Implement the Feature

- Write the necessary code in the React components (`src/components/panels/`).
- Use SCSS modules for styling (`.module.scss`).
- Create visual elements with code (CSS, SVG) whenever possible.

### Step 3: Write the Tests

- **Visual Features:** For every visual change, you **must** create or update a corresponding description in the relevant `tests/panels/....spec.ts.data.json` file.
- **"Describe Everything" Principle:** Test descriptions are the cornerstone of verification. They **must** be comprehensive and meticulously detail every expected visual element, including:
    - Background colors, patterns, and animations.
    - Gradients and fade effects.
    - All visible text, icons, and their properties.
    - The expected state of animations in both screenshots and videos.
- **Keep Tests Simple:** Tests should be declarative. They must verify the final rendered output and **must not** attempt to control the internal state or timing of a component.

### Step 4: Verify with the Official Test Script

- Run the single, official command for all verification:
  `npm run test:docker`
- This command runs all tests in a clean, containerized environment and performs AI-powered visual verification.

### Step 5: Debugging Visual Failures

- If a visual element is unexpectedly hidden or rendered incorrectly, the **first step** is to investigate the CSS stacking context.
- Check the `z-index`, `position`, and `background-image` properties of all relevant components to ensure nothing is being unintentionally obscured.

## 3. Version Control

- **Atomic Commits:** Each completed task from a `panelX.md` checklist must be committed individually.
- **Conventional Commits:** All commit messages must follow the Conventional Commits specification (e.g., `feat(panel-1): add neural network animation`).

---
*This guide is the binding set of rules for this project. It must be followed on all subsequent turns.*