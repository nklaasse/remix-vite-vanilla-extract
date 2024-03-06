import type { ActionMenuItemProps } from "../ActionMenu";
import { ActionMenu } from "../ActionMenu";

type DocumentItemProps<T> = ActionMenuItemProps<T>;

export function DocumentItem<T extends object>(props: DocumentItemProps<T>) {
  return <ActionMenu.Item {...props} />;
}
