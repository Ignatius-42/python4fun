# Architecture decisions

## Architecture

- **Vite and vanilla JavaScript:** Keep the client small, fast to load, and easy
  to understand without introducing a UI framework.
- **Relative Vite base (`./`):** Let built assets resolve when the site is
  served from a GitHub repository subpath.
- **Hash routes:** Use routes such as `#/chapter/03` so GitHub Pages does not
  need a server-side single-page-app fallback.
- **Chapter navigation:** Lesson pages link to the previous and next chapters
  in course order. Disable navigation beyond the first and last chapters rather
  than wrapping around; return the learner to the top when the chapter changes.
- **System font stack:** Avoid third-party font requests and keep the app
  usable offline once its files have loaded.
- **Theme preference:** Follow the operating-system theme unless the learner
  chooses a theme; tolerate blocked browser storage.
- **Python runtime:** Pyodide runs in a dedicated Web Worker so long-running
  learner code does not freeze the interface. Each run is terminated after a
  short execution limit. Pyodide is loaded from jsDelivr.
- **Progress:** Store only chapter completion in versioned local storage.
  Support family-controlled JSON export/import; never send progress to a
  server.
- **Challenge checking:** Compare normalized program output with the lesson's
  expected output. This is simple and predictable for the starter exercises,
  but it does not accept alternate outputs or prove code correctness.
- **Hosting:** Keep Vite's relative base (`./`) and hash routes for static
  GitHub Pages deployments below a repository path.
- **Pinned toolchain and lockfile:** Use exact development dependency versions
  and a committed npm lockfile so local and CI installs resolve consistently.
