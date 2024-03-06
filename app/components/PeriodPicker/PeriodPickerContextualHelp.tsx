import type { FieldContextualHelpProps } from "../Field";
import { Field } from "../Field";

type PeriodPickerContextualHelpProps = FieldContextualHelpProps;

export function PeriodPickerContextualHelp(
  props: PeriodPickerContextualHelpProps
) {
  return <Field.ContextualHelp {...props} />;
}
