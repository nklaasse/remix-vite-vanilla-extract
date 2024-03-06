import type { MenuLabelProps } from "~/components/Menu";
import { Menu } from "~/components/Menu";
import * as React from "react";
import { tabsLabel } from "./TabsLabel.css";
import { useElementType } from "./TabsList";

type TabsLabelMenuItemProps = MenuLabelProps;

export function TabsLabelMenuItem(props: TabsLabelMenuItemProps) {
  return <Menu.Label {...props} />;
}

type TabsLabelDefaultProps = {
  children: React.ReactNode;
};

export function TabsLabelDefault(props: TabsLabelDefaultProps) {
  const { children } = props;

  return <span className={tabsLabel.container}>{children}</span>;
}

export type TabsLabelProps = TabsLabelMenuItemProps | TabsLabelDefaultProps;

export function TabsLabel(props: TabsLabelProps) {
  const { children, ...otherProps } = props;

  const type = useElementType();

  switch (type) {
    case "menu":
      return (
        <TabsLabelMenuItem {...(otherProps as TabsLabelMenuItemProps)}>
          {children}
        </TabsLabelMenuItem>
      );
    case "list":
    case "picker":
      return (
        <TabsLabelDefault {...(otherProps as TabsLabelDefaultProps)}>
          {children}
        </TabsLabelDefault>
      );
    default:
      return null;
  }
}
