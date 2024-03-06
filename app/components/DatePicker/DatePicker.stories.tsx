import { getLocalTimeZone, now, parseDate } from "@internationalized/date";
import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";
import type { DateValue } from "react-aria";
import { DatePicker } from "./DatePicker";

export default {
  title: "Components/DatePicker",
  component: DatePicker,
} as Meta<typeof DatePicker>;

export const Default: StoryFn<typeof DatePicker> = () => {
  return (
    <DatePicker>
      <DatePicker.Label>Pick a date</DatePicker.Label>
      <DatePicker.Input />
    </DatePicker>
  );
};

export const MinMaxValue: StoryFn<typeof DatePicker> = () => {
  return (
    <DatePicker
      minValue={parseDate("1901-01-01")}
      maxValue={now(getLocalTimeZone())}
    >
      <DatePicker.Label>Pick a date</DatePicker.Label>
      <DatePicker.Input />
    </DatePicker>
  );
};

export const Month: StoryFn<typeof DatePicker> = () => {
  return (
    <DatePicker
      granularity="month"
      minValue={parseDate("1901-01-01")}
      maxValue={now(getLocalTimeZone())}
    >
      <DatePicker.Label>Pick a month</DatePicker.Label>
      <DatePicker.Input />
    </DatePicker>
  );
};

export const Year: StoryFn<typeof DatePicker> = () => {
  return (
    <DatePicker
      granularity="year"
      minValue={parseDate("1901-01-01")}
      maxValue={now(getLocalTimeZone())}
    >
      <DatePicker.Label>Pick a month</DatePicker.Label>
      <DatePicker.Input />
    </DatePicker>
  );
};

export const Reset: StoryFn<typeof DatePicker> = () => {
  const [value, setValue] = React.useState<DateValue | null>(
    parseDate("2021-01-01")
  );

  return (
    <DatePicker value={value}>
      <DatePicker.Label>Pick a date</DatePicker.Label>
      <DatePicker.Input />
      <DatePicker.Reset
        onPress={() => {
          setValue(null);
        }}
      />
    </DatePicker>
  );
};

export const ContextualHelp: StoryFn<typeof DatePicker> = () => {
  return (
    <DatePicker>
      <DatePicker.Label>Pick a date</DatePicker.Label>
      <DatePicker.Input />
      <DatePicker.ContextualHelp>
        You know what a date is right?
      </DatePicker.ContextualHelp>
    </DatePicker>
  );
};
