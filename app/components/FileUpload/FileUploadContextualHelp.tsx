import type { FieldContextualHelpProps } from "~/components/Field";
import { Field } from "~/components/Field";
import * as React from "react";

type FileUploadContextualHelpProps = FieldContextualHelpProps;

export function FileUploadContextualHelp(props: FileUploadContextualHelpProps) {
  return <Field.ContextualHelp {...props} />;
}
