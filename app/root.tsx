import type { LinksFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";

import { cssBundleHref } from "@remix-run/css-bundle";
import "~/fonts/Arab.css";
import "~/fonts/Latn.css";
import "~/fonts/Cyrl.css";
import "~/fonts/Grek.css";
import "~/fonts/Jpan.css";
import "~/fonts/Kore.css";

import { modes } from "~/css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";

import {
  I18nProvider,
  useLocale,
  RouterProvider as ReactAriaRouterProvider,
} from "react-aria";
import { getLocale } from "./config";
import { IntlProvider } from "react-intl";
import { ToastProvider } from "./components/Toast";
import classNames from "classnames";

export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ];
};

export const loader = async function loader(args) {
  const { request, context } = args;

  const url = new URL(request.url);

  // Get config by hostname
  const locale = getLocale(url.hostname, context);

  return json({
    locale,
  });
} satisfies LoaderFunction;

export default function App() {
  const { locale } = useLoaderData<typeof loader>();

  return (
    <I18nProvider locale={locale}>
      <IntlProvider
        locale={locale}
        messages={undefined}
        // disable error messages as we don't have the json files yet
        // this way we will only use the default messages for now
        onError={() => {}}
      >
        <ToastProvider>
          <Root />
        </ToastProvider>
      </IntlProvider>
    </I18nProvider>
  );
}

/**
 * Component that wraps the html element to access the locale and direction from the I18nProvider
 */

const SUPPORTED_SCRIPTS = ["Arab", "Latn", "Cyrl", "Grek", "Jpan", "Kore"];

function Root() {
  const { direction, locale } = useLocale();
  const script = new Intl.Locale(locale).maximize().script ?? "Latn";

  const navigate = useNavigate();

  return (
    <html lang={locale} dir={direction}>
      <head>
        {/* //? Global meta added manually to avoid meta merged conflicts with Remix -> https://remix.run/docs/en/main/route/meta-v2#global-meta  */}
        <meta charSet="utf-8" />
        <meta title="CV Maker" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body
        className={classNames(modes.light)}
        data-script={SUPPORTED_SCRIPTS.includes(script) ? script : "Latn"}
      >
        <ReactAriaRouterProvider
          navigate={(path: string) => {
            // We want to check if the url starts with /app in case it starts with /app it means that it needs to "navigate" somewhere outside of the
            // site-next project. In this case we want to redirect the user to the new url instead of using the remix routing.
            const prefix = "/app";

            if (path.startsWith(prefix)) {
              window.location.href = path;
            } else {
              navigate(path);
            }
          }}
        >
          <Outlet />
        </ReactAriaRouterProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const { direction, locale } = useLocale();

  if (isRouteErrorResponse(error)) {
    return (
      <html lang={locale} dir={direction}>
        <head>
          <title>Oops!</title>
          <Meta />
          <Links />
        </head>
        <body>
          <h1>Oops, something went wrong.</h1>
          <p>Status: {error.status}</p>
          <pre>{error.data.message}</pre>
          <Scripts />
        </body>
      </html>
    );
  } else if (error instanceof Error) {
    return (
      <html lang={locale} dir={direction}>
        <head>
          <title>Oops!</title>
          <Meta />
          <Links />
        </head>
        <body>
          <h1>Oops, something went wrong.</h1>
          <pre>{error.message}</pre>
          <Scripts />
        </body>
      </html>
    );
  } else {
    return (
      <html lang={locale} dir={direction}>
        <head>
          <title>Oops!</title>
          <Meta />
          <Links />
        </head>
        <body>
          <h1>Unknown error</h1>
          <pre>{JSON.stringify(error)}</pre>
          <Scripts />
        </body>
      </html>
    );
  }
}
