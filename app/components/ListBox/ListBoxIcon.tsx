import { IconProvider } from "~/icons/IconProvider";
import * as React from "react";
import { listBoxIcon } from "./ListBoxIcon.css";

export type ListBoxIconProps = {
  /**
   * A single item from ~/icons
   */
  children: React.ReactNode;
};

/**
 * PickerLabel renders the label when selected or in the popover / tray, there can only be a single
 * PickerLabel in every PickerItem
 */
export function ListBoxIcon(props: ListBoxIconProps) {
  const { children } = props;

  return (
    <div className={listBoxIcon.container}>
      <IconProvider aria-hidden>{children}</IconProvider>
    </div>
  );
}
