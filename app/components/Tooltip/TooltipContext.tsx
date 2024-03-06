import * as React from "react";
import type { PositionAria, TooltipTriggerAria } from "react-aria";
import type { TooltipTriggerState } from "react-stately";

export type TooltipContextValue = {
  props: {
    tooltipProps: TooltipTriggerAria["tooltipProps"];
    overlayProps: PositionAria["overlayProps"];
    arrowProps: PositionAria["arrowProps"];
    placement: PositionAria["placement"];
  };
  state: {
    tooltipTriggerState: TooltipTriggerState;
  };
  refs: {
    overlayRef: React.MutableRefObject<HTMLDivElement>;
  };
};

export const TooltipContext = React.createContext<TooltipContextValue>(null!);
