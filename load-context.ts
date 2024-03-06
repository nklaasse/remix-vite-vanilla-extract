import { type PlatformProxy } from "wrangler";

// When using `wrangler.toml` to configure bindings,
// `wrangler types` will generate types for those bindings
// into the global `Env` interface.
// Need this empty interface so that typechecking passes
// even if no `wrangler.toml` exists.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Env {
  GTM_ID: string;
  CVMAKER_API_URL: string;
  CVMAKER_ENVIRONMENT: "development" | "production" | "staging";
  CVMAKER_LOCALE: string;
  STORYBLOK_SPACE_ID: number;
  STORYBLOK_SECRET: string;
  TRUSTPILOT_API_KEY: string;
}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}
