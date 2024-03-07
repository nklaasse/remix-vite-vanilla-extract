import { Disclosure } from "~/components/Disclosure";
import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/Disclosure",
  component: Disclosure,
} as Meta<typeof Disclosure>;

export const Default: StoryFn<typeof Disclosure> = () => {
  return (
    <Disclosure>
      <Disclosure.Summary label="Click to show more" />

      <Disclosure.Content>You get what you asked for</Disclosure.Content>
    </Disclosure>
  );
};
