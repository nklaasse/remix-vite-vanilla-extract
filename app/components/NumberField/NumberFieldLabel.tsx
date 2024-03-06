import type { FieldLabelProps } from "~/components/Field";
import { Field } from "~/components/Field";
import * as React from "react";
import {
  LabelContext as ReactAriaLabelContext,
  useContextProps,
} from "react-aria-components";

type NumberFieldLabelProps = FieldLabelProps;

export function NumberFieldLabel(props: NumberFieldLabelProps) {
  const { children } = props;

  const ref = React.useRef<HTMLLabelElement>(null);

  const [labelProps, labelRef] = useContextProps(
    props,
    ref,
    ReactAriaLabelContext
  );

  return (
    <Field.Label {...labelProps} ref={labelRef}>
      {children}
    </Field.Label>
  );
}
