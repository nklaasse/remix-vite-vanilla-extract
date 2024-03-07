import type { FieldContextualHelpProps } from "~/components/Field";
import { Field } from "~/components/Field";

type FileUploadContextualHelpProps = FieldContextualHelpProps;

export function FileUploadContextualHelp(props: FileUploadContextualHelpProps) {
  return <Field.ContextualHelp {...props} />;
}
