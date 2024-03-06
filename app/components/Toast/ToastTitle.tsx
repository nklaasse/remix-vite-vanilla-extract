import React from "react";
import { ToastContentContext } from "./Toast";
import { toastTitle } from "./ToastTitle.css";

type ToastTitleProps = {
  /**
   * Text content for toast title
   */
  children: React.ReactNode;
};

export function ToastTitle(props: ToastTitleProps) {
  const { children } = props;

  const context = React.useContext(ToastContentContext);
  const { titleProps } = context.props;

  return (
    <b className={toastTitle.container} {...titleProps}>
      {children}
    </b>
  );
}
