# Architecture decisions

## Phase 1: scaffold

- **Vite and vanilla JavaScript:** Keep the client small, fast to load, and easy
  to understand without introducing a UI framework.
- **Relative Vite base (`./`):** Let built assets resolve when the site is
  served from a GitHub repository subpath.
- **Hash routes:** Use routes such as `#/chapter/03` so GitHub Pages does not
  need a server-side single-page-app fallback.
- **System font stack:** Avoid third-party font requests and keep the app
  usable offline once its files have loaded.
- **Theme preference:** Follow the operating-system theme unless the learner
  chooses a theme; tolerate blocked browser storage.
- **Content status:** The course map provides the planned chapter titles.
  Lessons and the interactive Python workspace will be built in later phases.
- **Pinned toolchain and lockfile:** Use exact development dependency versions
  and a committed npm lockfile so local and CI installs resolve consistently.
