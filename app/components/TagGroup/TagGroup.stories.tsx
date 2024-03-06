import { TagGroup } from "~/components/TagGroup";
import type { Meta, StoryFn } from "@storybook/react";

const meta: Meta<typeof TagGroup> = {
  title: "Components/TagGroup",
  component: TagGroup,
};

export default meta;

const ANIMALS = [
  "Rabbit",
  "Lion",
  "Tiger",
  "Elephant",
  "Giraffe",
  "Zebra",
  "Monkey",
  "Snake",
  "Horse",
  "Dog",
  "Cat",
  "Bear",
  "Shark",
  "Whale",
];

export const Default: StoryFn<typeof TagGroup> = () => {
  return (
    <TagGroup selectionMode="multiple">
      <TagGroup.Label>Pick your favorite animals</TagGroup.Label>
      <TagGroup.List
        items={ANIMALS.map((animal) => ({
          id: animal,
          label: animal,
        }))}
      >
        {(item) => (
          <TagGroup.Tag id={item.id}>
            <TagGroup.Label>{item.label}</TagGroup.Label>
          </TagGroup.Tag>
        )}
      </TagGroup.List>
    </TagGroup>
  );
};

export const WithoutLabel: StoryFn<typeof TagGroup> = () => {
  return (
    <TagGroup selectionMode="multiple" aria-label="Pick your favorite animals">
      <TagGroup.List
        items={ANIMALS.map((animal) => ({
          id: animal,
          label: animal,
        }))}
      >
        {(item) => (
          <TagGroup.Tag id={item.id}>
            <TagGroup.Label>{item.label}</TagGroup.Label>
          </TagGroup.Tag>
        )}
      </TagGroup.List>
    </TagGroup>
  );
};

export const ErrorMessage: StoryFn<typeof TagGroup> = () => {
  return (
    <TagGroup selectionMode="multiple">
      <TagGroup.Label>Pick your favorite animals</TagGroup.Label>
      <TagGroup.List
        items={ANIMALS.map((animal) => ({
          id: animal,
          label: animal,
        }))}
      >
        {(item) => (
          <TagGroup.Tag id={item.id}>
            <TagGroup.Label>{item.label}</TagGroup.Label>
          </TagGroup.Tag>
        )}
      </TagGroup.List>
      <TagGroup.ErrorMessage>This is an error message</TagGroup.ErrorMessage>
    </TagGroup>
  );
};
