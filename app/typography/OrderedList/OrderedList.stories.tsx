import type { Meta, StoryFn } from "@storybook/react";
import { ListItem } from "../ListItem/ListItem";
import { OrderedList } from "./OrderedList";

export default {
  title: "Typography/OrderedList",
  component: OrderedList,
} as Meta<typeof OrderedList>;

export const Default: StoryFn<typeof OrderedList> = (props) => {
  return (
    <OrderedList {...props}>
      <ListItem>List item</ListItem>
      <ListItem>List item</ListItem>
      <ListItem>List item</ListItem>
    </OrderedList>
  );
};
