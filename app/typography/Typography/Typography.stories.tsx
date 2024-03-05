import type { Meta, StoryFn } from "@storybook/react";
import { Heading } from "../Heading";
import { Paragraph } from "../Paragraph";
import { Typography } from "./Typography";

export default {
  title: "Typography/Typography",
  component: Paragraph,
} as Meta<typeof Paragraph>;

export const Default: StoryFn<typeof Paragraph> = (props) => {
  return (
    <Typography {...props}>
      <Heading>Heading</Heading>
      <Paragraph>Paragraph</Paragraph>

      <Heading>Heading</Heading>
      <Paragraph>Paragraph</Paragraph>
    </Typography>
  );
};
