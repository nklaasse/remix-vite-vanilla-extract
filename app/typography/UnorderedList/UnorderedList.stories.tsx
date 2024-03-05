import type { Meta, StoryFn } from "@storybook/react";
import { ListItem } from "../ListItem/ListItem";
import { UnorderedList } from "./UnorderedList";

export default {
  title: "Typography/UnorderedList",
  component: UnorderedList,
} as Meta<typeof UnorderedList>;

export const Default: StoryFn<typeof UnorderedList> = (props) => {
  return (
    <UnorderedList {...props}>
      <ListItem>List item</ListItem>
      <ListItem>List item</ListItem>
      <ListItem>List item</ListItem>
    </UnorderedList>
  );
};
