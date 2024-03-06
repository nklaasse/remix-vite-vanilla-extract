import { assignInlineVars } from "@vanilla-extract/dynamic";
import classNames from "classnames";
import React from "react";
import {
  SliderThumb as ReactAriaSliderThumb,
  SliderTrack as ReactAriaSliderTrack,
} from "react-aria-components";
import { Field } from "../Field";
import { SliderContext } from "./Slider";
import { sliderInput, thumb } from "./SliderInput.css";

function Thumb() {
  const context = React.useContext(SliderContext);

  const { thumbProps } = context.props;
  const { thumbRef } = context.refs;

  return (
    <ReactAriaSliderThumb
      {...thumbProps}
      ref={thumbRef}
      className={(props) =>
        classNames(thumb.container, {
          [thumb.states.isDragging]: props.isDragging,
          [thumb.states.isFocused]: props.isFocused,
          [thumb.states.isFocusVisible]: props.isFocusVisible,
          [thumb.states.isHovered]: props.isHovered,
        })
      }
    />
  );
}

/**
 * Slider component used for users to select specific value from range
 */
export function SliderInput() {
  const context = React.useContext(SliderContext);

  const { trackProps } = context.props;

  const { fillOffset } = trackProps;

  return (
    <Field.Input>
      <ReactAriaSliderTrack
        className={(props) =>
          classNames(sliderInput.container, {
            [sliderInput.states.isHovered]: props.isHovered,
          })
        }
        style={({ state }) => {
          const thumbOffset = state.getThumbPercent(0) * 100;

          const minValue = state.getThumbMinValue(0);
          const maxValue = state.getThumbMaxValue(0);

          // Get the range of the slider
          const range = maxValue - minValue;

          // Get the percentage at which the fill should start
          const percentage =
            fillOffset != null ? ((fillOffset - minValue) * 100) / range : 0;

          return assignInlineVars({
            [sliderInput.vars.thumbPosition]: String(thumbOffset),
            [sliderInput.vars.startPosition]: String(percentage),
          });
        }}
      >
        <div className={sliderInput.track} />
        <div className={sliderInput.fill} />

        <Thumb />

        <ReactAriaSliderThumb />
      </ReactAriaSliderTrack>
    </Field.Input>
  );
}
