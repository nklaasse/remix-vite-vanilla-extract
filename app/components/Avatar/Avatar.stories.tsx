import type { Meta, StoryFn } from "@storybook/react";
import { Avatar } from "./Avatar";

export default {
  title: "Components/Avatar",
  component: Avatar,
} as Meta<typeof Avatar>;

export const Default: StoryFn<typeof Avatar> = () => {
  return (
    <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1" />
  );
};
