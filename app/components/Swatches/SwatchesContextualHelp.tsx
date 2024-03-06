import type { FieldContextualHelpProps } from "../Field";
import { Field } from "../Field";

type SwatchesContextualHelpProps = FieldContextualHelpProps;

export function SwatchesContextualHelp(props: SwatchesContextualHelpProps) {
  return <Field.ContextualHelp {...props} />;
}
