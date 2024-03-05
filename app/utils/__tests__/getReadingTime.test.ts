import { describe, test } from "vitest";
import { words } from "../../test/random";
import { getReadingTime } from "../getReadingTime";

describe("getReadingTime", () => {
  test("the text has more words than the user reads per minute", ({
    expect,
  }) => {
    expect(getReadingTime(words(10), "en-GB", { wordsPerMinute: 5 })).toBe(
      "2 min"
    );
  });

  test("the text has the same amount of word as the user reads per minute", ({
    expect,
  }) => {
    expect(getReadingTime(words(10), "en-GB", { wordsPerMinute: 10 })).toBe(
      "1 min"
    );
  });

  test("the text has less word than the user reads per minute", ({
    expect,
  }) => {
    expect(getReadingTime(words(10), "en-GB", { wordsPerMinute: 11 })).toBe(
      "1 min"
    );
  });
});
