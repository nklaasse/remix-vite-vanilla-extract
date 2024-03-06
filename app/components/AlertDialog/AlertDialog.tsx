import type { ButtonProps } from "~/components/Button";
import * as React from "react";
import { chain } from "react-aria";
import type { ModalOverlayProps as ReactAriaModalOverlayProps } from "react-aria-components";
import {
  Dialog as ReactAriaDialog,
  Modal as ReactAriaModal,
  ModalOverlay as ReactAriaModalOverlay,
} from "react-aria-components";
import { Layer, useLayerIndex } from "../Layer";
import { alertDialog } from "./AlertDialog.css";
import { AlertDialogCancel } from "./AlertDialogCancel";
import { AlertDialogConfirm } from "./AlertDialogConfirm";
import { AlertDialogContent } from "./AlertDialogContent";
import { AlertDialogTitle } from "./AlertDialogTitle";
import { AlertDialogTrigger } from "./AlertDialogTrigger";

type AlertDialogContextValue = {
  props: {
    cancelProps: ButtonProps;
    confirmProps: ButtonProps;
  };
};

export const AlertDialogContext = React.createContext<AlertDialogContextValue>(
  null!
);

export type AlertDialogProps = {
  children: React.ReactNode;
} & Pick<ReactAriaModalOverlayProps, "isOpen" | "onOpenChange"> & {
    onConfirm?: () => void;
    onCancel?: () => void;
  };

export function AlertDialog(props: AlertDialogProps) {
  const { children, onConfirm, onCancel, ...otherProps } = props;

  const index = useLayerIndex("modal");

  return (
    <ReactAriaModalOverlay
      className={alertDialog.container}
      {...otherProps}
      style={{
        zIndex: index,
      }}
    >
      {({ state }) => (
        <AlertDialogContext.Provider
          value={{
            props: {
              cancelProps: {
                onPress: chain(onCancel, state.close),
              },
              confirmProps: {
                onPress: chain(onConfirm, state.close),
              },
            },
          }}
        >
          <Layer index={index}>
            <ReactAriaModal className={alertDialog.underlay}>
              <ReactAriaDialog
                role="alertdialog"
                className={alertDialog.overlay}
              >
                {children}
              </ReactAriaDialog>
            </ReactAriaModal>
          </Layer>
        </AlertDialogContext.Provider>
      )}
    </ReactAriaModalOverlay>
  );
}

AlertDialog.Cancel = AlertDialogCancel;
AlertDialog.Confirm = AlertDialogConfirm;
AlertDialog.Content = AlertDialogContent;
AlertDialog.Title = AlertDialogTitle;
AlertDialog.Trigger = AlertDialogTrigger;
