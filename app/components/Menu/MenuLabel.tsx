import { Button } from "~/components/Button";
import * as React from "react";
import { Text as ReactAriaText } from "react-aria-components";
import { useElementType } from "./Menu";
import { menuLabel } from "./MenuLabel.css";

export type InternalMenuLabelProps = MenuLabelProps;

function InternalMenuLabel(props: InternalMenuLabelProps) {
  return (
    <ReactAriaText slot="label" className={menuLabel.container}>
      {props.children}
    </ReactAriaText>
  );
}

export type MenuLabelProps = {
  /**
   * The content to display as a label
   */
  children: React.ReactNode;
};

/**
 * MenuLabel renders the label of an individual MenuItem
 */
export function MenuLabel(props: MenuLabelProps) {
  const { children } = props;

  const type = useElementType();

  switch (type) {
    case "menu":
      return <InternalMenuLabel>{children}</InternalMenuLabel>;
    case "trigger":
      return <Button.Label>{children}</Button.Label>;
    default:
      return null;
  }
}
