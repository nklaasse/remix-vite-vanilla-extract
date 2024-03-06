import { PasswordField } from "~/components/PasswordField";
import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/PasswordField",
  component: PasswordField,
} as Meta<typeof PasswordField>;

export const Default: StoryFn<typeof PasswordField> = (props) => {
  const { ...inputProps } = props;

  return (
    <PasswordField {...inputProps}>
      <PasswordField.Label>Label</PasswordField.Label>
      <PasswordField.Input />
    </PasswordField>
  );
};

export const Placeholder: StoryFn<typeof PasswordField> = (props) => {
  const { ...inputProps } = props;

  return (
    <PasswordField {...inputProps}>
      <PasswordField.Label>Label</PasswordField.Label>
      <PasswordField.Input placeholder="Enter a password" />
    </PasswordField>
  );
};

export const Disabled: StoryFn<typeof PasswordField> = (props) => {
  const { ...inputProps } = props;

  return (
    <PasswordField {...inputProps}>
      <PasswordField.Label>Label</PasswordField.Label>
      <PasswordField.Input />
    </PasswordField>
  );
};

Disabled.args = {
  isDisabled: true,
};

export const Link: StoryFn<typeof PasswordField> = (props) => {
  const { ...inputProps } = props;

  return (
    <PasswordField {...inputProps}>
      <PasswordField.Label>Label</PasswordField.Label>
      <PasswordField.Input />
      <PasswordField.Link href="#">Forgot password?</PasswordField.Link>
    </PasswordField>
  );
};
