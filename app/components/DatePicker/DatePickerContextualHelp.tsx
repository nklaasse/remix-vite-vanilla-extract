import type { FieldContextualHelpProps } from "../Field";
import { Field } from "../Field";

export type DatePickerContextualHelpProps = FieldContextualHelpProps;

export function DatePickerContextualHelp(props: DatePickerContextualHelpProps) {
  return <Field.ContextualHelp {...props} />;
}
