import * as React from "react";
import { fieldInput } from "./FieldInput.css";

export type FieldInputProps = {
  /**
   * Any valid react child
   */
  children: React.ReactNode;
};

/**
 * FieldInput should always be rendered inside of the Field component, it positions the Input element correctly with the necessary spacings
 */
export const FieldInput = React.forwardRef(function FieldInput(
  props: FieldInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { children } = props;

  return (
    <div className={fieldInput.container} ref={ref}>
      {children}
    </div>
  );
});
