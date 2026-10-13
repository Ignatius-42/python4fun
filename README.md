# PyQuest

PyQuest is a friendly, browser-based Python course for children aged 10–12. The
long-term goal is a privacy-first learning space with interactive lessons,
real Python challenges, and progress that stays on the learner's device.

## Project status

The project is in **Phase 1: scaffold**. The current build provides the
responsive course map, hash-based navigation, theme controls, and an About
page. Python execution, lessons, challenges, and progress tracking are planned
for later phases.

## Run locally

Requirements: Node.js 20 or newer and npm.

```sh
npm install
npm run dev
```

Vite prints the local URL. To check the production bundle locally:

```sh
npm run lint
npm test
npm run build
npm run preview
```

## Deploy

GitHub Pages deployment will be added during the deployment phase. The Vite
base path is already relative (`./`) so the built site can be hosted beneath a
repository path.

## Privacy

PyQuest has no backend, accounts, analytics, or tracking. The current scaffold
does not store learner data. Future progress storage is planned to remain on
the learner's device, with export and import controlled by the family.

## License

This project is open source under the [MIT License](./LICENSE).
