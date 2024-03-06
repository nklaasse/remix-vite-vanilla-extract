import type { DialogTriggerProps as ReactAriaDialogTriggerProps } from "react-aria-components";
import { DialogTrigger as ReactAriaDialogTrigger } from "react-aria-components";

export type AlertDialogTriggerProps = ReactAriaDialogTriggerProps;

export function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  const { children, ...otherProps } = props;

  return (
    <ReactAriaDialogTrigger {...otherProps}>{children}</ReactAriaDialogTrigger>
  );
}
