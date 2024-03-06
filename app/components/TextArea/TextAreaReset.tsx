import * as React from "react";
import { mergeProps } from "react-aria";
import type { FieldResetProps } from "../Field";
import { Field } from "../Field";
import { TextAreaContext } from "./TextArea";

export type TextAreaResetProps = FieldResetProps;

/**
 * Component that renders a reset button for the TextArea.
 */
export function TextAreaReset(props: TextAreaResetProps) {
  const context = React.useContext(TextAreaContext);

  const { textAreaRef } = context.refs;

  const onPressEnd = React.useCallback(() => {
    textAreaRef.current?.focus();
  }, [textAreaRef]);

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
