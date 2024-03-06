import * as React from "react";
import { mergeProps } from "react-aria";
import type { FieldResetProps } from "../Field";
import { Field } from "../Field";
import { SliderContext } from "./Slider";

export type SliderResetProps = FieldResetProps;

/**
 * Component that renders a reset button for the Slider.
 */
export function SliderReset(props: SliderResetProps) {
  const context = React.useContext(SliderContext);

  const { thumbRef } = context.refs;

  const onPressEnd = React.useCallback(() => {
    thumbRef.current?.querySelector("input")?.focus();
  }, [thumbRef]);

  return (
    <Field.Reset
      {...mergeProps(
        {
          onPressEnd,
        },
        props
      )}
    />
  );
}
