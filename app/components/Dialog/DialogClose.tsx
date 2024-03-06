import { IconCross } from "~/icons/IconCross";
import { useIntl } from "react-intl";
import * as React from "react";
import { mergeProps } from "react-aria";
import type { ButtonProps, LinkButtonProps } from "../Button";
import { Button } from "../Button";
import { Layer, useLayerIndex } from "../Layer";
import { dialogClose } from "./DialogClose.css";
import { DialogContext } from "./DialogContext";

type DialogCloseProps =
  | Omit<ButtonProps, "aria-label" | "variant" | "size" | "children">
  | Omit<LinkButtonProps, "aria-label" | "variant" | "size" | "children">;

/**
 * DialogClose is used as a call to action to open / close the dialog
 */
export function DialogClose(props: DialogCloseProps) {
  const context = React.useContext(DialogContext);

  const intl = useIntl();
  const index = useLayerIndex("sticky");

  const { closeProps } = context.props;

  return (
    <Layer index={index}>
      <div className={dialogClose.container} style={{ zIndex: index }}>
        <Button
          {...mergeProps(closeProps, props)}
          aria-label={intl.formatMessage({
            id: "components.dialog.dialogCloseButtonLabel",
            description: "Accessible label for the dialog close button",
            defaultMessage: "Close",
          })}
          variant="tertiary"
          size="compact"
        >
          <Button.Icon>
            <IconCross />
          </Button.Icon>
        </Button>
      </div>
    </Layer>
  );
}
