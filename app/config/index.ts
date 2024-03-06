import type { AppLoadContext } from "@remix-run/cloudflare";
import { locales } from "./locales";

export { locales } from "./locales";
export type Locales = keyof typeof locales;

export const getLocale = (
  hostname: string,
  context: AppLoadContext
): Locales => {
  const { env } = context.cloudflare;
  for (const locale of Object.keys(locales) as Array<Locales>) {
    const config = getConfig(locale, context);

    if (hostname.endsWith(config.hostname)) {
      return locale;
    }
  }

  if (env.CVMAKER_LOCALE) {
    return env.CVMAKER_LOCALE as Locales;
  }

  throw new Error(`Locale for hostname ${hostname} not found`);
};

export const getConfig = (locale: Locales, context: AppLoadContext) => {
  const { env } = context.cloudflare;
  const commonConfig = {
    gtmId: env.GTM_ID,
    apiUrl: env.CVMAKER_API_URL,
    environment: env.CVMAKER_ENVIRONMENT,
  } as const;

  const { base: localeConfig, [env.CVMAKER_ENVIRONMENT]: environmentConfig } =
    locales[locale];

  return {
    ...commonConfig,
    ...localeConfig,
    ...environmentConfig,
  };
};
