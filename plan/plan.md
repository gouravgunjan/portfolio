# Master Development Plan

This document outlines the development plan for the portfolio website. It establishes a strict, test-driven workflow and breaks down the work into individual panels.

## Core Development Principles

The following principles must be adhered to throughout the development process:

1.  **Storyboard is the Source of Truth:** All implementation must strictly adhere to the visuals, animations, and morphing transitions detailed in the `storyboard.md`.
2.  **Component-Based Architecture:** Each panel will be a separate React component (`src/components/panels/`). Any complex element within a panel will be further broken down into its own sub-component.
3.  **Dedicated Assets:** Each panel will have a corresponding asset folder (`src/assets/panels/`) to store its specific SVGs, images, or other resources.
4.  **Code Over Assets:** Visual elements (icons, patterns, animations) should be created with code (CSS, SVG, JS) whenever feasible. External assets (e.g., company logos) are only to be used when creating them from scratch is impractical.
5.  **Test-Driven Workflow:** Every change must be validated by tests.
    *   **E2E & Animation Testing:** All animations, morphing effects, and user interactions will be tested using Playwright to confirm they behave exactly as described in the storyboard.
    *   **Screenshot Testing:** Static visual elements, SVGs, and complex components will have screenshot tests to prevent visual regressions.
6.  **Iterative Development Cycle:** The process for every single element, no matter how small, is:
    *   **Implement:** Write the code for the component or animation.
    *   **Test:** Write the corresponding E2E or screenshot test.
    *   **Verify:** Run the test and visually confirm the result matches the storyboard.
    *   **Repeat:** Continue iterating until the implementation is perfect.
7.  **Atomic Commits:** Each completed task from the checklists (e.g., a single component, a single animation) must be committed individually. Commit messages will follow the Conventional Commits standard.
8.  **Checklist-Driven:** The `panelX.md` files are the official checklists. Work is not complete until every item is checked off.

## Panel Plans

This project is broken down into the following panels. Each link points to a detailed checklist for that specific panel.

-   [Panel 1: Ideation](./panel1.md) - (In Progress)
-   [Panel 2: The Blueprint](./panel2.md) - (Not Started)
-   [Panel 3: The Toolkit](./panel3.md) - (Not Started)
-   [Panel 4: Google](./panel4.md) - (Not Started)
-   [Panel 5: VMware](./panel5.md) - (Not Started)
-   [Panel 6: Morgan Stanley](./panel6.md) - (Not Started)
-   [Panel 7: Philips Healthcare](./panel7.md) - (Not Started)
-   [Panel 8: Personal Projects](./panel8.md) - (Not Started)
-   [Panel 9: Education](./panel9.md) - (Not Started)
-   [Panel 10: Get in Touch](./panel10.md) - (Not Started)
