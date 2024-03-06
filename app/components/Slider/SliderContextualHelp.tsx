import type { FieldContextualHelpProps } from "../Field";
import { Field } from "../Field";

export type SliderContextualHelpProps = FieldContextualHelpProps;

export function SliderContextualHelp(props: SliderContextualHelpProps) {
  return <Field.ContextualHelp {...props} />;
}
