import type { ButtonIconProps } from "~/components/Button";
import { Button } from "~/components/Button";
import * as React from "react";
import { useElementType } from "./Navigation";
import { drawerIcon, menuItemIcon } from "./NavigationIcon.css";

export type NavigationIconProps = {
  /**
   * A single item from ~/icons
   */
  children: React.ReactNode;
};

type MenuItemIconProps = NavigationIconProps;

function MenuItemIcon(props: MenuItemIconProps) {
  const { children } = props;

  return <span className={menuItemIcon.container}>{children}</span>;
}

function ButtonIcon(props: ButtonIconProps) {
  const { children } = props;

  return <Button.Icon>{children}</Button.Icon>;
}

type DrawerIconProps = {
  /**
   * A single item from ~/icons
   */
  children: React.ReactNode;
};

function DrawerIcon(props: DrawerIconProps) {
  const { children } = props;

  return <span className={drawerIcon.container}>{children}</span>;
}

export function NavigationIcon(props: NavigationIconProps) {
  const type = useElementType();

  switch (type) {
    case "rail":
    case "bar":
      return <MenuItemIcon {...props} />;
    case "button":
      return <ButtonIcon {...props} />;
    case "drawer":
      return <DrawerIcon {...props} />;
    default:
      return null;
  }
}
