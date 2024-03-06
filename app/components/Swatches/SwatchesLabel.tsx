import React from "react";
import { mergeProps, usePress } from "react-aria";
import type { FieldLabelProps } from "../Field";
import { Field } from "../Field";
import { SwatchesContext } from "./Swatches";
import { swatchesInputSwatch } from "./SwatchesInput.css";

export type SwatchesLabelProps = FieldLabelProps;

/**
 * Component that renders the Label for the Swatches, in case you don't want to
 * use a label, supply the Input element with an aria-label attribute.
 */
export function SwatchesLabel(props: SwatchesLabelProps) {
  const { children } = props;

  const context = React.useContext(SwatchesContext);

  const { labelRef, groupRef } = context.refs;
  const { labelProps } = context.props;
  const { radioGroupState, collection } = context.state;

  const { pressProps } = usePress({
    onPress: () => {
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
    },
  });

  return (
    <Field.Label ref={labelRef} {...mergeProps(labelProps, pressProps)}>
      {children}
    </Field.Label>
  );
}
