import * as React from "react";
import { menuAction } from "./MenuAction.css";
import { MenuItemContext } from "./MenuItem";

type MenuActionProps = {
  /** A Menu.Label and optionally an Menu.Description, Menu.Icon */
  children: React.ReactNode;
};

export function MenuAction(props: MenuActionProps) {
  const context = React.useContext(MenuItemContext);

  const { menuItemProps } = context.props;
  const { menuItemRef } = context.refs;

  const { children } = props;

  return (
    <div
      {...menuItemProps}
      // Note: Don't understand how I would do this otherwise with a more generic HTMLElement
      ref={menuItemRef as React.RefObject<HTMLDivElement>}
      className={menuAction.container}
    >
      {children}
    </div>
  );
}
