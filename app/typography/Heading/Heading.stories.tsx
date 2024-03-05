import type { Meta, StoryFn } from "@storybook/react";
import { Heading } from "./Heading";

export default {
  title: "Typography/Heading",
  component: Heading,
} as Meta<typeof Heading>;

export const Default: StoryFn<typeof Heading> = (props) => {
  return <Heading {...props}>Hello world</Heading>;
};
