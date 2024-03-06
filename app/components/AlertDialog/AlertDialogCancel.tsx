import type {
  ButtonLabelProps,
  ButtonProps,
  LinkButtonProps,
} from "~/components/Button";
import { Button } from "~/components/Button";
import * as React from "react";
import { mergeProps } from "react-aria";
import { AlertDialogContext } from "./AlertDialog";
import { alertDialogCancel } from "./AlertDialogCancel.css";

export type AlertDialogCancelProps = (
  | Omit<ButtonProps, "aria-label" | "variant" | "size" | "children">
  | Omit<LinkButtonProps, "aria-label" | "variant" | "size" | "children">
) &
  Pick<ButtonLabelProps, "children">;

/**
 * AlertDialogCancel is used as an action for the user to cancel
 */
export function AlertDialogCancel(props: AlertDialogCancelProps) {
  const { children, ...otherProps } = props;

  const context = React.useContext(AlertDialogContext);

  const { cancelProps } = context.props;

  return (
    <div className={alertDialogCancel.container}>
      <Button {...mergeProps(cancelProps, otherProps)} variant="secondary">
        <Button.Label>{children}</Button.Label>
      </Button>
    </div>
  );
}
