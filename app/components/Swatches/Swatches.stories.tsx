import { Swatches } from "~/components/Swatches";
import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";

export default {
  title: "Components/Swatches",
  component: Swatches,
} as Meta<typeof Swatches>;

const COLORS = ["red", "hotpink", "blue", "green"];

export const Default: StoryFn<typeof Swatches> = () => {
  return (
    <Swatches>
      <Swatches.Label>Pick a color</Swatches.Label>
      <Swatches.Input>
        {COLORS.map((color) => (
          <Swatches.Item key={color}>{color}</Swatches.Item>
        ))}
      </Swatches.Input>
    </Swatches>
  );
};

export const WithoutLabel: StoryFn<typeof Swatches> = () => {
  return (
    <Swatches aria-label="Pick a color">
      <Swatches.Input
        items={COLORS.map((color) => ({
          key: color,
          value: color,
        }))}
      >
        {(color) => (
          <Swatches.Item key={color.key}>{color.value}</Swatches.Item>
        )}
      </Swatches.Input>
    </Swatches>
  );
};

export const Reset: StoryFn<typeof Swatches> = () => {
  const [value, setValue] = React.useState<string | null>(null);

  return (
    <Swatches value={value as string}>
      <Swatches.Label>Pick a color</Swatches.Label>
      <Swatches.Reset
        onPress={() => {
          setValue(null);
        }}
      />
      <Swatches.Input
        items={COLORS.map((color) => ({
          key: color,
          value: color,
        }))}
      >
        {(color) => (
          <Swatches.Item key={color.key}>{color.value}</Swatches.Item>
        )}
      </Swatches.Input>
    </Swatches>
  );
};

export const ContextualHelp: StoryFn<typeof Swatches> = () => {
  return (
    <Swatches>
      <Swatches.Label>Pick a color</Swatches.Label>
      <Swatches.ContextualHelp>Pick a nice colour</Swatches.ContextualHelp>
      <Swatches.Input
        items={COLORS.map((color) => ({
          key: color,
          value: color,
        }))}
      >
        {(color) => (
          <Swatches.Item key={color.key}>{color.value}</Swatches.Item>
        )}
      </Swatches.Input>
    </Swatches>
  );
};
