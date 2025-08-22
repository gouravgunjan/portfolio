# Portfolio Website Development Plan (v2)

This document outlines the plan for developing a personal portfolio website with a focus on a rich, cinematic, "scrolly-telling" user experience, inspired by https://mont-fort.com/.

## 1. Core Objective

To create a visually stunning, single-page portfolio that showcases professional experience and skills through a series of animated scenes driven by user scrolling. This will demonstrate advanced UI/UX and animation capabilities.

## 2. Inspiration Analysis (https://mont-fort.com/)

- **Core Concept:** "Scrolly-telling" - using the scrollbar to navigate through an animated timeline rather than just moving down a static page.
- **Key Techniques:**
    - **Pinned Scrolling:** Sections are "pinned" in place while their internal elements animate.
    - **Scroll-Driven Timelines:** Animations (scaling, fading, horizontal movement) are directly tied to scroll progress.
    - **Layered Parallax:** Multiple background and foreground layers move at different speeds to create a deep sense of immersion.
    - **Video Scrubbing & 3D Elements:** Using scroll to control video playback or manipulate 3D objects (like the rotating globe).
    - **Masking & Transitions:** Creative use of masks to reveal content and provide seamless transitions between scenes.

## 3. Proposed Technology Stack

- **Frontend Framework:** React.
- **Styling:** SASS/SCSS for a robust, themeable styling architecture.
- **Animation:** **GSAP (GreenSock Animation Platform) with the ScrollTrigger plugin.** This is the industry-standard tool for the complex, timeline-based animations we need to create. We will use it over Framer Motion for its superior control in this context.
- **Data:** `resume.json` will provide all text content.

## 4. High-Level Structure & Testing Strategy

The app will consist of a main `ScrollContainer` that manages the overall GSAP timeline. Inside this container, we will build a series of "Scenes". Each scene will be a full-screen component that handles its own animations.

**Our testing strategy is critical:**
-   **Animation Verification:** Animations are tested by programmatically scrolling in Playwright and recording a `.webm` video of the result. This provides clear, visual evidence of the animation's behavior.
-   **Reliable Selectors:** We use `data-testid` attributes on all key elements to ensure our tests are not affected by CSS module hashing.
-   **Stable Test Environment:** We use placeholder elements (like colored `divs`) instead of external images during tests to avoid network flakiness and ensure we are only testing the animation logic itself.

## 5. Scene-by-Scene Implementation Plan

This is a living document. We will build and verify each scene one by one.

### Scene 1: [In Progress] Hero & Introduction

-   **Objective:** Replicate the opening mountain scene.
-   **Status:** Core GSAP animation logic is implemented and verified with placeholder colors.
-   **Next Steps:**
    1.  Add the `About` section below the `Hero` to create scrollable space.
    2.  Replace the placeholder colors with locally-hosted, high-quality layered images.
    3.  Refine the animation timeline.

### Scene 2: [TODO] About Me

-   **Objective:** A smooth transition from the Hero scene to a section that introduces my professional summary.
-   **Animations:**
    -   The mountains from Scene 1 will scroll up and fade out.
    -   The "About Me" text will fade in over a new, simpler background.

### Scene 3: [TODO] Experience Timeline

-   **Objective:** Showcase my work experience in an engaging way.
-   **Animations:**
    -   This section will be pinned.
    -   As the user scrolls, each job from my experience will animate into view one by one.
    -   We can use a horizontal "carousel" effect, where scrolling vertically moves through the timeline horizontally.

### Scene 4: [TODO] Projects Showcase

-   **Objective:** Display my key projects.
-   **Animations:**
    -   Similar to the experience timeline, we can use a pinned section with scroll-driven animations to present each project.

### Scene 5: [TODO] The Globe (Advanced)

-   **Objective:** Replicate the rotating globe effect to show global experience/connectivity.
-   **Implementation:**
    -   **Phase 1 (MVP):** We will start by using a pre-rendered video of a rotating globe. We will use GSAP to "scrub" through the video based on the scroll position.
    -   **Phase 2 (Future Enhancement):** Investigate using a lightweight WebGL library like `react-three-fiber` to create a truly interactive 3D globe. This is a significant undertaking and will be treated as a stretch goal.

## 6. Future Enhancements

-   **[TODO]** Investigate and implement an automated, image-based contrast analysis tool into the Playwright test suite to programmatically enforce accessibility standards.
