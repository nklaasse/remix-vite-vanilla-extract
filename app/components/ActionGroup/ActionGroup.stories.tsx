import { ActionGroup } from "~/components/ActionGroup";
import { IconAlignContentInlineEnd } from "~/icons/IconAlignContentInlineEnd";
import { IconAlignContentInlineStart } from "~/icons/IconAlignContentInlineStart";
import { IconArrowBlockEnd } from "~/icons/IconArrowBlockEnd";
import { IconArrowBlockStart } from "~/icons/IconArrowBlockStart";
import { IconDelete } from "~/icons/IconDelete";
import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/ActionGroup",
  component: ActionGroup,
} as Meta<typeof ActionGroup>;

const Template: StoryFn<typeof ActionGroup> = () => {
  return (
    <ActionGroup>
      <ActionGroup.Item key="MoveUp" textValue="Move up">
        <ActionGroup.Icon>
          <IconArrowBlockStart />
        </ActionGroup.Icon>
        <ActionGroup.Label>Move up</ActionGroup.Label>
      </ActionGroup.Item>
      <ActionGroup.Item key="MoveDown" textValue="Move down">
        <ActionGroup.Icon>
          <IconArrowBlockEnd />
        </ActionGroup.Icon>
        <ActionGroup.Label>Move down</ActionGroup.Label>
      </ActionGroup.Item>
      <ActionGroup.Item key="MainColumn" textValue="Move to main column">
        <ActionGroup.Icon>
          <IconAlignContentInlineEnd />
        </ActionGroup.Icon>
        <ActionGroup.Label>Move to main column</ActionGroup.Label>
      </ActionGroup.Item>
      <ActionGroup.Item key="Sidebar" textValue="Move to sidebar">
        <ActionGroup.Icon>
          <IconAlignContentInlineStart />
        </ActionGroup.Icon>
        <ActionGroup.Label>Move to sidebar</ActionGroup.Label>
      </ActionGroup.Item>
      <ActionGroup.Item key="Delete" textValue="Delete">
        <ActionGroup.Icon>
          <IconDelete />
        </ActionGroup.Icon>
        <ActionGroup.Label>Delete</ActionGroup.Label>
      </ActionGroup.Item>
      <ActionGroup.Item key="Hide" textValue="Hide">
        <ActionGroup.Icon>
          <IconDelete />
        </ActionGroup.Icon>
        <ActionGroup.Label>Hide</ActionGroup.Label>
      </ActionGroup.Item>
    </ActionGroup>
  );
};

export const Default = Template.bind({});

export const DisabledItems = Template.bind({});

DisabledItems.args = {
  disabledKeys: ["MoveUp", "Delete", "Sidebar"],
};

export const MaxVisibleItems: StoryFn<typeof ActionGroup> = () => {
  return (
    <ActionGroup maxVisibleItems={2}>
      <ActionGroup.Item key="MoveUp" textValue="Move up">
        <ActionGroup.Icon>
          <IconArrowBlockStart />
        </ActionGroup.Icon>
        <ActionGroup.Label>Move up</ActionGroup.Label>
      </ActionGroup.Item>
      <ActionGroup.Item key="MoveDown" textValue="Move down">
        <ActionGroup.Icon>
          <IconArrowBlockEnd />
        </ActionGroup.Icon>
        <ActionGroup.Label>Move down</ActionGroup.Label>
      </ActionGroup.Item>
      <ActionGroup.Item key="MainColumn" textValue="Move to main column">
        <ActionGroup.Icon>
          <IconAlignContentInlineEnd />
        </ActionGroup.Icon>
        <ActionGroup.Label>Move to main column</ActionGroup.Label>
      </ActionGroup.Item>
      <ActionGroup.Item key="Sidebar" textValue="Move to sidebar">
        <ActionGroup.Icon>
          <IconAlignContentInlineStart />
        </ActionGroup.Icon>
        <ActionGroup.Label>Move to sidebar</ActionGroup.Label>
      </ActionGroup.Item>
      <ActionGroup.Item key="Delete" textValue="Delete">
        <ActionGroup.Icon>
          <IconDelete />
        </ActionGroup.Icon>
        <ActionGroup.Label>Delete</ActionGroup.Label>
      </ActionGroup.Item>
      <ActionGroup.Item key="Hide" textValue="Hide">
        <ActionGroup.Icon>
          <IconDelete />
        </ActionGroup.Icon>
        <ActionGroup.Label>Hide</ActionGroup.Label>
      </ActionGroup.Item>
    </ActionGroup>
  );
};
