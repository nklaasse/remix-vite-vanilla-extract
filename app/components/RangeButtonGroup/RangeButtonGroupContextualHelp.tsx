import type { FieldContextualHelpProps } from "../Field";
import { Field } from "../Field";

type RangeButtonGroupContextualHelpProps = FieldContextualHelpProps;

export function RangeButtonGroupContextualHelp(
  props: RangeButtonGroupContextualHelpProps
) {
  return <Field.ContextualHelp {...props} />;
}
