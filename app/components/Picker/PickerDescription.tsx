import * as React from "react";
import type { ListBoxDescriptionProps } from "../ListBox";
import { ListBox } from "../ListBox";

export type PickerDescriptionProps = ListBoxDescriptionProps;

/**
 * PickerDescription renders a description inside of the listbox, if the value is selected
 * the description wouldn't be displayed
 */
export function PickerDescription(props: PickerDescriptionProps) {
  return <ListBox.Description {...props} />;
}
