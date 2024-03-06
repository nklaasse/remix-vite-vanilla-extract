import type { MenuItemProps } from "~/components/Menu";
import { Menu } from "~/components/Menu";

export type ActionMenuItemProps<T> = MenuItemProps<T>;

export function ActionMenuItem<T extends object>(
  props: ActionMenuItemProps<T>
) {
  return <Menu.Item {...props} />;
}
