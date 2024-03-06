import React from "react";
import { mergeProps, usePress } from "react-aria";
import type { FieldLabelProps } from "../Field";
import { Field } from "../Field";
import { TextEditorContext } from "./TextEditor";

export type TextEditorLabelProps = FieldLabelProps;

/**
 * Component that renders the Label for the TextEditor, in case you don't want to
 * use a label, supply the Input element with an aria-label attribute.
 */
export function TextEditorLabel(props: TextEditorLabelProps) {
  const { children } = props;

  const context = React.useContext(TextEditorContext);

  const { labelRef, editorRef } = context.refs;
  const { labelProps } = context.props;

  const { pressProps } = usePress({
    onPress: () => {
      if (editorRef.current) {
        editorRef.current.activate();
      }
    },
  });

  return (
    <Field.Label ref={labelRef} {...mergeProps(labelProps, pressProps)}>
      {children}
    </Field.Label>
  );
}
