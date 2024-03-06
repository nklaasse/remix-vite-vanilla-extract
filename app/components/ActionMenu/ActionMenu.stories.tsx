import { ActionMenu } from "~/components/ActionMenu";
import { IconAlignContentInlineEnd } from "~/icons/IconAlignContentInlineEnd";
import { IconAlignContentInlineStart } from "~/icons/IconAlignContentInlineStart";
import { IconArrowBlockEnd } from "~/icons/IconArrowBlockEnd";
import { IconArrowBlockStart } from "~/icons/IconArrowBlockStart";
import { IconDelete } from "~/icons/IconDelete";
import { IconHide } from "~/icons/IconHide";
import { IconPlus } from "~/icons/IconPlus";
import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";

export default {
  title: "Components/ActionMenu",
  component: ActionMenu,
} as Meta<typeof ActionMenu>;

type Item = {
  key: string;
  label: string;
  Icon: React.JSXElementConstructor<Record<string, unknown>>;
  readonly type: "item";
};

type Separator = {
  readonly type: "separator";
  key: string;
};

const items: Array<Item | Separator> = [
  {
    key: "MoveUp",
    label: "Move up",
    Icon: IconArrowBlockStart,
    type: "item",
  },
  {
    key: "MoveDown",
    label: "Move down",
    Icon: IconArrowBlockEnd,
    type: "item",
  },
  {
    key: "MainColumn",
    label: "Move to main column",
    Icon: IconAlignContentInlineStart,
    type: "item",
  },
  {
    key: "Sidebar",
    label: "Move to sidebar",
    Icon: IconAlignContentInlineEnd,
    type: "item",
  },
  {
    type: "separator",
    key: "separator-1",
  },
  {
    key: "Hide",
    label: "Hide",
    Icon: IconHide,
    type: "item",
  },
  {
    key: "Delete",
    label: "Delete",
    Icon: IconDelete,
    type: "item",
  },
];

export const Default: StoryFn<typeof ActionMenu> = (props) => {
  return (
    <ActionMenu {...props}>
      <ActionMenu.Button />
      <ActionMenu.Menu
        items={items.filter((item) => item.type === "item") as Array<Item>}
      >
        {(item) => (
          <ActionMenu.Item key={item.key} textValue={item.label}>
            <ActionMenu.Icon>
              <item.Icon />
            </ActionMenu.Icon>
            <ActionMenu.Label>{item.label}</ActionMenu.Label>
          </ActionMenu.Item>
        )}
      </ActionMenu.Menu>
    </ActionMenu>
  );
};

export const DisabledItems: StoryFn<typeof ActionMenu> = (props) => {
  return (
    <ActionMenu {...props} disabledKeys={["MoveUp", "Delete", "Sidebar"]}>
      <ActionMenu.Button />
      <ActionMenu.Menu
        items={items.filter((item) => item.type === "item") as Array<Item>}
      >
        {(item) => (
          <ActionMenu.Item key={item.key} textValue={item.label}>
            <ActionMenu.Icon>
              <item.Icon />
            </ActionMenu.Icon>
            <ActionMenu.Label>{item.label}</ActionMenu.Label>
          </ActionMenu.Item>
        )}
      </ActionMenu.Menu>
    </ActionMenu>
  );
};

export const Separators: StoryFn<typeof ActionMenu> = (props) => {
  return (
    <ActionMenu {...props} disabledKeys={["MoveUp", "Delete", "Sidebar"]}>
      <ActionMenu.Button />
      <ActionMenu.Menu items={items}>
        {(item) => {
          if (item.type === "separator") {
            return <ActionMenu.Separator key={item.key} />;
          }

          return (
            <ActionMenu.Item key={item.key} textValue={item.label}>
              <ActionMenu.Icon>
                <item.Icon />
              </ActionMenu.Icon>
              <ActionMenu.Label>{item.label}</ActionMenu.Label>
            </ActionMenu.Item>
          );
        }}
      </ActionMenu.Menu>
    </ActionMenu>
  );
};

export const CustomTrigger: StoryFn<typeof ActionMenu> = (props) => {
  return (
    <ActionMenu {...props} disabledKeys={["MoveUp", "Delete", "Sidebar"]}>
      <ActionMenu.Button>
        <ActionMenu.Label>Create</ActionMenu.Label>
        <ActionMenu.Icon>
          <IconPlus />
        </ActionMenu.Icon>
      </ActionMenu.Button>
      <ActionMenu.Menu items={items}>
        {(item) => {
          if (item.type === "separator") {
            return <ActionMenu.Separator key={item.key} />;
          }

          return (
            <ActionMenu.Item key={item.key} textValue={item.label}>
              <ActionMenu.Icon>
                <item.Icon />
              </ActionMenu.Icon>
              <ActionMenu.Label>{item.label}</ActionMenu.Label>
            </ActionMenu.Item>
          );
        }}
      </ActionMenu.Menu>
    </ActionMenu>
  );
};
