import * as React from "react";
import { fieldLabel } from "./FieldLabel.css";

export type FieldLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  /**
   * The content to display as the label.
   */
  children: string;
};

/**
 * FieldLabel should always be rendered inside of the Field component
 */
export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  function FieldLabel(props, ref) {
    const { children, ...otherProps } = props;

    return (
      <label {...otherProps} ref={ref} className={fieldLabel.container}>
        {children}
      </label>
    );
  }
);
