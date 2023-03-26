import { describe, it, expect } from "vitest";
import { isAfter } from "./date";

describe("isAFter", () => {
  it("should know if a date A is after reference date B", () => {
    const reference = "2023-03-26";
    const date = "2023-03-27";
    expect(isAfter(date, reference)).toEqual(true);
  });
});
