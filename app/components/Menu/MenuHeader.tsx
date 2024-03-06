import * as React from "react";
import { Header as ReactAriaHeader } from "react-aria-components";
import { menuHeader } from "./MenuHeader.css";

export type MenuHeaderProps = {
  children: React.ReactNode;
};

export function MenuHeader(props: MenuHeaderProps) {
  const { children, ...otherProps } = props;

  return (
    <ReactAriaHeader {...otherProps} className={menuHeader.container}>
      {children}
    </ReactAriaHeader>
  );
}
