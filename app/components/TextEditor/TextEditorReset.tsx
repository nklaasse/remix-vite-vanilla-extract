import * as React from "react";
import { mergeProps } from "react-aria";
import type { FieldResetProps } from "../Field";
import { Field } from "../Field";
import { TextEditorContext } from "./TextEditor";

export type TextEditorResetProps = FieldResetProps;

/**
 * Component that renders a reset button for the TextEditor.
 */
export function TextEditorReset(props: TextEditorResetProps) {
  const context = React.useContext(TextEditorContext);

  const { editorRef } = context.refs;

  const onPressEnd = React.useCallback(() => {
    editorRef.current?.activate();
  }, [editorRef]);

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
