import type { Meta, StoryFn } from "@storybook/react";
import { Italic } from "./Italic";

export default {
  title: "Typography/Italic",
  component: Italic,
} as Meta<typeof Italic>;

export const Default: StoryFn<typeof Italic> = (props) => {
  return <Italic {...props}>Hello world</Italic>;
};
