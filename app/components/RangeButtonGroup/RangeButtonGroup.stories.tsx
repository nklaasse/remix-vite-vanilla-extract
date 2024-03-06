import { RangeButtonGroup } from "~/components/RangeButtonGroup";
import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";

export default {
  title: "Components/RangeButtonGroup",
  component: RangeButtonGroup,
} as Meta<typeof RangeButtonGroup>;

export const Default: StoryFn<typeof RangeButtonGroup> = (props) => {
  return (
    <RangeButtonGroup {...props}>
      <RangeButtonGroup.Label>Choose a option</RangeButtonGroup.Label>
      <RangeButtonGroup.Input>
        {Array.from({ length: 5 }, (_, index) => (
          <RangeButtonGroup.Item key={index + 1}>
            <RangeButtonGroup.Label>
              {`Option ${index + 1}`}
            </RangeButtonGroup.Label>
          </RangeButtonGroup.Item>
        ))}
      </RangeButtonGroup.Input>
    </RangeButtonGroup>
  );
};

export const ContextualHelp: StoryFn<typeof RangeButtonGroup> = (props) => {
  return (
    <RangeButtonGroup {...props}>
      <RangeButtonGroup.Label>Choose a option</RangeButtonGroup.Label>
      <RangeButtonGroup.ContextualHelp>
        Click one of the items
      </RangeButtonGroup.ContextualHelp>
      <RangeButtonGroup.Input>
        {Array.from({ length: 5 }, (_, index) => (
          <RangeButtonGroup.Item key={index + 1}>
            <RangeButtonGroup.Label>
              {`Option ${index + 1}`}
            </RangeButtonGroup.Label>
          </RangeButtonGroup.Item>
        ))}
      </RangeButtonGroup.Input>
    </RangeButtonGroup>
  );
};

export const Reset: StoryFn<typeof RangeButtonGroup> = (props) => {
  const [selectedKey, setSelectedKey] = React.useState<string | null>(null);

  return (
    <RangeButtonGroup
      {...props}
      value={selectedKey as string}
      onChange={setSelectedKey}
    >
      <RangeButtonGroup.Label>Choose a option</RangeButtonGroup.Label>
      <RangeButtonGroup.Reset
        onPress={() => {
          setSelectedKey(null);
        }}
      />
      <RangeButtonGroup.Input>
        {Array.from({ length: 5 }, (_, index) => (
          <RangeButtonGroup.Item key={index + 1}>
            <RangeButtonGroup.Label>
              {`Option ${index + 1}`}
            </RangeButtonGroup.Label>
          </RangeButtonGroup.Item>
        ))}
      </RangeButtonGroup.Input>
    </RangeButtonGroup>
  );
};
