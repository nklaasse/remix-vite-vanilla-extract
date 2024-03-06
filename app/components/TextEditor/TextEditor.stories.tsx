import { TextEditor } from "~/components/TextEditor";
import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";

export default {
  title: "Components/TextEditor",
  component: TextEditor,
} as Meta<typeof TextEditor>;

export const Default: StoryFn<typeof TextEditor> = () => {
  return (
    <TextEditor>
      <TextEditor.Label>Description</TextEditor.Label>
      <TextEditor.Input>
        <TextEditor.Toolbar>
          <TextEditor.Group>
            <TextEditor.Bold />
            <TextEditor.Italic />
            <TextEditor.Underline />
            <TextEditor.Strikethrough />
          </TextEditor.Group>
          <TextEditor.Group>
            <TextEditor.OrderedList />
            <TextEditor.UnorderedList />
            <TextEditor.Link />
          </TextEditor.Group>
        </TextEditor.Toolbar>
        <TextEditor.Canvas />
      </TextEditor.Input>
    </TextEditor>
  );
};

export const WithoutLabel: StoryFn<typeof TextEditor> = () => {
  return (
    <TextEditor aria-label="Description">
      <TextEditor.Input>
        <TextEditor.Toolbar>
          <TextEditor.Group>
            <TextEditor.Bold />
            <TextEditor.Italic />
            <TextEditor.Underline />
            <TextEditor.Strikethrough />
          </TextEditor.Group>
          <TextEditor.Group>
            <TextEditor.OrderedList />
            <TextEditor.UnorderedList />
            <TextEditor.Link />
          </TextEditor.Group>
        </TextEditor.Toolbar>
        <TextEditor.Canvas />
      </TextEditor.Input>
    </TextEditor>
  );
};

export const NoToolbar: StoryFn<typeof TextEditor> = () => {
  return (
    <TextEditor>
      <TextEditor.Label>Description</TextEditor.Label>
      <TextEditor.Input>
        <TextEditor.Canvas />
      </TextEditor.Input>
    </TextEditor>
  );
};

export const Reset: StoryFn<typeof TextEditor> = () => {
  const [value, setValue] = React.useState("");

  return (
    <TextEditor value={value} onChange={setValue}>
      <TextEditor.Label>Description</TextEditor.Label>
      <TextEditor.Reset
        onPress={() => {
          setValue("");
        }}
      />
      <TextEditor.Input>
        <TextEditor.Toolbar>
          <TextEditor.Group>
            <TextEditor.Bold />
            <TextEditor.Italic />
            <TextEditor.Underline />
            <TextEditor.Strikethrough />
          </TextEditor.Group>
          <TextEditor.Group>
            <TextEditor.OrderedList />
            <TextEditor.UnorderedList />
            <TextEditor.Link />
          </TextEditor.Group>
        </TextEditor.Toolbar>
        <TextEditor.Canvas />
      </TextEditor.Input>
    </TextEditor>
  );
};

export const ContextualHelp: StoryFn<typeof TextEditor> = () => {
  return (
    <TextEditor>
      <TextEditor.Label>Description</TextEditor.Label>
      <TextEditor.ContextualHelp>
        Tell us about your live, work, and play habits.
      </TextEditor.ContextualHelp>
      <TextEditor.Input>
        <TextEditor.Toolbar>
          <TextEditor.Group>
            <TextEditor.Bold />
            <TextEditor.Italic />
            <TextEditor.Underline />
            <TextEditor.Strikethrough />
          </TextEditor.Group>
          <TextEditor.Group>
            <TextEditor.OrderedList />
            <TextEditor.UnorderedList />
            <TextEditor.Link />
          </TextEditor.Group>
        </TextEditor.Toolbar>
        <TextEditor.Canvas />
      </TextEditor.Input>
    </TextEditor>
  );
};
