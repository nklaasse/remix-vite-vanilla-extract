import * as React from "react";
import { mergeProps } from "react-aria";
import type { FieldResetProps } from "../Field";
import { Field } from "../Field";
import { TemplateSelectContext } from "./TemplateSelect";
import { templateSelectInputItem } from "./TemplateSelectInput.css";

export type TemplateSelectResetProps = FieldResetProps;

/**
 * Component that renders a reset button for the TemplateSelect.
 */
export function TemplateSelectReset(props: TemplateSelectResetProps) {
  const context = React.useContext(TemplateSelectContext);

  const { radioGroupState, collection } = context.state;
  const { sliderRef } = context.refs;

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

    if (sliderRef.current) {
      const firstFocusableElement = sliderRef.current.querySelector(
        `.${templateSelectInputItem.input}[tabIndex="0"]`
      );

      if (firstFocusableElement instanceof HTMLElement) {
        firstFocusableElement.focus();
      }
    }
  }, [sliderRef, radioGroupState, collection]);

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
