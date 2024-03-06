import type { FieldContextualHelpProps } from "../Field";
import { Field } from "../Field";

type TextAreaContextualHelpProps = FieldContextualHelpProps;

export function TextAreaContextualHelp(props: TextAreaContextualHelpProps) {
  return <Field.ContextualHelp {...props} />;
}
