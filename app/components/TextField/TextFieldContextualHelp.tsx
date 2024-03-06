import type { FieldContextualHelpProps } from "../Field";
import { Field } from "../Field";

type TextFieldContextualHelpProps = FieldContextualHelpProps;

export function TextFieldContextualHelp(props: TextFieldContextualHelpProps) {
  return <Field.ContextualHelp {...props} />;
}
