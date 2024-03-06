import { useIntl } from "react-intl";
import { useToastRegion } from "@react-aria/toast";
import * as React from "react";
import { type ToastContentType, ToastContext } from "./Toast";
import { toastRegion } from "./ToastRegion.css";
import { useToastState } from "./useToastState";

/**
 * Component that will be rendered when there are toasts to display
 */
export function ToastRegion() {
  const intl = useIntl();

  const ref = React.useRef<HTMLDivElement>(null);

  const state = useToastState();

  const { regionProps } = useToastRegion<ToastContentType>({}, state, ref);

  if (state.visibleToasts.length > 0) {
    return (
      <div
        {...regionProps}
        ref={ref}
        className={toastRegion.container}
        aria-label={intl.formatMessage({
          id: "components.toast.toastRegionLabel",
          description:
            "Accessible label for the region which displays the toasts",
          defaultMessage: "Notifications",
        })}
      >
        {state.visibleToasts.map((props) => (
          <ToastContext.Provider value={{ props, state }} key={props.key}>
            {props.content}
          </ToastContext.Provider>
        ))}
      </div>
    );
  }

  return null;
}
