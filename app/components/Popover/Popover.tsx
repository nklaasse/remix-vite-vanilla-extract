import classNames from "classnames";
import * as React from "react";
import { useId } from "react-aria";
import type { PopoverProps as ReactAriaPopoverProps } from "react-aria-components";
import {
  OverlayArrow as ReactAriaOverlayArrow,
  Popover as ReactAriaPopover,
  PopoverContext as ReactAriaPopoverContext,
} from "react-aria-components";
import { Layer, useLayerIndex } from "../Layer";
import { filter, popover } from "./Popover.css";

type FilterProps = {
  id: string;
};

/**
 * Creates a filter which can be used to create a outline around a element
 */
function Filter(props: FilterProps) {
  const { id } = props;

  return (
    <svg className={filter.container}>
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

export type PopoverProps = Omit<
  ReactAriaPopoverProps,
  | "isOpen"
  | "defaultOpen"
  | "onOpenChange"
  | "boundaryElement"
  | "arrowSize"
  | "maxHeight"
  | "slot"
  | "className"
  | "style"
> & {
  children: React.ReactNode;
};

/**
 * Popover elements renders a container positioned based on a target element
 */
const _Popover = React.forwardRef(function Popover(
  props: PopoverProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  const { children, ...otherProps } = props;

  const index = useLayerIndex("popover");

  const filterId = useId();

  return (
    <Layer index={index}>
      <Filter id={filterId} />
      <ReactAriaPopover
        {...otherProps}
        ref={ref}
        className={(props) =>
          classNames(
            popover.container,
            popover.variants.placement[props.placement]
          )
        }
        style={{ zIndex: index, filter: `url(#${filterId})` }}
      >
        <div className={popover.overlay}>
          <ReactAriaOverlayArrow>
            <svg
              className={popover.arrow}
              strokeLinejoin="round"
              viewBox="0 0 8 8"
              aria-hidden
            >
              <path d="M1 0L4 3L7 0" />
            </svg>
          </ReactAriaOverlayArrow>

          <div className={popover.position}>
            <div className={popover.content}>{children}</div>
          </div>
        </div>
      </ReactAriaPopover>
    </Layer>
  );
});

type ProviderProps = {
  value: Pick<ReactAriaPopoverProps, "isOpen" | "onOpenChange">;
} & {
  children: React.ReactNode;
};

/**
 * We introduced the Provider component to make it easy to intergrate the Popover component with components
 * which are not yet build using the React Aria components.
 */
function Provider(props: ProviderProps) {
  const { children, value } = props;

  return (
    <ReactAriaPopoverContext.Provider value={value}>
      {children}
    </ReactAriaPopoverContext.Provider>
  );
}

export const Popover = Object.assign(_Popover, {
  Provider,
});
