import type { FieldContextualHelpProps } from "../Field";
import { Field } from "../Field";

type TemplateSelectContextualHelpProps = FieldContextualHelpProps;

export function TemplateSelectContextualHelp(
  props: TemplateSelectContextualHelpProps
) {
  return <Field.ContextualHelp {...props} />;
}
