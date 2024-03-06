import * as React from "react";
import { fieldDescription } from "./FieldDescription.css";

export type FieldDescriptionProps = React.HTMLAttributes<HTMLElement> & {
  /**
   * The content to display as the errorMessage.
   */
  children?: React.ReactNode;
};

/**
 * FieldDescription should optionally be rendered inside of the Field component, it renders the description with the correct HTML attributes when available.
 */
export const FieldDescription = React.forwardRef<
  HTMLDivElement,
  FieldDescriptionProps
>(function FieldDescription(props, ref) {
  const { children } = props;

  return (
    <span {...props} ref={ref} className={fieldDescription.container}>
      {children}
    </span>
  );
});
