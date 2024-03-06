import { NumberField } from "~/components/NumberField";
import type { Meta, StoryFn } from "@storybook/react";

const meta: Meta<typeof NumberField> = {
  title: "Components/NumberField",
  component: NumberField,
};

export default meta;

export const Default: StoryFn<typeof NumberField> = (props) => {
  const { ...inputProps } = props;

  return (
    <NumberField {...inputProps}>
      <NumberField.Label>Age</NumberField.Label>
      <NumberField.Input />
    </NumberField>
  );
};

export const WithoutLabel: StoryFn<typeof NumberField> = (props) => {
  const { ...inputProps } = props;

  return (
    <NumberField {...inputProps} aria-label="Age">
      <NumberField.Input />
    </NumberField>
  );
};

export const FormatOptions: StoryFn<typeof NumberField> = (props) => {
  const { ...inputProps } = props;

  return (
    <NumberField {...inputProps}>
      <NumberField.Label>Age</NumberField.Label>
      <NumberField.Input />
    </NumberField>
  );
};

FormatOptions.args = {
  formatOptions: {
    style: "unit",
    unit: "year",
    unitDisplay: "long",
  },
};
