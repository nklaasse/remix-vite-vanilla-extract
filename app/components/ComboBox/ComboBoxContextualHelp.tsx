import type { FieldContextualHelpProps } from "~/components/Field";
import { Field } from "~/components/Field";
import { useElementType } from "./ComboBox";

export type ComboboxContextualHelpProps = FieldContextualHelpProps;

function RootComboBoxContextualHelp(props: ComboboxContextualHelpProps) {
  return <Field.ContextualHelp {...props} />;
}

export function ComboBoxContextualHelp(props: ComboboxContextualHelpProps) {
  const type = useElementType();

  switch (type) {
    case "root":
      return <RootComboBoxContextualHelp {...props} />;
    default:
      return null;
  }
}
