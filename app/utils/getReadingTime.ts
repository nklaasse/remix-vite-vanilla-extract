import type { Locales } from "~/config";

interface GetReadingTimeOptions {
  /**
   * user's reading speed in words per minute
   */
  wordsPerMinute?: number;
}

export function getReadingTime(
  plainText: string,
  locale: Locales,
  { wordsPerMinute = 200 }: GetReadingTimeOptions = {}
): string {
  const words = plainText.split(/\s/g);
  const time = Math.max(words.length, wordsPerMinute) / wordsPerMinute;
  const mins = Math.floor(time);

  const relativeTimeInLocale = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
    style: "short",
  });
  const [, minutesPart, unitPart] = relativeTimeInLocale.formatToParts(
    mins,
    "minute"
  );

  // unit part's value starts with a space
  return `${minutesPart.value}${unitPart.value}`;
}
