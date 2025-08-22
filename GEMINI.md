# Gemini Agent Instructions

## Development Workflow

All development should follow a version-controlled workflow.

1.  **Commit Frequently:** After each logical set of changes is complete and verified, the changes should be committed. Do not bundle unrelated changes into a single commit.
2.  **Use Conventional Commits:** All commit messages must follow the Conventional Commits specification (e.g., `feat: add user login`, `fix: correct button alignment`).
3.  **Health Checks are Mandatory:** Follow the pre-commit and post-deployment health checks outlined below.

---

## Pre-Commit Health Check & Verification Workflow

Before any `git commit` operation, you **must** run a full local health check to verify changes. **Do not run the development server directly.** Instead, rely on the project's automated tests to ensure correctness.

### 1. Run the Test Suite

Run the following command:
`npm run test:docker`

This command builds the application and runs all tests in a clean, containerized environment.

### 2. Verification Steps

After the command completes, you **must** perform the following verification steps:

-   **Static Images:** Visually inspect the newly generated screenshot files in the `tests/example.spec.ts-snapshots` directory to confirm that any visual changes to the initial page state are intentional and meet design standards (e.g., proper contrast, layout).
-   **Animation Video:** A video of the test run will be saved to `tests/latest_animation_test.webm`. **This is the most critical step.** You must review this video to confirm that all animations and scroll-driven effects are working smoothly and correctly.

### 3. Testing Best Practices

-   **Use Test IDs:** Always use `data-testid` attributes for selectors in tests to avoid failures from CSS module hashing or class name refactors.
-   **Use Placeholders:** For testing animation logic, use simple placeholder elements (e.g., colored `divs`) instead of relying on external network assets (like images from a CDN) to ensure tests are fast, reliable, and deterministic.

---

## Post-Deployment Health Check

After a push, deployment to production generally takes 30-60 seconds. Once this period has passed, you must verify the health of the live site.

**Production URL:** [https://gouravgunjan.netlify.app/](https://gouravgunjan.netlify.app/)

If the site is not functioning correctly, you must immediately investigate and deploy a fix.
