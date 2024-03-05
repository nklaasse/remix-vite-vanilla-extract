import type { Meta, StoryFn } from "@storybook/react";
import { Bold } from "./Bold";

export default {
  title: "Typography/Bold",
  component: Bold,
} as Meta<typeof Bold>;

export const Default: StoryFn<typeof Bold> = (props) => {
  return <Bold {...props}>Hello world</Bold>;
};
