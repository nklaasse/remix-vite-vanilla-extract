import { TextField } from "~/components/TextField";
import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
};

export default meta;

export const Default: StoryFn<typeof TextField> = (props) => {
  const { ...inputProps } = props;

  return (
    <TextField {...inputProps}>
      <TextField.Label>Label</TextField.Label>
      <TextField.Input />
    </TextField>
  );
};

export const WithoutLabel: StoryFn<typeof TextField> = (props) => {
  const { ...inputProps } = props;

  return (
    <TextField {...inputProps} aria-label="Label">
      <TextField.Input />
    </TextField>
  );
};

export const Placeholder: StoryFn<typeof TextField> = (props) => {
  const { ...inputProps } = props;

  return (
    <TextField {...inputProps}>
      <TextField.Label>Label</TextField.Label>
      <TextField.Input placeholder="Enter a valid value" />
    </TextField>
  );
};

export const Disabled: StoryFn<typeof TextField> = (props) => {
  const { ...inputProps } = props;

  return (
    <TextField {...inputProps}>
      <TextField.Label>Label</TextField.Label>
      <TextField.Input />
    </TextField>
  );
};

export const ErrorMessage: StoryFn<typeof TextField> = (props) => {
  const { ...inputProps } = props;

  return (
    <TextField {...inputProps}>
      <TextField.Label>Label</TextField.Label>
      <TextField.Input />
      <TextField.ErrorMessage>This is an error message</TextField.ErrorMessage>
    </TextField>
  );
};

ErrorMessage.args = {
  isInvalid: true,
};

export const Reset: StoryFn<typeof TextField> = (props) => {
  const { ...inputProps } = props;

  const [value, setValue] = React.useState("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onReset = React.useCallback(() => {
    setValue("");
  }, []);

  return (
    <TextField {...inputProps} value={value} onChange={setValue}>
      <TextField.Reset
        onPress={() => {
          onReset();
        }}
      />
      <TextField.Label>Label</TextField.Label>
      <TextField.Input ref={inputRef} />
    </TextField>
  );
};

export const ContextualHelp: StoryFn<typeof TextField> = (props) => {
  const { ...inputProps } = props;

  return (
    <TextField {...inputProps}>
      <TextField.Label>Label</TextField.Label>
      <TextField.Input />
      <TextField.ContextualHelp>Info about the input</TextField.ContextualHelp>
    </TextField>
  );
};

export const ContextualHelpReset: StoryFn<typeof TextField> = (props) => {
  const { ...inputProps } = props;

  const [value, setValue] = React.useState("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onReset = React.useCallback(() => {
    setValue("");
  }, []);

  return (
    <div
      style={{
        paddingBlockStart: "200px",
        paddingInline: "100px",
      }}
    >
      <div style={{ width: "100%" }}>
        <TextField {...inputProps} value={value} onChange={setValue}>
          <TextField.Reset
            onPress={() => {
              onReset();
            }}
          />
          <TextField.Label>Label</TextField.Label>
          <TextField.Input ref={inputRef} />
          <TextField.ContextualHelp>
            Info about the input
          </TextField.ContextualHelp>
        </TextField>
      </div>
    </div>
  );
};
