import type { Meta, StoryFn } from "@storybook/react";
import { Badge } from "./Badge";

export default {
  title: "Components/Badge",
  component: Badge,
} as Meta<typeof Badge>;

export const Default: StoryFn<typeof Badge> = () => {
  return <Badge>New</Badge>;
};
