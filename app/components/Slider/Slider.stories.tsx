import { Slider } from "~/components/Slider";
import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";

export default {
  title: "Components/Slider",
  component: Slider,
} as Meta<typeof Slider>;

export const Default: StoryFn<typeof Slider> = (props) => {
  return (
    <Slider {...props}>
      <Slider.Label>Label</Slider.Label>
      <Slider.Input />
    </Slider>
  );
};

export const Offset: StoryFn<typeof Slider> = (props) => {
  return (
    <Slider
      {...props}
      maxValue={80}
      minValue={20}
      fillOffset={50}
      defaultValue={30}
    >
      <Slider.Label>Label</Slider.Label>
      <Slider.Input />
    </Slider>
  );
};

export const ContextualHelp: StoryFn<typeof Slider> = (props) => {
  return (
    <Slider {...props}>
      <Slider.Label>Label</Slider.Label>
      <Slider.Input />
      <Slider.ContextualHelp>
        This is a contextual help message.
      </Slider.ContextualHelp>
    </Slider>
  );
};

export const Reset: StoryFn<typeof Slider> = (props) => {
  const [value, setValue] = React.useState(50);

  return (
    <Slider {...props} value={value} onChange={setValue}>
      <Slider.Label>Label</Slider.Label>
      <Slider.Input />
      <Slider.Reset
        onPress={() => {
          setValue(50);
        }}
      />
    </Slider>
  );
};
