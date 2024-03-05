import { locales } from "../config";
/**
 *
 * @param url string
 * @returns A url without locale for internal links
 *
 */
export function stripLocaleFromUrl(url: string) {
  const regex = new RegExp(`^(${Object.keys(locales).join("|")})/(.*)$`, "i");

  const match = regex.exec(url);
  if (match) {
    return { locale: match[1], url: match[2] };
  } else {
    return { locale: null, url };
  }
}
