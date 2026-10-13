import { describe, expect, it } from "vitest";
import { getRoute } from "./router.js";

describe("getRoute", () => {
  it("opens the course map for an empty or home hash", () => {
    expect(getRoute("")).toEqual({ name: "home" });
    expect(getRoute("#/")).toEqual({ name: "home" });
    expect(getRoute("#/home")).toEqual({ name: "home" });
  });

  it("parses chapter numbers from hash routes", () => {
    expect(getRoute("#/chapter/03")).toEqual({ name: "chapter", number: 3 });
  });

  it("opens the about page", () => {
    expect(getRoute("#/about")).toEqual({ name: "about" });
  });

  it("handles unsupported routes", () => {
    expect(getRoute("#/something-else")).toEqual({ name: "not-found" });
    expect(getRoute("#/chapter/nope")).toEqual({ name: "not-found" });
  });
});
