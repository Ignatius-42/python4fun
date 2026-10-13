import { chapters, findChapter } from "./data/chapters.js";
import { getRoute } from "./router.js";
import "./styles.css";

const app = document.querySelector("#app");
const themeKey = "pyquest-theme";

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
  return `
    <a class="chapter-card card-${chapter.color}" href="#/chapter/${String(chapter.number).padStart(2, "0")}">
      <span class="chapter-emoji" aria-hidden="true">${chapter.emoji}</span>
      <span class="chapter-number">CHAPTER ${String(chapter.number).padStart(2, "0")}</span>
      <h3>${chapter.title}</h3>
      <p>${chapter.summary}</p>
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
          <p class="section-aside">10 chapters · Learn at your own pace</p>
        </div>
        <div class="chapter-grid">${chapters.map(chapterCard).join("")}</div>
      </section>
    </main>`;
}

function chapterPage(number) {
  const chapter = findChapter(number);
  if (!chapter) {
    return notFoundPage();
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
        <p>The course is designed to run as a static website. It has no accounts, backend, analytics, or tracking. The current scaffold does not save learner data; future progress will stay in the browser and be exportable by the family.</p>
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
  app.querySelector(".theme-toggle").addEventListener("click", toggleTheme);
}

initializeTheme();
window.addEventListener("hashchange", render);
render();
