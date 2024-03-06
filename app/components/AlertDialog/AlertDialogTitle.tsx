import type { HeadingProps as ReactAriaHeadingProps } from "react-aria-components";
import { Heading as ReactAriaHeading } from "react-aria-components";
import { alertDialogTitle } from "../AlertDialog/AlertDialogTitle.css";

export type AlertDialogTitleProps = Pick<ReactAriaHeadingProps, "children">;

export function AlertDialogTitle(props: AlertDialogTitleProps) {
  const { children } = props;

  return (
    <ReactAriaHeading className={alertDialogTitle.container}>
      {children}
    </ReactAriaHeading>
  );
}
