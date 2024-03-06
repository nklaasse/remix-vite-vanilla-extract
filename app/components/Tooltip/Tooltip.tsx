import classnames from "classnames";
import * as React from "react";
import { mergeProps, Overlay, useId, useTooltip } from "react-aria";
import type { TooltipTriggerState } from "react-stately";
import { Layer, useLayerIndex } from "../Layer";
import { filter, tooltip } from "./Tooltip.css";
import { TooltipContext } from "./TooltipContext";
import { TooltipTrigger } from "./TooltipTrigger";

export type TooltipProps = {
  /**
   * A label which represents the value of the Tooltip
   */
  children: React.ReactNode;
  /**
   * Optional state property which can be used to control the open state of the tooltip
   * this is usefull when the component is used without a wrapping Tooltip.Trigger
   *
   * @default undefined
   */
  state?: TooltipTriggerState;
};

type FilterProps = {
  id: string;
};

/**
 * Creates a filter which can be used to create a outline around a element
 */
function Filter(props: FilterProps) {
  const { id } = props;

  return (
    <svg className={filter.container} aria-hidden>
      <filter id={id}>
        <feMorphology
          in="SourceAlpha"
          result="DILATED"
          operator="dilate"
          radius="1"
        ></feMorphology>

        <feFlood
          className={filter.flood}
          floodColor="white"
          floodOpacity="1"
          result="PINK"
        ></feFlood>
        <feComposite
          in="PINK"
          in2="DILATED"
          operator="in"
          result="OUTLINE"
        ></feComposite>

        <feMerge>
          <feMergeNode in="OUTLINE" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </svg>
  );
}

/**
 * The tooltip component can be used to clearify a interactive element
 */
export function Tooltip(props: TooltipProps) {
  const context = React.useContext(TooltipContext);

  const { tooltipTriggerState } = context.state;

  const { children } = props;
  const {
    tooltipProps: tooltipTriggerProps,
    overlayProps,
    arrowProps,
    placement,
  } = context.props;
  const { overlayRef } = context.refs;

  const { tooltipProps } = useTooltip(tooltipTriggerProps, tooltipTriggerState);

  const index = useLayerIndex("tooltip");

  const filterId = useId();

  return (
    <Overlay>
      {tooltipTriggerState.isOpen ? (
        <Layer index={index}>
          <Filter id={filterId} />
          <div
            {...mergeProps(overlayProps, tooltipProps)}
            className={classnames(
              tooltip.container,
              tooltip.variants.placement[placement]
            )}
            style={{
              ...overlayProps.style,
              zIndex: index,
              isolation: "isolate",
              filter: `url(#${filterId})`,
            }}
            ref={overlayRef}
          >
            <svg
              {...arrowProps}
              className={tooltip.arrow}
              viewBox="0 0 10 10"
              aria-hidden
            >
              <path d="M0 0L5 5L10 0" />
            </svg>
            <div className={tooltip.content}>{children}</div>
          </div>
        </Layer>
      ) : null}
    </Overlay>
  );
}

Tooltip.Trigger = TooltipTrigger;
