import type { Meta, StoryFn } from "@storybook/react";
import { Image } from "./Image";

export default {
  title: "Typography/Image",
  component: Image,
} as Meta<typeof Image>;

export const Default: StoryFn<typeof Image> = () => {
  return <Image alt="" src="https://placehold.co/200x200" />;
};
