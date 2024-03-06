import { Button } from "~/components/Button";
import { Tooltip } from "~/components/Tooltip";
import { IconEdit } from "~/icons/IconEdit";
import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
} as Meta<typeof Tooltip>;

export const Default: StoryFn<typeof Tooltip> = () => {
  return (
    <Tooltip.Trigger>
      <Tooltip>Default</Tooltip>
      <Button variant="tertiary" size="compact">
        <Button.Icon>
          <IconEdit />
        </Button.Icon>
      </Button>
    </Tooltip.Trigger>
  );
};
