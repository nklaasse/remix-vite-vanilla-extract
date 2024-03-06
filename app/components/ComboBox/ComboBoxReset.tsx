import * as React from "react";
import { mergeProps } from "react-aria";
import type { FieldResetProps } from "../Field";
import { Field } from "../Field";
import { ComboBoxContext, useElementType } from "./ComboBox";

export type ComboBoxResetProps = FieldResetProps;

/**
 * Component that renders a reset button for the Picker.
 */
function RootComboBoxReset(props: ComboBoxResetProps) {
  const context = React.useContext(ComboBoxContext);

  const { buttonRef, inputRef } = context.refs;

  const onPressEnd = React.useCallback(() => {
    // In case we're rendering the combobox on mobile it will
    // be inside of a combobox, so the inputRef is not yet set
    // and the only other options is to focus the buttonRef instead.
    if (inputRef.current) {
      inputRef.current?.focus();
    } else if (buttonRef.current) {
      buttonRef.current?.focus();
    }
  }, [buttonRef, inputRef]);

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

export function ComboBoxReset(props: ComboBoxResetProps) {
  const type = useElementType();

  switch (type) {
    case "root":
      return <RootComboBoxReset {...props} />;
    default:
      return null;
  }
}
