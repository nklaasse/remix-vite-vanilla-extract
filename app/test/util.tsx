import {
  render as rtlRender,
  renderHook as rtlRenderHook,
  screen,
} from "@testing-library/react";
import { userEvent, type UserEvent } from "@testing-library/user-event";
import type { PropsWithChildren, ReactElement } from "react";
import { MemoryRouter, type MemoryRouterProps } from "react-router-dom";
import { test as viTest } from "vitest";
import { IntlProvider } from "react-intl";
import type { IntlConfig } from "react-intl/src/types";

type IntlWrapperProps = Partial<IntlConfig>;

function IntlWrapper(props: PropsWithChildren<IntlWrapperProps>) {
  const {
    children,
    locale = "en",
    messages = undefined,
    defaultLocale = "en",
  } = props;

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      defaultLocale={defaultLocale}
    >
      {children}
    </IntlProvider>
  );
}

type RouterProps = Partial<MemoryRouterProps>;

function RouterWrapper({ children, ...props }: PropsWithChildren<RouterProps>) {
  return <MemoryRouter {...props}>{children}</MemoryRouter>;
}

interface WrapperProps {
  intl?: IntlWrapperProps;
  router?: RouterProps;
}

function Wrapper({
  children,
  router = {},
  intl = {},
}: PropsWithChildren<WrapperProps>) {
  return (
    <RouterWrapper {...router}>
      <IntlWrapper {...intl}>{children}</IntlWrapper>
    </RouterWrapper>
  );
}

type RenderOptions = WrapperProps;

function render(ui: ReactElement, options: RenderOptions = {}) {
  const { intl, router, ...restOptions } = options;

  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <Wrapper intl={intl} router={router}>
        {children}
      </Wrapper>
    ),
    ...restOptions,
  });
}

type RenderHookOptions<Props> = RenderOptions & {
  initialProps?: Props;
};

function renderHook<Result, Props>(
  render: (initialProps: Props) => Result,
  options: RenderHookOptions<Props> = {}
) {
  const { intl, router, ...restOptions } = options;

  return rtlRenderHook(render, {
    wrapper: ({ children }) => (
      <Wrapper intl={intl} router={router}>
        {children}
      </Wrapper>
    ),
    ...restOptions,
  });
}

export const test = viTest.extend<{
  render: typeof render;
  renderHook: typeof renderHook;
  screen: typeof screen;
  user: UserEvent;
}>({
  async render({ task }, use) {
    await use(render);
  },
  async renderHook({ task }, use) {
    await use(renderHook);
  },
  async screen({ task }, use) {
    await use(screen);
  },
  async user({ task }, use) {
    const user = userEvent.setup();
    await use(user);
  },
});

export {
  describe,
  expect,
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
} from "vitest";
