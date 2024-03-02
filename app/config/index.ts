import type { AppLoadContext } from "@remix-run/cloudflare";
import { locales } from "./locales";

export { locales } from "./locales";
export type Locales = keyof typeof locales;

export const getLocale = (
  hostname: string,
  context: AppLoadContext
): Locales => {
  for (const locale of Object.keys(locales) as Array<Locales>) {
    const config = getConfig(locale, context);

    if (hostname.endsWith(config.hostname)) {
      return locale;
    }
  }

  if (context.CVMAKER_LOCALE) {
    return context.CVMAKER_LOCALE as Locales;
  }

  throw new Error(`Locale for hostname ${hostname} not found`);
};

export const getConfig = (locale: Locales, context: AppLoadContext) => {
  const environment = context.CVMAKER_ENVIRONMENT as "production" | "staging";
  const commonConfig = {
    gtmId: context.GTM_ID,
    apiUrl: context.CVMAKER_API_URL,
    environment,
  } as const;

  const { base: localeConfig, [environment]: environmentConfig } =
    locales[locale];

  return {
    ...commonConfig,
    ...localeConfig,
    ...environmentConfig,
  };
};
