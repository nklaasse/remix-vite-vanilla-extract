import { List } from "~/components/List";
import { useDragAndDrop } from "~/hooks/useDragAndDrop";
import type { Meta, StoryFn } from "@storybook/react";
import { useListData } from "react-stately";

export default {
  title: "Components/List",
  component: List,
} as Meta<typeof List>;

const choices = [
  "Aardvark",
  "Kangaroo",
  "Snake",
  "Parrot",
  "Fish",
  "Dog",
  "Cat",
  "Mouse",
  "Rabbit",
  "Cow",
  "Horse",
  "Pig",
] as const;

export const Default: StoryFn<typeof List> = () => {
  const list = useListData<{ name: (typeof choices)[number] }>({
    initialItems: choices.map((choice) => ({
      name: choice,
    })),
    getKey: (item) => item.name,
  });

  const dragAndDropHooks = useDragAndDrop({
    getItems(keys) {
      return [...keys].map((key) => {
        const item = list.getItem(key);
        return {
          "custom-app-type-reorder": JSON.stringify(item),
        };
      });
    },
    acceptedDragTypes: ["custom-app-type-reorder"],
    onReorder: async (e) => {
      const { keys, target } = e;

      if (target.dropPosition === "before") {
        list.moveBefore(target.key, [...keys]);
      } else if (target.dropPosition === "after") {
        list.moveAfter(target.key, [...keys]);
      }
    },
    getAllowedDropOperations: () => ["move"],
  });

  return (
    <List
      items={list.items}
      dragAndDropHooks={dragAndDropHooks}
      selectionMode="multiple"
    >
      {(item) => (
        <List.Item key={item.name}>
          <List.Title>{item.name}</List.Title>
          <List.Description>{`Some info about ${item.name}`}</List.Description>
        </List.Item>
      )}
    </List>
  );
};
