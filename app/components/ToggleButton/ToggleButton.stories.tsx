import { IconCross } from "~/icons/IconCross";
import type { Meta, StoryFn } from "@storybook/react";
import { ToggleButton } from "./ToggleButton";

export default {
  title: "Components/ToggleButton",
  component: ToggleButton,
  args: {
    children: "Toggle",
  },
  argTypes: {
    children: {
      control: "text",
    },
  },
} as Meta<typeof ToggleButton>;

export const Default: StoryFn<typeof ToggleButton> = (props) => {
  const { children, ...buttonProps } = props;

  return (
    <ToggleButton {...buttonProps}>
      <ToggleButton.Label>{children}</ToggleButton.Label>
    </ToggleButton>
  );
};

export const Icon: StoryFn<typeof ToggleButton> = (props) => {
  const { children, ...buttonProps } = props;

  return (
    <ToggleButton {...buttonProps}>
      <ToggleButton.Icon>
        <IconCross />
      </ToggleButton.Icon>
      <ToggleButton.Label>{children}</ToggleButton.Label>
    </ToggleButton>
  );
};

export const Reverse: StoryFn<typeof ToggleButton> = (props) => {
  const { children, ...buttonProps } = props;

  return (
    <ToggleButton {...buttonProps}>
      <ToggleButton.Label>{children}</ToggleButton.Label>
      <ToggleButton.Icon>
        <IconCross />
      </ToggleButton.Icon>
    </ToggleButton>
  );
};

export const IconOnly: StoryFn<typeof ToggleButton> = (props) => {
  const { children, ...buttonProps } = props;

  return (
    <ToggleButton aria-label={children as string} {...buttonProps}>
      <ToggleButton.Icon>
        <IconCross />
      </ToggleButton.Icon>
    </ToggleButton>
  );
};

export const MultipleIcons: StoryFn<typeof ToggleButton> = (props) => {
  const { children, ...buttonProps } = props;

  return (
    <ToggleButton {...buttonProps}>
      <ToggleButton.Icon>
        <IconCross />
      </ToggleButton.Icon>
      <ToggleButton.Label>{children}</ToggleButton.Label>
      <ToggleButton.Icon>
        <IconCross />
      </ToggleButton.Icon>
    </ToggleButton>
  );
};
