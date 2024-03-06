import { TextArea } from "~/components/TextArea";
import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
};

export default meta;

export const Default: StoryFn<typeof TextArea> = (props) => {
  const { ...inputProps } = props;

  return (
    <TextArea {...inputProps}>
      <TextArea.Label>Label</TextArea.Label>
      <TextArea.TextArea />
    </TextArea>
  );
};

export const WithCustomRows: StoryFn<typeof TextArea> = (props) => {
  const { ...inputProps } = props;

  return (
    <TextArea {...inputProps}>
      <TextArea.Label>Label</TextArea.Label>
      <TextArea.TextArea rows={5} />
    </TextArea>
  );
};

export const WithoutLabel: StoryFn<typeof TextArea> = (props) => {
  const { ...inputProps } = props;

  return (
    <TextArea {...inputProps} aria-label="Label">
      <TextArea.TextArea />
    </TextArea>
  );
};

export const Placeholder: StoryFn<typeof TextArea> = (props) => {
  const { ...inputProps } = props;

  return (
    <TextArea {...inputProps}>
      <TextArea.Label>Label</TextArea.Label>
      <TextArea.TextArea placeholder="Type your message" />
    </TextArea>
  );
};

export const Disabled: StoryFn<typeof TextArea> = (props) => {
  const { ...inputProps } = props;

  return (
    <TextArea {...inputProps}>
      <TextArea.Label>Label</TextArea.Label>
      <TextArea.TextArea />
    </TextArea>
  );
};

Disabled.args = {
  isDisabled: true,
};

export const ErrorMessage: StoryFn<typeof TextArea> = (props) => {
  const { ...inputProps } = props;

  return (
    <TextArea {...inputProps}>
      <TextArea.Label>Label</TextArea.Label>
      <TextArea.TextArea />
      <TextArea.ErrorMessage>This is an error message</TextArea.ErrorMessage>
    </TextArea>
  );
};

ErrorMessage.args = {
  isInvalid: true,
};

export const Reset: StoryFn<typeof TextArea> = (props) => {
  const { ...inputProps } = props;

  const [value, setValue] = React.useState("");

  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const onReset = React.useCallback(() => {
    setValue("");
  }, []);

  return (
    <TextArea {...inputProps} value={value} onChange={setValue}>
      <TextArea.Reset
        onPress={() => {
          onReset();
        }}
      />
      <TextArea.Label>Label</TextArea.Label>
      <TextArea.TextArea ref={inputRef} />
    </TextArea>
  );
};

export const ContextualHelp: StoryFn<typeof TextArea> = (props) => {
  const { ...inputProps } = props;

  return (
    <TextArea {...inputProps}>
      <TextArea.Label>Label</TextArea.Label>
      <TextArea.TextArea />
      <TextArea.ContextualHelp>Info about the input</TextArea.ContextualHelp>
    </TextArea>
  );
};

export const ContextualHelpReset: StoryFn<typeof TextArea> = (props) => {
  const { ...inputProps } = props;

  const [value, setValue] = React.useState("");

  const inputRef = React.useRef<HTMLTextAreaElement>(null);

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
        <TextArea {...inputProps} value={value} onChange={setValue}>
          <TextArea.Reset
            onPress={() => {
              onReset();
            }}
          />
          <TextArea.Label>Label</TextArea.Label>
          <TextArea.TextArea ref={inputRef} />
          <TextArea.ContextualHelp>
            Info about the input
          </TextArea.ContextualHelp>
        </TextArea>
      </div>
    </div>
  );
};
