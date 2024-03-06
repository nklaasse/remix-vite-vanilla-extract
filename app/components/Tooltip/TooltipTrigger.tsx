import { FocusableProvider } from "@react-aria/focus";
import * as React from "react";
import { useOverlayPosition, useTooltipTrigger } from "react-aria";
import { useTooltipTriggerState } from "react-stately";
import { TooltipContext } from "./TooltipContext";

export type TooltipTriggerProps = {
  /**
   * Any valid react children
   */
  children: React.ReactNode;
  /**
   * The placement of the tooltip relative to the trigger element
   *
   * @default 'top'
   */
  placement?: "top" | "bottom" | "start" | "end";
};

/**
 * The TooltipTrigger component should be wrapped around the element which sets the event handlers
 * for example a Button
 */
export function TooltipTrigger(props: TooltipTriggerProps) {
  const { children } = props;

  const tooltipTriggerRef = React.useRef<HTMLElement>(null!);
  const overlayRef = React.useRef<HTMLDivElement>(null!);

  const state = useTooltipTriggerState({});

  const { triggerProps, tooltipProps } = useTooltipTrigger(
    {},
    state,
    tooltipTriggerRef
  );

  const interactions = {
    ...triggerProps,
    // We need the if else based on the target because we wan't to be able to nest Tooltip.Triggers
    // for example for usage in combination with the ActionGroup component
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      if (e.target === tooltipTriggerRef.current && triggerProps.onFocus) {
        triggerProps.onFocus(e);
      }
    },
  };

  const { overlayProps, arrowProps, placement } = useOverlayPosition({
    targetRef: tooltipTriggerRef,
    overlayRef,
    containerPadding: 10,
    offset: 10,
    isOpen: state.isOpen,
    placement: props?.placement ?? "top",
  });

  return (
    <FocusableProvider {...interactions} ref={tooltipTriggerRef}>
      <TooltipContext.Provider
        value={{
          props: {
            tooltipProps,
            overlayProps,
            arrowProps,
            placement,
          },
          state: {
            tooltipTriggerState: state,
          },
          refs: {
            overlayRef,
          },
        }}
      >
        {children}
      </TooltipContext.Provider>
    </FocusableProvider>
  );
}
