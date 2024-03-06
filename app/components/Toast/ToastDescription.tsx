import React from "react";
import { ToastContentContext } from "./Toast";
import { toastDescription } from "./ToastDescription.css";

type ToastDescriptionProps = {
  /**
   * Text content for toast description
   */
  children: React.ReactNode;
};

export function ToastDescription(props: ToastDescriptionProps) {
  const { children } = props;

  const context = React.useContext(ToastContentContext);
  const { descriptionProps } = context.props;

  return (
    <p className={toastDescription.container} {...descriptionProps}>
      {children}
    </p>
  );
}
