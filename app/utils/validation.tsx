// Helper functions to get translated error messages to be used on form validation
import { Link } from "~/components/Link";
import type { IntlShape } from "react-intl";
const messages = {
  "required": (intl: IntlShape) =>
    intl.formatMessage({
      id: "validation.required",
      defaultMessage: "This field is required",
      description:
        "Default validation message for when the user didn't fill in a required field.",
    }),
  "invalid": (intl: IntlShape) =>
    intl.formatMessage({
      id: "validation.invalid",
      defaultMessage: "Enter a valid value",
      description:
        "Default validation message for when the user provided an invalid value.",
    }),
  "invalid_email": (intl: IntlShape) =>
    intl.formatMessage({
      id: "validation.invalid_email",
      defaultMessage: "Enter a valid email address",
      description:
        "Default validation message for when the user provided an invalid email address.",
    }),
  "invalid_choice": (intl: IntlShape) =>
    intl.formatMessage({
      id: "validation.invalid_choice",
      defaultMessage: "Enter a valid choice",
      description:
        "Default validation message for when the user has selected an invalid choice.",
    }),
  "invalid_date": (intl: IntlShape) =>
    intl.formatMessage({
      id: "validation.invalid_date",
      defaultMessage: "Enter a valid date",
      description:
        "Default validation message for when the user has provided an invalid date.",
    }),
  "invalid_datetime": (intl: IntlShape) =>
    intl.formatMessage({
      id: "validation.invalid_datetime",
      defaultMessage: "Enter a valid date and time",
      description:
        "Default validation message for when the user has provided an invalid date and time.",
    }),
  "invalid_time": (intl: IntlShape) =>
    intl.formatMessage({
      id: "validation.invalid_time",
      defaultMessage: "Enter a valid time",
      description:
        "Default validation message for when the user has provided an invalid time.",
    }),
  "invalid_url": (intl: IntlShape) =>
    intl.formatMessage({
      id: "validation.invalid_url",
      defaultMessage: "Enter a valid URL",
      description:
        "Default validation message for when the user has provided an invalid URL.",
    }),
  "max_length": (
    intl: IntlShape,
    values: {
      maxLength: number;
    }
  ) =>
    intl.formatMessage(
      {
        id: "validation.max_length",
        defaultMessage:
          "The value can not be longer than {maxLength} characters.",
        description:
          "Default validation message for when the user filled in a value that is too long.",
      },
      values
    ),
  "min_length": (
    intl: IntlShape,
    values: {
      minLength: number;
    }
  ) =>
    intl.formatMessage(
      {
        id: "validation.min_length",
        defaultMessage:
          "The value can not be shorter than {minLength} characters.",
        description:
          "Default validation message for when the user filled in a value that is too short.",
      },
      values
    ),
  "max_value": (
    intl: IntlShape,
    values: {
      maxValue: number;
    }
  ) =>
    intl.formatMessage(
      {
        id: "validation.max_value",
        defaultMessage: "The value can not be higher than {maxValue}.",
        description:
          "Default validation message for when the user filled in a value that is too high.",
      },
      values
    ),
  "min_value": (
    intl: IntlShape,
    values: {
      minValue: number;
    }
  ) =>
    intl.formatMessage(
      {
        id: "validation.min_value",
        defaultMessage: "The value can not be lower than {minValue}.",
        description:
          "Default validation message for when the user filled in a value that is too low.",
      },
      values
    ),
  "min_items": (
    intl: IntlShape,
    values: {
      minItems: number;
    }
  ) =>
    intl.formatMessage(
      {
        "id": "validation.min_items",
        "defaultMessage":
          "Select at least {minItems, plural, =1 {# item} other {# items}}",
        "description":
          "Default validation message for when the user did not select enough items.",
      },
      values
    ),
  "max_items": (
    intl: IntlShape,
    values: {
      maxItems: number;
    }
  ) =>
    intl.formatMessage(
      {
        "id": "validation.max_items",
        "defaultMessage":
          "Select at most {maxItems, plural, =1 {# item} other {# items}}",
        "description":
          "Default validation message for when the user selected too many items.",
      },
      values
    ),
  "password_mismatch": (intl: IntlShape) =>
    intl.formatMessage({
      id: "validation.password_mismatch",
      defaultMessage: "The passwords do not match",
      description:
        "Default validation message for when the user did not confirm the password correctly.",
    }),
  "unique": (intl: IntlShape) =>
    intl.formatMessage({
      id: "validation.unique",
      defaultMessage: "This value is already taken",
      description:
        "Default validation message for when the user filled in a value that is already taken.",
    }),
  "server_error": (
    intl: IntlShape,
    values: {
      supportEmail: string;
    }
  ) =>
    intl.formatMessage(
      {
        id: "validation.server_error",
        defaultMessage:
          "Something went wrong. Please try again. If the problem persists, please don't hesitate to contact our support at <link>{supportEmail}</link>. We're happy to help!",
        description:
          "Error message which is displayed when the server returns a unexpected error",
      },
      {
        link: (chunks: React.ReactNode) => (
          <Link href={`mailto:${values.supportEmail}`}>{chunks}</Link>
        ),
        supportEmail: values.supportEmail,
      }
    ),
  "invalid_credentials": (intl: IntlShape) =>
    intl.formatMessage(
      {
        id: "validation.invalid_credentials",
        defaultMessage:
          "Oops! Looks like you’ve entered the wrong username or password. Don’t worry, it happens to the best of us. Give it another try or click <link>forgot password</link> to reset your password.",
        description:
          "Error when the user enters invalid credentials in the login form",
      },
      {
        link: (chunks: React.ReactNode): JSX.Element => (
          <Link href="/app/reset-password">
            <Link.Label>{chunks}</Link.Label>
          </Link>
        ),
      }
    ),
} as const;

type FieldErrorOptions = {
  [K in keyof typeof messages]: Parameters<
    (typeof messages)[K]
  >[1] extends undefined
    ? {
        key: K;
      }
    : {
        key: K;
        values: Parameters<(typeof messages)[K]>[1];
      };
}[keyof typeof messages];

// Wrapper function which returns the error object
// This is usefull since it helps with type inference
export function createFieldError<K extends FieldErrorOptions>(options: K): K {
  return options;
}

// Method which receives the returned value of createFieldError and returns the translated message
// by using the intl object.
export function parseFieldError(
  options: ReturnType<typeof createFieldError>,
  intl: IntlShape
): ReturnType<typeof intl.formatMessage> {
  // @ts-expect-error - We don't want to type all the cases manually
  const { key, values } = options;

  return messages[key](intl, values);
}
