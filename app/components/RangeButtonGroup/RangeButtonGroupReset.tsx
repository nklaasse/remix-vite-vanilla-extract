import * as React from "react";
import { mergeProps } from "react-aria";
import type { FieldResetProps } from "../Field";
import { Field } from "../Field";
import { RangeButtonGroupContext } from "./RangeButtonGroup";
import { rangeButtonGroupRadio } from "./RangeButtonGroupInput.css";

export type RangeButtonGroupResetProps = FieldResetProps;

/**
 * Component that renders a reset button for the RangeButtonGroup.
 */
export function RangeButtonGroupReset(props: RangeButtonGroupResetProps) {
  const context = React.useContext(RangeButtonGroupContext);

  const { rangeButtonGroupRef } = context.refs;
  const { radioGroupState, listState } = context.state;

  const onPressEnd = React.useCallback(() => {
    // If there has not been any focused value
    if (radioGroupState.lastFocusedValue == null) {
      // Get first key in collection
      const firstKey =
        radioGroupState.selectedValue || listState.collection.getFirstKey();

      // Set the last focused value to the first key
      if (firstKey) {
        radioGroupState.setLastFocusedValue(String(firstKey));
      }
    }

    if (rangeButtonGroupRef.current) {
      const firstFocusableElement = rangeButtonGroupRef.current.querySelector(
        `.${rangeButtonGroupRadio.input}[tabIndex="0"]`
      );

      if (firstFocusableElement instanceof HTMLElement) {
        firstFocusableElement.focus();
      }
    }
  }, [listState.collection, radioGroupState, rangeButtonGroupRef]);

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
