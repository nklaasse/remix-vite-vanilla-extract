import { useAlternativeScript } from "~/hooks/useAlternativeScript";
import type { DOMProps } from "~/utils/filterDOMProps";
import { filterDOMProps } from "~/utils/filterDOMProps";
import classname from "classnames";
import * as React from "react";
import { inputGroupValue } from "./inputGroupValue.css";

type InputGroupValueProps = {
  /**
   * Any valid react children
   */
  children: React.ReactNode;
} & DOMProps;

/**
 * InputGroupValue can be used to display specific input types inside the InputGroup for example the date segments of a DatePicker or the selected value in a Picker
 */
export const InputGroupValue = React.forwardRef(function InputGroupValue(
  props: InputGroupValueProps,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  const { children, ...otherProps } = props;

  const script = useAlternativeScript(otherProps);

  return (
    <span
      {...filterDOMProps(otherProps)}
      className={classname(inputGroupValue.container, script)}
      ref={ref}
    >
      {children}
    </span>
  );
});
