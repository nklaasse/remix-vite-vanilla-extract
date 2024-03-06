import type { ListBoxIconProps } from "../ListBox";
import { ListBox } from "../ListBox";

export type ComboBoxIconProps = ListBoxIconProps;

/**
 * ComboBoxIcon renders the icon when selected or in the popover / tray, there can only be a single
 * ComboBoxIcon in every ComboBoxItem
 */
export function ComboBoxIcon(props: ComboBoxIconProps) {
  return <ListBox.Icon {...props} />;
}
