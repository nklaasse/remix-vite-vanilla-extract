import { mergeRefs } from "@react-aria/utils";
import * as React from "react";
import { FieldContext } from "./Field";
import { fieldErrorMessage } from "./FieldErrorMessage.css";

export type FieldErrorMessageProps = React.HTMLAttributes<HTMLElement> & {
  /**
   * The content to display as the errorMessage.
   */
  children?: React.ReactNode;
};

/**
 * FieldErrorMessage should optionally be rendered inside of the Field component, it renders the errorMessage with the correct HTML attributes when available.
 */
export const FieldErrorMessage = React.forwardRef<
  HTMLDivElement,
  FieldErrorMessageProps
>(function FieldErrorMessage(props, ref) {
  const { children } = props;

  const context = React.useContext(FieldContext);

  const { errorMessageRef } = context.refs;

  const defaultErrorMessageRef = mergeRefs(ref, errorMessageRef);

  return (
    <span
      {...props}
      ref={defaultErrorMessageRef}
      className={fieldErrorMessage.container}
    >
      {children}
    </span>
  );
});
