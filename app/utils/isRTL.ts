// Copied from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/i18n/src/utils.ts.

// https://en.wikipedia.org/wiki/Right-to-left
const RTL_SCRIPTS = new Set([
  "Arab",
  "Syrc",
  "Samr",
  "Mand",
  "Thaa",
  "Mend",
  "Nkoo",
  "Adlm",
  "Rohg",
  "Hebr",
]);
const RTL_LANGS = new Set([
  "ae",
  "ar",
  "arc",
  "bcc",
  "bqi",
  "ckb",
  "dv",
  "fa",
  "glk",
  "he",
  "ku",
  "mzn",
  "nqo",
  "pnb",
  "ps",
  "sd",
  "ug",
  "ur",
  "yi",
]);

/**
 * Determines if a locale is read right to left using [Intl.Locale]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale}.
 */
export function isRTL(locale: string) {
  // If the Intl.Locale API is available, use it to get the script for the locale.
  // This is more accurate than guessing by language, since languages can be written in multiple scripts.
  if (Intl.Locale) {
    const script = new Intl.Locale(locale).maximize().script as string;
    return RTL_SCRIPTS.has(script);
  }

  // If not, just guess by the language (first part of the locale)
  const lang = locale.split("-")[0];
  return RTL_LANGS.has(lang);
}
