import React from "react";
import {
  LabelContext as ReactAriaLabelContext,
  useContextProps,
} from "react-aria-components";
import type { FieldLabelProps } from "../Field";
import { Field } from "../Field";

export type TextFieldLabelProps = FieldLabelProps;

/**
 * Component that renders the Label for the TextField, in case you don't want to
 * use a label, supply the Input element with an aria-label attribute.
 */
export function TextFieldLabel(props: TextFieldLabelProps) {
  const { children } = props;

  const ref = React.useRef<HTMLLabelElement>(null);

  const [labelProps, labelRef] = useContextProps(
    props,
    ref,
    ReactAriaLabelContext
  );

  return (
    <Field.Label ref={labelRef} {...labelProps}>
      {children}
    </Field.Label>
  );
}
