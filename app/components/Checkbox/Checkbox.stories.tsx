import { Checkbox } from "~/components/Checkbox";
import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  args: {
    label: "Click me",
  },
  argTypes: {
    label: {
      control: "text",
    },
  },
} as Meta<typeof Checkbox>;

export const Default: StoryFn<typeof Checkbox> = (props) => {
  return <Checkbox {...props} />;
};
