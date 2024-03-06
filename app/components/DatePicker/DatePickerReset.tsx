import * as React from "react";
import { mergeProps } from "react-aria";
import type { FieldResetProps } from "../Field";
import { Field } from "../Field";
import { DatePickerContext } from "./DatePicker";
import { editableSegment } from "./DatePickerInput.css";

export type DatePickerResetProps = FieldResetProps;

/**
 * Component that renders a reset button for the DatePicker.
 */
export function DatePickerReset(props: DatePickerResetProps) {
  const context = React.useContext(DatePickerContext);

  const { fieldRef } = context.refs;

  const onPressEnd = React.useCallback(() => {
    const firstFocusableChild = fieldRef.current?.querySelector(
      `.${editableSegment.container}[tabindex]:not([tabindex="-1"])`
    );

    if (firstFocusableChild instanceof HTMLElement) {
      firstFocusableChild.focus();
    }
  }, [fieldRef]);

  return (
    <Field.Reset
      {...mergeProps(props, {
        onPressEnd,
      })}
    />
  );
}
