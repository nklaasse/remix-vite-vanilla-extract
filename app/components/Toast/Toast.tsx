import { IconCheck } from "~/icons/IconCheck";
import { IconCross } from "~/icons/IconCross";
import { IconInfo } from "~/icons/IconInfo";
import { useIntl } from "react-intl";
import { useToast } from "@react-aria/toast";
import type { QueuedToast, ToastState } from "@react-stately/toast";
import classnames from "classnames";
import React from "react";
import { Button } from "../Button";
import { toast } from "./Toast.css";
import { ToastDescription } from "./ToastDescription";
import { ToastProvider } from "./ToastProvider";
import { ToastRegion } from "./ToastRegion";
import { ToastTitle } from "./ToastTitle";

export type ToastContentType = React.ReactNode;

export type ToastType = "info" | "success" | "error";

type ToastProps = {
  /**
   * A Toast.Title and optional Toast.Description
   */
  children: React.ReactNode;
  /**
   * The type of toast
   *
   * @default info
   */
  type?: ToastType;
};

type ToastContextValue = {
  props: QueuedToast<ToastContentType>;
  state: ToastState<ToastContentType>;
};

export const ToastContext = React.createContext<ToastContextValue>(null!);

export type ToastContentContextValue = {
  props: {
    titleProps: React.DOMAttributes<HTMLElement>;
    descriptionProps: React.DOMAttributes<HTMLParagraphElement>;
  };
};

export const ToastContentContext =
  React.createContext<ToastContentContextValue>(null!);

/**
 * Component to render an individual toast within a <ToastRegion/>
 */
export function Toast(props: ToastProps) {
  const { children, type = "info" } = props;

  const intl = useIntl();

  const toastContext = React.useContext(ToastContext);

  const { state: contextState, props: contextProps } = toastContext;

  const ref = React.useRef<HTMLDivElement>(null);

  const { toastProps, titleProps, descriptionProps, closeButtonProps } =
    useToast<ToastContentType>(
      {
        toast: contextProps,
      },
      contextState,
      ref
    );

  const ICONS = {
    info: <IconInfo aria-hidden />,
    success: <IconCheck aria-hidden />,
    error: <IconCross aria-hidden />,
  };

  return (
    <div
      {...toastProps}
      ref={ref}
      className={classnames(toast.container, {
        [toast.variants.type[type]]: type,
      })}
    >
      <div className={toast.header}>
        <div className={toast.icon}>{ICONS[type]}</div>
        <ToastContentContext.Provider
          value={{
            props: {
              titleProps,
              descriptionProps,
            },
          }}
        >
          <div className={toast.content}>{children}</div>
        </ToastContentContext.Provider>
      </div>

      <div className={toast.button}>
        <Button
          {...closeButtonProps}
          aria-label={intl.formatMessage({
            id: "components.toast.toastCloseButtonLabel",
            description: "Accessible label for the toast close button",
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
    </div>
  );
}

Toast.Provider = ToastProvider;
Toast.Region = ToastRegion;
Toast.Title = ToastTitle;
Toast.Description = ToastDescription;
