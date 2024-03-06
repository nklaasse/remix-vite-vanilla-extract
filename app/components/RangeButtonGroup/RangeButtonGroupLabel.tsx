import React from "react";
import { mergeProps, usePress } from "react-aria";
import type { FieldLabelProps } from "../Field";
import { Field } from "../Field";
import type { FieldValueLabelProps } from "../Field/FieldValueLabel";
import { RangeButtonGroupContext, useElementType } from "./RangeButtonGroup";
import { rangeButtonGroupRadio } from "./RangeButtonGroupInput.css";
import { inputLabel } from "./RangeButtonGroupLabel.css";

export type RootLabelProps = FieldLabelProps;

/**
 * Component that renders the Label for the RangeButtonGroup, in case you don't want to
 * use a label, supply the Input element with an aria-label attribute.
 */
export function RootLabel(props: RootLabelProps) {
  const { children } = props;

  const context = React.useContext(RangeButtonGroupContext);

  const { labelRef, rangeButtonGroupRef } = context.refs;
  const { labelProps } = context.props;
  const { radioGroupState, listState } = context.state;

  // Handle clicks on the input label, which by default is not triggering a browser focus
  // due to it being a radio input. Out of consistency with other components, we want to
  // trigger a focus on the input when the label is clicked.
  const { pressProps } = usePress({
    onPress() {
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
    },
  });

  return (
    <Field.Label ref={labelRef} {...mergeProps(labelProps, pressProps)}>
      {children}
    </Field.Label>
  );
}

type ValueLabelProps = FieldValueLabelProps;

function ValueLabel(props: ValueLabelProps) {
  return <Field.ValueLabel {...props}>{props.children}</Field.ValueLabel>;
}

type InputLabelProps = { children: string };

function InputLabel(props: InputLabelProps) {
  return <span className={inputLabel.container}>{props.children}</span>;
}

type RangeButtonGroupLabelProps =
  | ValueLabelProps
  | InputLabelProps
  | RootLabelProps;

export function RangeButtonGroupLabel(props: RangeButtonGroupLabelProps) {
  const type = useElementType();

  switch (type) {
    case "root":
      return <RootLabel {...(props as RootLabelProps)} />;
    case "value":
      return <ValueLabel {...(props as ValueLabelProps)} />;
    case "input":
      return <InputLabel {...(props as InputLabelProps)} />;
    default:
      return null;
  }
}
