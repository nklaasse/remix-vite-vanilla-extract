import { useSlot } from "~/hooks/useSlot";
import classNames from "classnames";
import * as React from "react";
import { field } from "./Field.css";
import { FieldContextualHelp } from "./FieldContextualHelp";
import { FieldDescription } from "./FieldDescription";
import { FieldErrorMessage } from "./FieldErrorMessage";
import { FieldInput } from "./FieldInput";
import { FieldLabel } from "./FieldLabel";
import { FieldReset } from "./FieldReset";
import { FieldValueLabel } from "./FieldValueLabel";

type FieldContextValue = {
  refs: {
    errorMessageRef: React.RefCallback<HTMLDivElement>;
  };
};

export const FieldContext = React.createContext<FieldContextValue>({
  refs: {
    errorMessageRef: () => {},
  },
});

export type FieldProps = {
  /**
   * A FieldInput, FieldLabel and optionally FieldErrorMessage and FieldValueLabel elements
   */
  children: React.ReactNode;
  /**
   * Hide the label visually
   *
   * @default false
   */
  hideLabel?: boolean;
};

/**
 * Renders a Input, label and related elements with the correct layout
 */
const _Field = React.forwardRef(function Field(
  props: FieldProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { children, hideLabel = false } = props;

  const [errorMessageRef, errorMessage] = useSlot();

  return (
    <FieldContext.Provider
      value={{
        refs: {
          errorMessageRef,
        },
      }}
    >
      <div
        className={classNames(
          field.container,
          field.variants.hideLabel[String(hideLabel)],
          field.variants.hasErrorMessage[String(errorMessage)]
        )}
        ref={ref}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
});

export const Field = Object.assign({}, _Field, {
  Label: FieldLabel,
  ValueLabel: FieldValueLabel,
  Input: FieldInput,
  ErrorMessage: FieldErrorMessage,
  Description: FieldDescription,
  Reset: FieldReset,
  ContextualHelp: FieldContextualHelp,
});
