import type { ButtonIconProps } from "~/components/Button";
import { Button } from "~/components/Button";
import type { MenuIconProps } from "~/components/Menu";
import { Menu } from "~/components/Menu";
import * as React from "react";
import { ActionMenuContext, useElementType } from "./ActionMenu";

const MenuIcon = function MenuIcon(props: MenuIconProps) {
  return <Menu.Icon {...props} />;
};

function ButtonIcon(props: ButtonIconProps) {
  const context = React.useContext(ActionMenuContext);

  const { triggerIconRef } = context.refs;

  return <Button.Icon {...props} ref={triggerIconRef} />;
}

export type ActionMenuIconProps = MenuIconProps | ButtonIconProps;
/**
 * ActionMenuIcon can be optionally used inside of a ActionMenuItem
 */
export function ActionMenuIcon(props: ActionMenuIconProps) {
  const type = useElementType();

  switch (type) {
    case "menu":
      return <MenuIcon {...props} />;
    case "trigger":
      return <ButtonIcon {...props} />;
    default:
      return null;
  }
}
