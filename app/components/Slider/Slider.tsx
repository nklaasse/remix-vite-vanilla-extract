import React from "react";
import type {
  SliderProps as ReactAriaSliderProps,
  SliderThumbProps,
} from "react-aria-components";
import {
  Slider as ReactAriaSlider,
  SliderOutput as ReactAriaSliderOutput,
} from "react-aria-components";
import { Field } from "../Field";
import { SliderContextualHelp } from "./SliderContextualHelp";
import { SliderInput } from "./SliderInput";
import { SliderLabel } from "./SliderLabel";
import { SliderReset } from "./SliderReset";

type SliderContextValue = {
  props: {
    trackProps: {
      fillOffset: number | null;
    };
    thumbProps?: Pick<SliderThumbProps, "name">;
  };
  refs: {
    thumbRef: React.RefObject<HTMLDivElement>;
  };
};

export const SliderContext = React.createContext<SliderContextValue>({
  props: {
    trackProps: {
      fillOffset: null,
    },
  },
  refs: {
    thumbRef: React.createRef<HTMLDivElement>(),
  },
});

export type SliderProps<T extends number> = Omit<
  ReactAriaSliderProps<T>,
  "children"
> & {
  children: React.ReactNode;
} & {
  /**
   * The offset from which to start the fill
   */
  fillOffset?: number;
} & Pick<SliderThumbProps, "name">;

/**
 * Slider component used for users to select specific value from range
 */
export const _Slider = React.forwardRef<HTMLDivElement, SliderProps<number>>(
  function Slider(props, ref) {
    const { fillOffset = null, children, name, ...otherProps } = props;

    const thumbRef = React.useRef<HTMLDivElement>(null);

    return (
      <SliderContext.Provider
        value={{
          props: {
            trackProps: { fillOffset },
            thumbProps: {
              name,
            },
          },
          refs: {
            thumbRef,
          },
        }}
      >
        <ReactAriaSlider
          ref={ref}
          defaultValue={otherProps.minValue}
          {...otherProps}
        >
          <Field>
            {children}
            <Field.ValueLabel>
              <ReactAriaSliderOutput />
            </Field.ValueLabel>
          </Field>
        </ReactAriaSlider>
      </SliderContext.Provider>
    );
  }
);

export const Slider = Object.assign(_Slider, {
  Label: SliderLabel,
  Input: SliderInput,
  Reset: SliderReset,
  ContextualHelp: SliderContextualHelp,
});
