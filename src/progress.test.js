import { describe, expect, it } from "vitest";
import {
  emptyProgress,
  loadProgress,
  markChapterComplete,
  parseProgressBackup,
  saveProgress,
  validateProgress,
} from "./progress.js";

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

describe("progress storage", () => {
  it("starts empty and saves progress locally", () => {
    const storage = createStorage();
    expect(loadProgress(storage)).toEqual(emptyProgress());
    expect(
      saveProgress(markChapterComplete(emptyProgress(), 2), storage),
    ).toEqual({ version: 1, completedChapters: [2] });
    expect(loadProgress(storage)).toEqual({
      version: 1,
      completedChapters: [2],
    });
  });

  it("deduplicates and sorts completed chapters", () => {
    expect(
      validateProgress({
        version: 1,
        completedChapters: [3, 1, 3],
      }),
    ).toEqual({ version: 1, completedChapters: [1, 3] });
  });

  it("rejects unsupported or malformed progress data", () => {
    expect(() =>
      validateProgress({ version: 2, completedChapters: [] }),
    ).toThrow("not a valid PyQuest backup");
    expect(() =>
      validateProgress({ version: 1, completedChapters: [11] }),
    ).toThrow("not a valid PyQuest backup");
    expect(() => parseProgressBackup("{")).toThrow();
  });

  it("parses an exported progress backup", () => {
    expect(
      parseProgressBackup('{"version":1,"completedChapters":[2,1]}'),
    ).toEqual({ version: 1, completedChapters: [1, 2] });
  });
});
