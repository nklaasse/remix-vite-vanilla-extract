import type { FieldContextualHelpProps } from "~/components/Field";
import { Field } from "../Field";

type PickerContextualHelpProps = FieldContextualHelpProps;

export function PickerContextualHelp(props: PickerContextualHelpProps) {
  return <Field.ContextualHelp {...props} />;
}
