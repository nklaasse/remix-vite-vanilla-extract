import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";
import { StepList } from "./StepList";

export default {
  title: "Components/StepList",
  component: StepList,
} as Meta<typeof StepList>;

const STEPS = [
  {
    key: "1",
    label: "Step 1",
  },
  {
    key: "2",
    label: "Step 2",
  },
  {
    key: "3",
    label: "Step 3",
  },
  {
    key: "4",
    label: "Step 4",
  },
];

export const Default: StoryFn<typeof StepList> = () => {
  return (
    <StepList items={STEPS} defaultSelectedKey="1">
      {(step) => <StepList.Item key={step.key}>{step.label}</StepList.Item>}
    </StepList>
  );
};

export const Controlled: StoryFn<typeof StepList> = () => {
  const [selectedKey, setSelectedKey] = React.useState<React.Key>("1");

  return (
    <StepList
      items={STEPS}
      selectedKey={selectedKey}
      onSelectionChange={setSelectedKey}
    >
      {(step) => <StepList.Item key={step.key}>{step.label}</StepList.Item>}
    </StepList>
  );
};
