import { Field } from "~/components/Field";
import { IconCheck } from "~/icons/IconCheck";
import classNames from "classnames";
import * as React from "react";
import type { AriaRadioProps } from "react-aria";
import { useFocusRing, useRadio } from "react-aria";
import type { ListProps, RadioGroupState } from "react-stately";
import type { SwatchesContextValue } from "./Swatches";
import { SwatchesContext } from "./Swatches";
import { swatchesInput, swatchesInputSwatch } from "./SwatchesInput.css";

export type SwatchProps = Omit<AriaRadioProps, "isDisabled"> & {
  /**
   * The value of the radio button, used when submitting an HTML form.
   */
  value: AriaRadioProps["value"];
  /**
   * Textual representation of the value
   *
   * @default value
   */
  label?: string;
  /**
   * State of the containing radio group
   */
  state: RadioGroupState;
};

export function SwatchesSwatch(props: SwatchProps) {
  const { value, label = value, state } = props;

  const ref = React.useRef<HTMLInputElement>(null);
  const { inputProps } = useRadio(
    {
      ...props,
      children: label,
    },
    state,
    ref
  );

  const { focusProps, isFocusVisible } = useFocusRing({
    within: true,
    isTextInput: true,
  });

  return (
    <label
      {...focusProps}
      className={classNames(swatchesInputSwatch.container, {
        [swatchesInputSwatch.states.isSelected]: value === state.selectedValue,
        [swatchesInputSwatch.states.isFocusVisible]: isFocusVisible,
      })}
      style={{
        backgroundColor: value,
      }}
    >
      <span className={swatchesInputSwatch.label}>{label}</span>

      <input className={swatchesInputSwatch.input} {...inputProps} ref={ref} />

      <div className={swatchesInputSwatch.indicator}>
        <IconCheck />
      </div>
    </label>
  );
}

export type SwatchesInputProps<T extends Record<string, unknown>> = Pick<
  ListProps<T>,
  "children" | "items"
>;

export function SwatchesInput<T extends Record<string, unknown>>(
  props: SwatchesInputProps<T>
) {
  const { items, children } = props;

  const context = React.useContext(SwatchesContext) as SwatchesContextValue<T>;

  const { setInputProps, collection, radioGroupState } = context.state;
  const { groupRef } = context.refs;
  const { radioGroupProps } = context.props;

  React.useLayoutEffect(() => {
    setInputProps({
      items,
      children,
    });
  }, [items, children, setInputProps]);

  return (
    <Field.Input>
      <div
        className={swatchesInput.container}
        ref={groupRef}
        {...radioGroupProps}
      >
        {Array.from(collection).map((item) => (
          <SwatchesSwatch
            value={String(item.key)}
            key={item.key}
            label={item.textValue}
            state={radioGroupState}
          />
        ))}
      </div>
    </Field.Input>
  );
}
