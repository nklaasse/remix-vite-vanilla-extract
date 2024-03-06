import { Heading } from "~/typography/Heading";
import * as React from "react";
import { DialogContext } from "./DialogContext";
import { dialogTitle } from "./DialogTitle.css";

export type DialogTitleProps = {
  /**
   * Description of the dialog
   */
  children: string;
};

/**
 * DialogTitle is used to summarize the content of the dialog
 */
export function DialogTitle(props: DialogTitleProps) {
  const { children } = props;

  const context = React.useContext(DialogContext);

  const { titleProps } = context.props;

  return (
    <div className={dialogTitle.container}>
      <Heading {...titleProps} level={1} scale={5}>
        {children}
      </Heading>
    </div>
  );
}
