# Gemini Agent Instructions

**Mandatory Pre-Commit Check:**

Before any `git commit` operation, you **must** update and verify the visual regression (screenshot) and accessibility snapshots.

Run the following command to update the baselines:
`npm run test:docker`

After the command completes, you **must** visually inspect the newly generated screenshot files in the `tests/example.spec.ts-snapshots` directory to confirm that the changes are intentional and correct.
