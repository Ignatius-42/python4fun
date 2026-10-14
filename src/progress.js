const progressKey = "pyquest-progress-v1";
const progressVersion = 1;

export function emptyProgress() {
  return { version: progressVersion, completedChapters: [] };
}

export function validateProgress(value) {
  if (
    !value ||
    typeof value !== "object" ||
    value.version !== progressVersion ||
    !Array.isArray(value.completedChapters) ||
    value.completedChapters.some(
      (chapter) => !Number.isInteger(chapter) || chapter < 1 || chapter > 10,
    )
  ) {
    throw new Error("This progress file is not a valid PyQuest backup.");
  }

  return {
    version: progressVersion,
    completedChapters: [...new Set(value.completedChapters)].sort(
      (left, right) => left - right,
    ),
  };
}

export function loadProgress(storage = globalThis.localStorage) {
  const saved = storage.getItem(progressKey);
  return saved ? validateProgress(JSON.parse(saved)) : emptyProgress();
}

export function saveProgress(progress, storage = globalThis.localStorage) {
  const validProgress = validateProgress(progress);
  storage.setItem(progressKey, JSON.stringify(validProgress));
  return validProgress;
}

export function markChapterComplete(progress, chapterNumber) {
  return validateProgress({
    ...progress,
    completedChapters: [...progress.completedChapters, chapterNumber],
  });
}

export function parseProgressBackup(contents) {
  return validateProgress(JSON.parse(contents));
}
