import type { FieldContextualHelpProps } from "~/components/Field";
import { Field } from "~/components/Field";

export type AvatarUploadContextualHelpProps = FieldContextualHelpProps;

export function AvatarUploadContextualHelp(
  props: AvatarUploadContextualHelpProps
) {
  return <Field.ContextualHelp {...props} />;
}
