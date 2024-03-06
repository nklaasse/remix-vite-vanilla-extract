import type {
  ButtonLabelProps,
  ButtonProps,
  LinkButtonProps,
} from "~/components/Button";
import { Button } from "~/components/Button";
import * as React from "react";
import { mergeProps } from "react-aria";
import { AlertDialogContext } from "./AlertDialog";
import { alertDialogConfirm } from "./AlertDialogConfirm.css";

export type AlertDialogConfirmProps = (
  | Omit<ButtonProps, "aria-label" | "variant" | "size" | "children">
  | Omit<LinkButtonProps, "aria-label" | "variant" | "size" | "children">
) &
  Pick<ButtonLabelProps, "children">;

/**
 * AlertDialogConfirm is used as an action for the user to confirm
 */

export function AlertDialogConfirm(props: AlertDialogConfirmProps) {
  const { children, ...otherProps } = props;

  const context = React.useContext(AlertDialogContext);

  const { confirmProps } = context.props;

  return (
    <div className={alertDialogConfirm.container}>
      <Button {...mergeProps(confirmProps, otherProps)}>
        <Button.Label>{children}</Button.Label>
      </Button>
    </div>
  );
}
