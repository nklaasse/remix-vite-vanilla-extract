import React from "react";
import {
  LabelContext as ReactAriaLabelContext,
  useContextProps,
} from "react-aria-components";
import type { FieldLabelProps } from "../Field";
import { Field } from "../Field";

export type TextAreaLabelProps = FieldLabelProps;

/**
 * Component that renders the Label for the TextArea, in case you don't want to
 * use a label, supply the Input element with an aria-label attribute.
 */
export function TextAreaLabel(props: TextAreaLabelProps) {
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
