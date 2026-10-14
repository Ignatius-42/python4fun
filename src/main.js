import { chapters, findChapter } from "./data/chapters.js";
import {
  emptyProgress,
  loadProgress,
  markChapterComplete,
  parseProgressBackup,
  saveProgress,
} from "./progress.js";
import { getRoute } from "./router.js";
import "./styles.css";

const app = document.querySelector("#app");
const themeKey = "pyquest-theme";
const maxBackupBytes = 100_000;
let progress;
let progressNotice = "";

try {
  progress = loadProgress();
} catch (error) {
  progress = emptyProgress();
  progressNotice = `Progress could not be loaded: ${error.message}`;
}

function readSavedTheme() {
  try {
    return localStorage.getItem(themeKey);
  } catch {
    return null;
  }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

function initializeTheme() {
  const savedTheme = readSavedTheme();
  if (savedTheme === "light" || savedTheme === "dark") {
    applyTheme(savedTheme);
    return;
  }
  applyTheme(
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );
}

function toggleTheme() {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try {
    localStorage.setItem(themeKey, nextTheme);
  } catch {
    // Theme selection still works for this page when browser storage is blocked.
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeOutput(output) {
  return output.replace(/\r\n/g, "\n").trim();
}

function runPython(code, inputs, onStatus, onComplete) {
  let worker;
  try {
    worker = new Worker(new URL("./python-worker.js", import.meta.url));
  } catch (error) {
    onComplete({ ok: false, error: error.message });
    return;
  }

  let timeout = window.setTimeout(() => {
    worker.terminate();
    onComplete({
      ok: false,
      error: "The Python runner took too long to start. Please try again.",
    });
  }, 45_000);

  worker.addEventListener("message", ({ data }) => {
    if (data.status === "ready") {
      window.clearTimeout(timeout);
      onStatus("Python is ready. Running your program...");
      timeout = window.setTimeout(() => {
        worker.terminate();
        onComplete({
          ok: false,
          error: "This program ran for too long, so it was safely stopped.",
        });
      }, 10_000);
      return;
    }

    window.clearTimeout(timeout);
    worker.terminate();
    onComplete(data);
  });

  worker.addEventListener("error", (event) => {
    window.clearTimeout(timeout);
    worker.terminate();
    onComplete({
      ok: false,
      error:
        event.message ||
        "The Python runner could not load. Check your internet connection and try again.",
    });
  });
  worker.postMessage({ code, inputs });
}

function bindPythonRunner(chapter) {
  const lab = app.querySelector(".python-lab");
  if (!lab) {
    return;
  }

  const editor = lab.querySelector(".code-editor");
  const inputsEditor = lab.querySelector(".program-inputs");
  const output = lab.querySelector(".python-output");
  const runButton = lab.querySelector(".run-python");
  const checkButton = lab.querySelector(".check-challenge");
  const resetButton = lab.querySelector(".reset-python");
  const hintButton = lab.querySelector(".show-hint");
  const hint = lab.querySelector(".challenge-hint");
  const challengeResult = lab.querySelector(".challenge-result");

  if (
    !editor ||
    !inputsEditor ||
    !output ||
    !runButton ||
    !checkButton ||
    !resetButton ||
    !hintButton ||
    !hint ||
    !challengeResult
  ) {
    return;
  }

  const originalCode = editor.dataset.original || editor.value;
  const isComplete = progress.completedChapters.includes(chapter.number);

  const execute = (forChallenge) => {
    runButton.disabled = true;
    checkButton.disabled = true;
    output.textContent = "Running your Python...";
    challengeResult.textContent = "";
    challengeResult.className = "challenge-result";

    const inputs = inputsEditor.value
      .split(/\r?\n/)
      .map((value) => value.trim());

    runPython(
      editor.value,
      inputs,
      (message) => {
        output.textContent = message;
      },
      (result) => {
        runButton.disabled = false;
        checkButton.disabled = false;
        if (!result.ok) {
          output.textContent = `Python says: ${result.error}`;
          return;
        }

        output.textContent = result.output;
        if (!forChallenge) {
          return;
        }

        if (
          normalizeOutput(result.output) ===
          normalizeOutput(chapter.lesson.challenge.expectedOutput)
        ) {
          try {
            progress = saveProgress(
              markChapterComplete(progress, chapter.number),
            );
            progressNotice = "";
            challengeResult.textContent = isComplete
              ? "Challenge complete! Your progress is saved on this device."
              : "Brilliant work! This chapter is complete and saved on this device.";
            challengeResult.classList.add("is-success");
          } catch (error) {
            challengeResult.textContent = `Correct! Your progress could not be saved: ${error.message}`;
            challengeResult.classList.add("is-error");
          }
        } else {
          challengeResult.textContent =
            "Not quite yet. Compare your output with the goal, then try again.";
          challengeResult.classList.add("is-retry");
        }
      },
    );
  };

  runButton.addEventListener("click", () => execute(false));
  checkButton.addEventListener("click", () => execute(true));
  resetButton.addEventListener("click", () => {
    editor.value = originalCode;
    inputsEditor.value = chapter.lesson.defaultInputs?.join("\n") || "";
    output.textContent = "The example is ready to run again.";
    challengeResult.textContent = "";
    editor.focus();
  });
  hintButton.addEventListener("click", () => {
    hint.hidden = !hint.hidden;
    hintButton.setAttribute("aria-expanded", String(!hint.hidden));
  });
}

function bindProgressControls() {
  const exportButton = app.querySelector(".export-progress");
  const importButton = app.querySelector(".import-progress");
  const importInput = app.querySelector(".progress-file");
  const message = app.querySelector(".progress-notice");

  if (message) {
    message.textContent = progressNotice;
  }

  if (exportButton) {
    exportButton.addEventListener("click", () => {
      try {
        const file = new Blob([JSON.stringify(progress, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.download = "pyquest-progress.json";
        document.body.append(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
        progressNotice = "Progress backup downloaded.";
      } catch (error) {
        progressNotice = `Progress backup could not be downloaded: ${error.message}`;
      }
      if (message) {
        message.textContent = progressNotice;
      }
    });
  }

  if (importButton && importInput) {
    importButton.addEventListener("click", () => importInput.click());
    importInput.addEventListener("change", async () => {
      const [file] = importInput.files || [];
      if (!file) {
        return;
      }
      importInput.value = "";

      if (file.size > maxBackupBytes) {
        progressNotice = "That backup file is too large to import.";
        if (message) {
          message.textContent = progressNotice;
        }
        return;
      }

      if (
        !window.confirm(
          "Importing replaces the progress saved on this device. Continue?",
        )
      ) {
        return;
      }

      try {
        progress = saveProgress(parseProgressBackup(await file.text()));
        progressNotice = "Progress backup imported successfully.";
        render();
      } catch (error) {
        progressNotice = `Progress could not be imported: ${error.message}`;
        if (message) {
          message.textContent = progressNotice;
        }
      }
    });
  }
}

function header() {
  return `
    <header class="site-header">
      <a class="brand" href="#/" aria-label="PyQuest home">
        <span class="brand-mark" aria-hidden="true">Py</span>
        <span>PyQuest</span>
      </a>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="#/">Course map</a>
        <a href="#/about">For grown-ups</a>
      </nav>
      <button class="theme-toggle" type="button" aria-label="Switch color theme">
        <span aria-hidden="true">◐</span>
        <span class="theme-label">Theme</span>
      </button>
    </header>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <p>Made for curious minds, one small step at a time <span aria-hidden="true">✨</span></p>
      <a href="#/about">About PyQuest</a>
    </footer>`;
}

function chapterCard(chapter) {
  const isComplete = progress.completedChapters.includes(chapter.number);
  return `
    <a class="chapter-card card-${chapter.color}${isComplete ? " is-complete" : ""}" href="#/chapter/${String(chapter.number).padStart(2, "0")}">
      <span class="chapter-emoji" aria-hidden="true">${chapter.emoji}</span>
      <span class="chapter-number">CHAPTER ${String(chapter.number).padStart(2, "0")}</span>
      <h3>${chapter.title}</h3>
      <p>${chapter.summary}</p>
      ${isComplete ? '<span class="completion-label">Completed</span>' : ""}
      <span class="card-arrow" aria-hidden="true">↗</span>
    </a>`;
}

function homePage() {
  return `
    <main id="main-content">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow"><span aria-hidden="true">🌟</span> YOUR PYTHON ADVENTURE STARTS HERE</p>
          <h1>Big ideas.<br /><span>Little steps.</span></h1>
          <p class="hero-description">
            Learn Python by making things, solving puzzles, and having fun.
            No experience needed—just bring your curiosity!
          </p>
          <a class="primary-button" href="#/chapter/01">Start the adventure <span aria-hidden="true">→</span></a>
          <p class="hero-note"><span aria-hidden="true">🧑‍🚀</span> A beginner-friendly course for ages 10–12</p>
        </div>
        <div class="hero-art" aria-hidden="true">
          <div class="orbit orbit-one"></div>
          <div class="orbit orbit-two"></div>
          <div class="planet">🐍</div>
          <span class="spark spark-one">✦</span>
          <span class="spark spark-two">✧</span>
          <span class="spark spark-three">✦</span>
          <div class="code-sticker"><span>print</span><b>("hello!")</b></div>
        </div>
      </section>

      <section class="course-section" aria-labelledby="course-heading">
        <div class="section-heading">
          <div>
            <p class="eyebrow">YOUR COURSE MAP</p>
            <h2 id="course-heading">Choose your next adventure</h2>
          </div>
          <p class="section-aside">${progress.completedChapters.length} of ${chapters.length} chapters complete</p>
        </div>
        <div class="progress-tools" aria-label="Progress controls">
          <button class="secondary-button export-progress" type="button">Download progress</button>
          <button class="secondary-button import-progress" type="button">Import progress</button>
          <input class="progress-file" type="file" accept="application/json,.json" aria-label="Choose a PyQuest progress backup" hidden />
          <p class="progress-notice" role="status" aria-live="polite"></p>
        </div>
        <div class="chapter-grid">${chapters.map(chapterCard).join("")}</div>
      </section>
    </main>`;
}

function lessonSteps(chapter) {
  return chapter.lesson.steps
    .map(
      (step, index) => `
        <article class="lesson-step">
          <span class="lesson-step-number">${index + 1}</span>
          <div>
            <h3>${step.title}</h3>
            <p>${step.body}</p>
          </div>
        </article>`,
    )
    .join("");
}

function lessonPage(chapter) {
  const goals = chapter.lesson.goals.map((goal) => `<li>${goal}</li>`).join("");
  const previousChapter = findChapter(chapter.number - 1);
  const nextChapter = findChapter(chapter.number + 1);
  const chapterLink = (adjacentChapter, direction) => {
    const label = direction === "previous" ? "← Previous" : "Next →";
    if (!adjacentChapter) {
      const boundary =
        direction === "previous" ? "Course beginning" : "Course complete";
      return `<span class="chapter-nav-link is-disabled" aria-disabled="true"><span>${label}</span><strong>${boundary}</strong></span>`;
    }
    return `<a class="chapter-nav-link" href="#/chapter/${String(adjacentChapter.number).padStart(2, "0")}" rel="${direction === "previous" ? "prev" : "next"}"><span>${label}</span><strong>Chapter ${String(adjacentChapter.number).padStart(2, "0")}: ${adjacentChapter.title}</strong></a>`;
  };

  return `
    <main id="main-content" class="subpage">
      <a class="back-link" href="#/">← Back to the course map</a>
      <section class="chapter-intro card-${chapter.color}">
        <span class="chapter-emoji" aria-hidden="true">${chapter.emoji}</span>
        <p class="eyebrow">CHAPTER ${String(chapter.number).padStart(2, "0")}</p>
        <h1>${chapter.title}</h1>
        <p class="chapter-summary">${chapter.summary}</p>
      </section>

      <section class="lesson-content">
        <div class="lesson-overview">
          <div>
            <p class="eyebrow">LEARNING GOALS</p>
            <h2>${chapter.title} in a nutshell</h2>
          </div>
          <ul class="goal-list">${goals}</ul>
        </div>

        <div class="lesson-steps">${lessonSteps(chapter)}</div>

        <div class="python-lab">
          <div class="lab-header">
            <div>
              <p class="eyebrow">PYTHON LAB</p>
              <h3>Try the example</h3>
            </div>
            <span class="pill-button">Runs in a worker</span>
          </div>
          <p class="runner-note">
            Each run stops after 10 seconds so the page stays responsive.
          </p>
          <label class="field-label" for="python-code">Your Python code</label>
          <textarea id="python-code" class="code-editor" data-original="${escapeHtml(chapter.lesson.starterCode)}" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off">${escapeHtml(chapter.lesson.starterCode)}</textarea>
          <label class="field-label" for="program-inputs">Program answers <span>(one answer per line)</span></label>
          <textarea id="program-inputs" class="program-inputs" rows="2" spellcheck="false" aria-describedby="input-help">${escapeHtml(chapter.lesson.defaultInputs?.join("\n") || "")}</textarea>
          <p id="input-help" class="field-help">Used when your Python code asks for input().</p>
          <div class="challenge-prompt">
            <p class="eyebrow">YOUR CHALLENGE</p>
            <p>${chapter.lesson.challenge.prompt}</p>
            <button class="hint-button show-hint" type="button" aria-expanded="false" aria-controls="challenge-hint">Show a hint</button>
            <p id="challenge-hint" class="challenge-hint" hidden>${chapter.lesson.challenge.hint}</p>
          </div>
          <div class="lab-actions">
            <button class="run-python primary-button" type="button">Run code</button>
            <button class="check-challenge secondary-button" type="button">Check challenge</button>
            <button class="reset-python secondary-button" type="button">Reset</button>
          </div>
          <p class="challenge-result" role="status" aria-live="polite"></p>
          <pre class="python-output" role="status" aria-live="polite">Ready to run your first Python code.</pre>
        </div>
      </section>
      <nav class="chapter-navigation" aria-label="Chapter navigation">
        ${chapterLink(previousChapter, "previous")}
        ${chapterLink(nextChapter, "next")}
      </nav>
    </main>`;
}

function chapterPage(number) {
  const chapter = findChapter(number);
  if (!chapter) {
    return notFoundPage();
  }

  if (chapter.lesson) {
    return lessonPage(chapter);
  }

  return `
    <main id="main-content" class="subpage">
      <a class="back-link" href="#/">← Back to the course map</a>
      <section class="chapter-intro card-${chapter.color}">
        <span class="chapter-emoji" aria-hidden="true">${chapter.emoji}</span>
        <p class="eyebrow">CHAPTER ${String(chapter.number).padStart(2, "0")}</p>
        <h1>${chapter.title}</h1>
        <p class="chapter-summary">${chapter.summary}</p>
        <p class="build-note">Your learning space is taking shape. Interactive lessons and Python challenges are coming in the next build phase.</p>
      </section>
    </main>`;
}

function aboutPage() {
  return `
    <main id="main-content" class="subpage about-page">
      <a class="back-link" href="#/">← Back to the course map</a>
      <section class="about-card">
        <p class="eyebrow">A NOTE FOR PARENTS & TEACHERS</p>
        <h1>Learning should feel like an adventure.</h1>
        <p>PyQuest is being built as a gentle first step into Python for children aged 10–12. Lessons will use short explanations, familiar examples, and hands-on coding challenges.</p>
        <h2>Privacy comes first</h2>
        <p>The course runs as a static website with no accounts, backend, analytics, or tracking. Chapter completion stays in this browser and families can export or import a progress backup. Python runs on this device; the Pyodide runtime is downloaded from jsDelivr, which receives normal network request information.</p>
        <h2>Built in the open</h2>
        <p>PyQuest is an open-source project. Families and teachers will be able to host their own copy using GitHub Pages.</p>
      </section>
    </main>`;
}

function notFoundPage() {
  return `
    <main id="main-content" class="subpage not-found">
      <span class="chapter-emoji" aria-hidden="true">🧭</span>
      <h1>Looks like we took a wrong turn!</h1>
      <p>That page isn't on our course map.</p>
      <a class="primary-button" href="#/">Back to the course map</a>
    </main>`;
}

function render() {
  const route = getRoute(window.location.hash);
  let page;
  if (route.name === "home") {
    page = homePage();
  } else if (route.name === "chapter") {
    page = chapterPage(route.number);
  } else if (route.name === "about") {
    page = aboutPage();
  } else {
    page = notFoundPage();
  }

  app.innerHTML = `${header()}${page}${footer()}`;
  const themeToggle = app.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
  bindPythonRunner(route.name === "chapter" ? findChapter(route.number) : null);
  bindProgressControls();
}

initializeTheme();
window.addEventListener("hashchange", () => {
  render();
  window.scrollTo(0, 0);
});
render();
