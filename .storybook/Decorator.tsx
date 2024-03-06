/// <reference lib="dom" />

import { I18nProvider, useLocale } from "react-aria";
import { Decorator as DecoratorType } from "@storybook/react";
import React from "react";
import { Provider } from "../app/components/Provider";
import { IntlProvider } from "react-intl";
import { modes } from "../app/css";
import { scripts } from "../app/fonts";

const colorHashToContext = {
  "#fdfcfd": modes.light,
  "#161618": modes.dark,
};

type SyncLocaleProps = {
  element: HTMLElement;
};

function SyncLocale(props: SyncLocaleProps) {
  const { element } = props;

  const { direction, locale } = useLocale();

  React.useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", locale);

    element.setAttribute("dir", direction);
    element.setAttribute("lang", locale);
  }, [direction, locale, element]);

  return null;
}

type SyncFontsProps = {
  locale: string;
  fonts: typeof scripts;
};

function SyncFonts(props: SyncFontsProps) {
  const { locale, fonts } = props;
  const intlLocale = new Intl.Locale(locale).maximize();

  function isSupportedFont(value: unknown): value is keyof typeof fonts {
    return typeof value === "string" && value in fonts;
  }

  let cls = fonts.Latn;
  if (isSupportedFont(intlLocale.script)) {
    cls = fonts[intlLocale.script];
  }

  React.useEffect(() => {
    document.documentElement.classList.add(cls);

    return () => {
      document.documentElement.classList.remove(cls);
    };
  }, [cls]);

  return null;
}

export const Decorator: DecoratorType = (Story, options) => {
  const background = options.globals?.backgrounds?.value || "#ffffff";
  // @ts-ignore
  const classNames = colorHashToContext[background] || modes.light;

  const locale = options.globals[0];

  React.useEffect(() => {
    const body = document.body;

    body.style.transition = "auto";
    body.style.background = "unset";
    body.style.overflow = "hidden";

    for (const classes of Object.values(modes)) {
      body.classList.remove(...classes.split(" "));
    }

    body.classList.add(...classNames.split(" "));
  }, [classNames]);

  return (
    <I18nProvider locale={locale}>
      <SyncLocale element={options.canvasElement} />
      <SyncFonts locale={String(locale)} fonts={scripts} />

      <Provider>
        <IntlProvider locale={locale}>
          <Story />
        </IntlProvider>
      </Provider>
    </I18nProvider>
  );
};
