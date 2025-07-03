# Repository Guidelines

These instructions apply to the entire repository.

- Use 2 spaces for indentation in all JavaScript and Svelte files.
- Keep commit messages brief and in the imperative mood.
- When modifying any code, run `npm test --silent` before committing.
- Place Svelte components under `frontend/src/components/` and pages under `frontend/src/pages/`.
- Backend code has been removed. Use the mock API under `test/mockBackend.js` for local testing.
- Ensure tests remain passing after your changes.

- Document repository guidelines in AGENTS.md so future maintainers have clear instructions how to setup and recognize environment context.