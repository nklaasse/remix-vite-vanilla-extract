import type { ListBoxIconProps } from "../ListBox";
import { ListBox } from "../ListBox";

export type PickerIconProps = ListBoxIconProps;

/**
 * PickerIcon renders the icon when selected or in the popover / tray, there can only be a single
 * PickerIcon in every PickerItem
 */
export function PickerIcon(props: PickerIconProps) {
  return <ListBox.Icon {...props} />;
}
