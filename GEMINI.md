# Gemini Agent Instructions

## Development Workflow

All development should follow a version-controlled workflow.

1.  **Commit Frequently:** After each logical set of changes is complete and verified, the changes should be committed. Do not bundle unrelated changes into a single commit.
2.  **Use Conventional Commits:** All commit messages must follow the Conventional Commits specification (e.g., `feat: add user login`, `fix: correct button alignment`).
3.  **Health Checks are Mandatory:** Follow the pre-commit and post-deployment health checks outlined below.

---

## Pre-Commit Health Check

Before any `git commit` operation, you **must** run a full local health check.

Run the following command:
`npm run test:docker`

This command builds the application and runs all tests in a clean environment. After it completes, you **must** also visually inspect the newly generated screenshot files in the `tests/example.spec.ts-snapshots` directory to confirm that any visual changes are intentional.

---

## Post-Deployment Health Check

After a push, deployment to production generally takes 30-60 seconds. Once this period has passed, you must verify the health of the live site.

**Production URL:** [https://gouravgunjan.netlify.app/](https://gouravgunjan.netlify.app/)

If the site is not functioning correctly, you must immediately investigate and deploy a fix.