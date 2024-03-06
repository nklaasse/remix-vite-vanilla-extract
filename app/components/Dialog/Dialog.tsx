import type { StackModalProps } from "~/components/Stack";
import { Stack } from "~/components/Stack";
import * as React from "react";
import { useDialog } from "react-aria";
import type { OverlayTriggerState } from "react-stately";
import { ScrollView } from "../ScrollView";
import { dialog } from "./Dialog.css";
import { DialogActions } from "./DialogActions";
import { DialogClose } from "./DialogClose";
import { DialogContent } from "./DialogContent";
import { DialogContext } from "./DialogContext";
import { DialogDescription } from "./DialogDescription";
import { DialogTitle } from "./DialogTitle";

export type DialogProps = StackModalProps & {
  /**
   * A DialogClose, DialogContent and DialogTitle element
   */
  children: React.ReactNode;
  /**
   * Instance returned by the useOverlayTriggerState hook
   */
  state: OverlayTriggerState;
};

/**
 * Dialog renders a dialog and disables all interactions with content outside of the dialog
 */
export function Dialog(props: DialogProps) {
  const { children, state, backdrop, ...otherProps } = props;

  const ref = React.useRef<HTMLDivElement>(null!);

  const { dialogProps, titleProps } = useDialog({ role: "dialog" }, ref);

  const handleClose = React.useCallback(() => {
    state.close();
  }, [state]);

  if (state.isOpen) {
    return (
      <DialogContext.Provider
        value={{
          props: {
            titleProps,
            closeProps: {
              onPress: handleClose,
            },
          },
        }}
      >
        <Stack.Modal {...otherProps} state={state} backdrop={backdrop}>
          <ScrollView>
            <div className={dialog.container} {...dialogProps} ref={ref}>
              {children}
            </div>
          </ScrollView>
        </Stack.Modal>
      </DialogContext.Provider>
    );
  }

  return null;
}

Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
Dialog.Content = DialogContent;
Dialog.Close = DialogClose;
Dialog.Actions = DialogActions;
