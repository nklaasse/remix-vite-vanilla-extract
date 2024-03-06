import * as React from "react";
import { mergeProps } from "react-aria";
import type { FieldResetProps } from "../Field";
import { Field } from "../Field";
import { TextFieldContext } from "./TextField";

export type TextFieldResetProps = FieldResetProps;

/**
 * Component that renders a reset button for the TextField.
 */
export function TextFieldReset(props: TextFieldResetProps) {
  const context = React.useContext(TextFieldContext);

  const { inputRef } = context.refs;

  const onPressEnd = React.useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <Field.Reset
      {...mergeProps(
        {
          onPressEnd,
        },
        props
      )}
    />
  );
}
