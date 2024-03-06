import type { MetaFunction } from "@remix-run/react";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type { IntlShape } from "react-intl";
import { useIntl } from "react-intl";
import { Button } from "~/components/Button";
import { errorPage } from "./_marketing.css";
import cvMakerLogo from "~/images/CVMakerLogo.svg";
import DummyYourNextCV from "~/images/DummyYourNextCV.svg";

export const meta: MetaFunction = () => {
  return [{ title: "Oops!" }];
};

type ErrorMessages = {
  titleLabel: string;
  explanationLabel: string;
  redirectionLabel: string;
  button: {
    label: string;
    to: string;
  };
};

const messages = {
  general: (intl: IntlShape): ErrorMessages => ({
    titleLabel: intl.formatMessage({
      id: "routes.marketingErrorBoundary.generalErrorTitle",
      defaultMessage: "Oops, something went wrong.",
      description: "Heading of the general error page",
    }),
    explanationLabel: intl.formatMessage({
      id: "routes.marketingErrorBoundary.generalErrorExplanationParagraph",
      defaultMessage: "We're having some issues at the moment.",
      description: "Explanation that we're having issues at the moment",
    }),
    redirectionLabel: intl.formatMessage({
      id: "routes.marketingErrorBoundary.generalErrorToRedirectionParagraph",
      defaultMessage:
        "Feel free to reach out to our support team if this page keeps coming up.",
      description: "Suggestion to redirect the user to the contact page",
    }),
    button: {
      label: intl.formatMessage({
        id: "routes.marketingErrorBoundary.buttonContactPageLabel",
        defaultMessage: "Contact us",
        description: "Button label to redirect the user to the contact page",
      }),
      to: "/contact",
    },
  }),
  not_found: (intl: IntlShape): ErrorMessages => ({
    titleLabel: intl.formatMessage({
      id: "routes.marketingErrorBoundary.notFoundTitle",
      defaultMessage: "Oops, we can't find that page.",
      description: "Heading of the 404 error page",
    }),
    explanationLabel: intl.formatMessage({
      id: "routes.marketingErrorBoundary.notFoundExplanationParagraph",
      defaultMessage:
        "We make finding a job easier, but unfortunately we couldn't find this page.",
      description: "Explanation for not being possible to find that page",
    }),
    redirectionLabel: intl.formatMessage({
      id: "routes.marketingErrorBoundary.notFoundToRedirectionParagraph",
      defaultMessage:
        "You might find what you're looking for from our homepage.",
      description: "Suggestion to redirect the user to the homepage",
    }),
    button: {
      label: intl.formatMessage({
        id: "routes.marketingErrorBoundary.buttonHomepageLabel",
        defaultMessage: "Back to our homepage",
        description: "Button label to redirect the user to the homepage",
      }),
      to: "/",
    },
  }),
  unknown: (intl: IntlShape): ErrorMessages => ({
    titleLabel: intl.formatMessage({
      id: "routes.marketingErrorBoundary.unknownErrorTitle",
      defaultMessage: "Oops, something unexpected happened.",
      description: "Heading of the unknown error page",
    }),
    explanationLabel: intl.formatMessage({
      id: "routes.marketingErrorBoundary.unknownErrorExplanationParagraph",
      defaultMessage:
        "We encountered an unknown error while processing your request.",
      description: "Explanation that we're having issues at the moment",
    }),
    redirectionLabel: intl.formatMessage({
      id: "routes.marketingErrorBoundary.unknownErrorToRedirectionParagraph",
      defaultMessage:
        "Please try again later or contact our support team for assistance.",
      description: "Suggestion to redirect the user to the contact page",
    }),
    button: {
      label: intl.formatMessage({
        id: "routes.marketingErrorBoundary.buttonContactPageLabel",
        defaultMessage: "Contact us",
        description: "Button label to redirect the user to the contact page",
      }),
      to: "/contact",
    },
  }),
};

function ErrorPage(messages: ErrorMessages, errorMessage?: string) {
  const { titleLabel, explanationLabel, redirectionLabel, button } = messages;

  return (
    <div className={errorPage.container}>
      <div className={errorPage.content}>
        <section className={errorPage.column}>
          <img className={errorPage.logo} src={cvMakerLogo} alt="CV Maker" />
          <h1 className={errorPage.title}>{titleLabel}</h1>
          <p className={errorPage.paragraph}>
            {errorMessage ? errorMessage : explanationLabel}
          </p>
          <p className={errorPage.paragraph}>{redirectionLabel}</p>
          <div className={errorPage.button}>
            <Button href={button.to}>
              <Button.Label>{button.label}</Button.Label>
            </Button>
          </div>
        </section>
        <div className={errorPage.column}>
          <div className={errorPage.shapeContainer}>
            <div className={errorPage.shape1}></div>
            <div className={errorPage.shape2}></div>
            <div className={errorPage.shape3}></div>
            <img className={errorPage.image} src={DummyYourNextCV} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

function UnknownErrorPage() {
  const intl = useIntl();

  return ErrorPage(messages["unknown"](intl));
}

function ErrorMessagePage(message: string) {
  const intl = useIntl();

  return ErrorPage(messages["general"](intl), message);
}

function NotFoundErrorPage() {
  const intl = useIntl();

  return ErrorPage(messages["not_found"](intl));
}

function GeneralErrorPage() {
  const intl = useIntl();

  return ErrorPage(messages["general"](intl));
}

export function ErrorBoundary() {
  const error = useRouteError();

  // this conditional handles `throw new Response()`
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 400:
        return <GeneralErrorPage />;
      case 401:
        return <NotFoundErrorPage />;
      case 404:
        return <NotFoundErrorPage />;
      case 500:
        return <GeneralErrorPage />;
      default:
        return <GeneralErrorPage />;
    }
    // this conditional handles `throw new Error()`
  } else if (error instanceof Error) {
    return ErrorMessagePage(error.message);
  }

  // Fallback for unknown errors
  console.error(JSON.stringify(error));
  return <UnknownErrorPage />;
}
