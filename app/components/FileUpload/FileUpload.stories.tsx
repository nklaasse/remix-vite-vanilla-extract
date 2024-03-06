import { FileUpload } from "~/components/FileUpload";
import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
};

export default meta;

export const Default: StoryFn<typeof FileUpload> = (props) => {
  const { ...inputProps } = props;

  return (
    <FileUpload {...inputProps}>
      <FileUpload.Label>Label</FileUpload.Label>
      <FileUpload.Input />
    </FileUpload>
  );
};

export const Multiple: StoryFn<typeof FileUpload> = (props) => {
  const { ...inputProps } = props;

  return (
    <FileUpload {...inputProps} allowsMultiple>
      <FileUpload.Label>Label</FileUpload.Label>
      <FileUpload.Input />
    </FileUpload>
  );
};

export const WithoutLabel: StoryFn<typeof FileUpload> = (props) => {
  const { ...inputProps } = props;

  return (
    <FileUpload {...inputProps} aria-label="Label">
      <FileUpload.Input />
    </FileUpload>
  );
};

export const ErrorMessage: StoryFn<typeof FileUpload> = (props) => {
  const { ...inputProps } = props;

  return (
    <FileUpload {...inputProps}>
      <FileUpload.Label>Label</FileUpload.Label>
      <FileUpload.Input />
      <FileUpload.ErrorMessage>
        This is an error message
      </FileUpload.ErrorMessage>
    </FileUpload>
  );
};

ErrorMessage.args = {
  validationState: "invalid",
};

export const Description: StoryFn<typeof FileUpload> = (props) => {
  const { ...inputProps } = props;

  return (
    <FileUpload {...inputProps}>
      <FileUpload.Label>Label</FileUpload.Label>
      <FileUpload.Input />
      <FileUpload.Description>This is a description</FileUpload.Description>
    </FileUpload>
  );
};

export const DescriptionErrorMessage: StoryFn<typeof FileUpload> = (props) => {
  const { ...inputProps } = props;

  return (
    <FileUpload {...inputProps}>
      <FileUpload.Label>Label</FileUpload.Label>
      <FileUpload.Input />
      <FileUpload.Description>This is a description</FileUpload.Description>
      <FileUpload.ErrorMessage>
        This is an error message
      </FileUpload.ErrorMessage>
    </FileUpload>
  );
};

DescriptionErrorMessage.args = {
  validationState: "invalid",
};

export const Reset: StoryFn<typeof FileUpload> = (props) => {
  const { ...inputProps } = props;

  const [value, setValue] = React.useState<File[] | null>(null);

  const onReset = React.useCallback(() => {
    setValue(null);
  }, []);

  return (
    <FileUpload {...inputProps} value={value} onChange={setValue}>
      <FileUpload.Reset
        onPress={() => {
          onReset();
        }}
      />
      <FileUpload.Label>Label</FileUpload.Label>
      <FileUpload.Input />
    </FileUpload>
  );
};

export const ContextualHelp: StoryFn<typeof FileUpload> = (props) => {
  const { ...inputProps } = props;

  return (
    <FileUpload {...inputProps}>
      <FileUpload.Label>Label</FileUpload.Label>
      <FileUpload.Input />
      <FileUpload.ContextualHelp>
        Info about the input
      </FileUpload.ContextualHelp>
    </FileUpload>
  );
};

export const ContextualHelpReset: StoryFn<typeof FileUpload> = (props) => {
  const { ...inputProps } = props;

  const [value, setValue] = React.useState<File[] | null>(null);

  const onReset = React.useCallback(() => {
    setValue(null);
  }, []);

  return (
    <div
      style={{
        paddingBlockStart: "200px",
        paddingInline: "100px",
      }}
    >
      <div style={{ width: "100%" }}>
        <FileUpload {...inputProps} value={value} onChange={setValue}>
          <FileUpload.Reset
            onPress={() => {
              onReset();
            }}
          />
          <FileUpload.Label>Label</FileUpload.Label>
          <FileUpload.Input />
          <FileUpload.ContextualHelp>
            Info about the input
          </FileUpload.ContextualHelp>
        </FileUpload>
      </div>
    </div>
  );
};
