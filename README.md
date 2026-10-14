# PyQuest

PyQuest is a friendly, browser-based Python course for children aged 10–12. The
long-term goal is a privacy-first learning space with interactive lessons,
real Python challenges, and progress that stays on the learner's device.

## Project status

PyQuest includes ten starter lessons, a browser-based Python lab, output-based
challenges, and local chapter completion progress. See
[docs/PROGRESS.md](./docs/PROGRESS.md) for implemented features, limitations,
and remaining improvements.

## Run locally

Requirements: Node.js 20 or newer and npm. The Python runtime is downloaded
from jsDelivr the first time a lesson is run, so an internet connection is
needed to execute Python.

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

## Privacy

PyQuest has no backend, accounts, analytics, or tracking. Python code executes
in a browser worker and is not uploaded by the app. The worker loads the
Pyodide runtime from jsDelivr, which receives normal network request metadata.
Chapter completion is stored in browser local storage; families can download
or import a JSON progress backup. Browser storage may be cleared at any time.

## Deploy

The repository includes a GitHub Actions workflow to build and deploy the
`main` branch to GitHub Pages. In repository settings, configure **Pages →
Build and deployment → Source → GitHub Actions**. Deployment runs lint,
formatting checks, tests, and a production build before publishing.

## License

This project is open source under the [MIT License](./LICENSE).
