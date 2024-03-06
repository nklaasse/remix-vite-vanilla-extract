import type { ActionMenuIconProps } from "~/components/ActionMenu";
import { ActionMenu } from "~/components/ActionMenu";

type DocumentIconProps = ActionMenuIconProps;

export function DocumentIcon(props: DocumentIconProps) {
  return <ActionMenu.Icon {...props} />;
}
