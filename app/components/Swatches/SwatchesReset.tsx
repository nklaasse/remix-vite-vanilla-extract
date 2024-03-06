import * as React from "react";
import { mergeProps } from "react-aria";
import type { FieldResetProps } from "../Field";
import { Field } from "../Field";
import { SwatchesContext } from "./Swatches";
import { swatchesInputSwatch } from "./SwatchesInput.css";

export type SwatchesResetProps = FieldResetProps;

/**
 * Component that renders a reset button for the Swatches.
 */
export function SwatchesReset(props: SwatchesResetProps) {
  const context = React.useContext(SwatchesContext);

  const { radioGroupState, collection } = context.state;
  const { groupRef } = context.refs;

  const onPressEnd = React.useCallback(() => {
    // If there has not been any focused value
    if (radioGroupState.lastFocusedValue == null) {
      // Get first key in collection
      const firstKey =
        radioGroupState.selectedValue || collection.getFirstKey();

      // Set the last focused value to the first key
      if (firstKey) {
        radioGroupState.setLastFocusedValue(String(firstKey));
      }
    }

    if (groupRef.current) {
      const firstFocusableElement = groupRef.current.querySelector(
        `.${swatchesInputSwatch.input}[tabIndex="0"]`
      );

      if (firstFocusableElement instanceof HTMLElement) {
        firstFocusableElement.focus();
      }
    }
  }, [groupRef, radioGroupState, collection]);

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
