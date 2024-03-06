import type { ActionMenuLabelProps } from "~/components/ActionMenu";
import { ActionMenu } from "~/components/ActionMenu";

type DocumentLabelProps = ActionMenuLabelProps;

export function DocumentLabel(props: DocumentLabelProps) {
  return <ActionMenu.Label {...props} />;
}
