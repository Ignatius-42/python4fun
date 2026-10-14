# Project requirements and development progress

## Product requirements

PyQuest is a friendly Python learning app for children aged 10–12. It should:

- Teach Python in short, approachable steps with hands-on practice.
- Run as a static website without accounts, a backend, analytics, or learner-data uploads.
- Keep completion progress in the learner's browser and let families export/import it.
- Work on GitHub Pages beneath a repository path.
- Remain responsive, keyboard-accessible, and understandable to young learners.

## Implemented

- Responsive home page, course map, grown-ups page, theme control, and hash routes.
- Ten chapter lesson outlines, learning goals, starter programs, challenge prompts, and hints.
- Pyodide-based Python execution in a dedicated Web Worker, with simulated `input()` answers and a 10-second execution limit so an accidental infinite loop does not freeze the page.
- Challenge output checks and chapter completion indicators.
- Versioned local progress storage plus JSON export/import with format validation and an overwrite confirmation.
- Focus-visible keyboard outlines, associated editor labels, polite status announcements, and responsive layouts.
- Unit tests for routing, chapter lesson data, and progress backup validation.
- CI checks and a GitHub Pages deployment workflow.

## Important behavior and limitations

- Learner code runs in the browser; it is not uploaded by PyQuest. Pyodide is downloaded from jsDelivr, so initial execution requires an internet connection and the CDN receives the normal request metadata (such as the visitor's IP address).
- Browser storage can be cleared by the learner, browser, or device. Families should export backups if they want to retain progress.
- Challenges currently check expected output, not every possible correct solution. Alternate valid programs may need to produce the same output.
- This is a learning runner, not a security boundary or a production-grade Python sandbox.
- The ten chapters are starter lessons, not a reviewed or comprehensive curriculum.
- GitHub Pages deployment requires the repository's Pages source to be configured as **GitHub Actions**.

## Next improvements

1. Have teachers or families review the lesson sequence and challenge wording.
2. Add browser-level automated tests for running code, challenge completion, and import/export.
3. Review color contrast and test screen readers and mobile browsers.
4. Consider richer challenge validation than exact output comparison.
5. Make Pyodide self-hostable or offer an explicit offline setup if offline use becomes a requirement.

## Verification

Run locally with `npm run dev`. Before release, run:

```sh
npm run lint
npm run format:check
npm test
npm run build
```
