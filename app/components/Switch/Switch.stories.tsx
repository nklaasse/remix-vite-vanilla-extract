import { Switch } from "~/components/Switch";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => {
    return (
      <Switch>
        <Switch.Input />
        <Switch.Label>Recieve notifications</Switch.Label>
        <Switch.Description>
          Recieve notifications on test@mail.nl
        </Switch.Description>
      </Switch>
    );
  },
};

export const Standalone: Story = {
  render: () => {
    return (
      <Switch aria-label="Recieve notifications">
        <Switch.Input />
      </Switch>
    );
  },
};
