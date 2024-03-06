import { Button } from "~/components/Button";
import { IconProvider } from "~/icons/IconProvider";
import * as React from "react";
import { useElementType } from "./Menu";
import { menuIcon } from "./MenuIcon.css";

type InternalMenuIconProps = MenuIconProps;

function InternalMenuIcon(props: InternalMenuIconProps) {
  const { children } = props;

  return (
    <div className={menuIcon.container}>
      <IconProvider aria-hidden>{children}</IconProvider>
    </div>
  );
}

export type MenuIconProps = {
  /**
   * A single item from ~/icons
   */
  children: React.ReactNode;
};

/**
 * MenuIcon can be optionally used inside of a MenuItem or MenuButton
 */
export function MenuIcon(props: MenuIconProps) {
  const type = useElementType();

  const { children } = props;

  switch (type) {
    case "trigger":
      return <Button.Icon>{children}</Button.Icon>;
    case "menu":
      return <InternalMenuIcon>{children}</InternalMenuIcon>;
    default:
      return null;
  }
}
