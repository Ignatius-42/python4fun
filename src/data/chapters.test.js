import { describe, expect, it } from "vitest";
import { chapters } from "./chapters.js";

describe("chapter lessons", () => {
  it("provides lesson goals, teaching steps, and a runnable challenge for every chapter", () => {
    expect(chapters).toHaveLength(10);

    for (const chapter of chapters) {
      expect(chapter.lesson.goals.length).toBeGreaterThan(0);
      expect(chapter.lesson.steps.length).toBeGreaterThan(0);
      expect(chapter.lesson.starterCode).toBeTruthy();
      expect(chapter.lesson.challenge.prompt).toBeTruthy();
      expect(chapter.lesson.challenge.hint).toBeTruthy();
      expect(chapter.lesson.challenge.expectedOutput).toBeTruthy();
    }
  });
});
