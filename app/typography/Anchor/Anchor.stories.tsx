import type { Meta, StoryFn } from "@storybook/react";
import { Anchor } from "./Anchor";

export default {
  title: "Typography/Anchor",
  component: Anchor,
} as Meta<typeof Anchor>;

export const Default: StoryFn<typeof Anchor> = (props) => {
  return (
    <Anchor {...props} to="#">
      Hello world
    </Anchor>
  );
};
