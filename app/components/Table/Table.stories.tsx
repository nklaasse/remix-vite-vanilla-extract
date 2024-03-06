import { Table } from "~/components/Table";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../Switch";

const items = [
  {
    title: "Item #1",
    updated: "2 days ago",
    isPublished: true,
  },
  {
    title: "Item #2",
    updated: "1 month ago",
    isPublished: true,
  },
  {
    title: "Item #3",
    updated: "1 month ago",
    isPublished: false,
  },
  {
    title: "Item #4",
    updated: "2 months ago",
    isPublished: true,
  },
  {
    title: "Item #5",
    updated: "2 years ago",
    isPublished: false,
  },
];

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => {
    return (
      <Table>
        <Table.Header>
          <Table.Column isRowHeader>Title</Table.Column>
          <Table.Column size="200px">Modified</Table.Column>
          <Table.Column size="100px">Published</Table.Column>
          <Table.Column size="fit-content" />
        </Table.Header>
        <Table.Body items={items}>
          {(item) => (
            <Table.Row key={item.title}>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.updated}</Table.Cell>
              <Table.Cell>
                <Switch defaultSelected={item.isPublished}>
                  <Switch.Input />
                </Switch>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  },
};

export const Selectable: Story = {
  render: () => {
    return (
      <Table selectionMode="multiple">
        <Table.Header>
          <Table.Column size="fit-content">
            <Table.Checkbox />
          </Table.Column>
          <Table.Column isRowHeader>Title</Table.Column>
          <Table.Column size="200px">Modified</Table.Column>
          <Table.Column size="100px">Published</Table.Column>
          <Table.Column size="fit-content" />
        </Table.Header>

        <Table.Body items={items}>
          {(item) => (
            <Table.Row key={item.title}>
              <Table.Cell>
                <Table.Checkbox />
              </Table.Cell>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.updated}</Table.Cell>
              <Table.Cell>
                <Switch defaultSelected={item.isPublished}>
                  <Switch.Input />
                </Switch>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  },
};
