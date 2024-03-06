import * as React from "react";
import { mergeProps } from "react-aria";
import type { FieldResetProps } from "../Field";
import { Field } from "../Field";
import { PickerContext } from "./Picker";

export type PickerResetProps = FieldResetProps;

/**
 * Component that renders a reset button for the Picker.
 */
function PickerReset(props: PickerResetProps) {
  const context = React.useContext(PickerContext);

  const { triggerRef } = context.refs;

  const onPressEnd = React.useCallback(() => {
    triggerRef.current?.focus();
  }, [triggerRef]);

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

export { PickerReset };
