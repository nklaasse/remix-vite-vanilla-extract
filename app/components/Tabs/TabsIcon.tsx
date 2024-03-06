import { IconProvider } from "~/icons/IconProvider";
import * as React from "react";
import { tabsIcon } from "./TabsIcon.css";

export type TabsIconProps = {
  /**
   * A single item from ~/icons
   */
  children: React.ReactNode;
};

export function TabsIcon(props: TabsIconProps) {
  const { children } = props;

  return (
    <IconProvider aria-hidden>
      <div className={tabsIcon.container}>{children}</div>
    </IconProvider>
  );
}
