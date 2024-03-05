import type { Meta, StoryFn } from "@storybook/react";
import { Paragraph } from "./Paragraph";

export default {
  title: "Typography/Paragraph",
  component: Paragraph,
} as Meta<typeof Paragraph>;

export const Default: StoryFn<typeof Paragraph> = (props) => {
  return <Paragraph {...props}>Hello world</Paragraph>;
};
