import type { ListBoxLabelProps } from "../ListBox";
import { ListBox } from "../ListBox";

export type ComboBoxDescriptionProps = ListBoxLabelProps;

/**
 * ComboBoxDescription renders a description inside of the listbox
 */
export function ComboBoxDescription(props: ComboBoxDescriptionProps) {
  return <ListBox.Description {...props} />;
}
