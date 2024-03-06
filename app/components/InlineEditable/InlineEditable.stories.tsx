import { InlineEditable } from "~/components/InlineEditable";
import { Heading } from "~/typography/Heading";
import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/InlineEditable",
  component: InlineEditable,
} as Meta<typeof InlineEditable>;

export const Default: StoryFn<typeof InlineEditable> = (props) => {
  return (
    <InlineEditable
      {...props}
      aria-label="Hello world"
      placeholder="Untitled"
    />
  );
};

export const InsideHeading: StoryFn<typeof InlineEditable> = (props) => {
  return (
    <Heading scale={5} level={1}>
      <InlineEditable
        {...props}
        aria-label="Change heading"
        placeholder="Untitled"
      />
    </Heading>
  );
};
