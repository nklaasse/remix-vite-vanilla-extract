import type { FieldContextualHelpProps } from "../Field";
import { Field } from "../Field";

type TextEditorContextualHelpProps = FieldContextualHelpProps;

export function TextEditorContextualHelp(props: TextEditorContextualHelpProps) {
  return <Field.ContextualHelp {...props} />;
}
