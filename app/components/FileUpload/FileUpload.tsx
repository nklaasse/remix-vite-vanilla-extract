import { useControlledState } from "~/hooks/useControlledState";
import { useSlot } from "~/hooks/useSlot";
import type { ValueBase } from "@react-types/shared";
import * as React from "react";
import type { AriaFieldProps, FieldAria } from "react-aria";
import { mergeProps, useField } from "react-aria";
import { Field } from "../Field";
import type { InputGroupStates } from "../InputGroup";
import { FileUploadContextualHelp } from "./FileUploadContextualHelp";
import { FileUploadDescription } from "./FileUploadDescription";
import { FileUploadErrorMessage } from "./FileUploadErrorMessage";
import { FileUploadInput } from "./FileUploadInput";
import { FileUploadLabel } from "./FileUploadLabel";
import { FileUploadReset } from "./FileUploadReset";

// React-aria doesn't export this type, so we have to copy it here.
type FileTriggerProps = {
  /**
   * Specifies what mime type of files are allowed.
   */
  acceptedFileTypes?: Array<string>;
  /**
   * Whether multiple files can be selected.
   */
  allowsMultiple?: boolean;
  /**
   * Specifies the use of a media capture mechanism to capture the media on the spot.
   */
  defaultCamera?: "user" | "environment";
  /**
   * Handler when a user selects a file.
   */
  onChange?: (files: File[] | null) => void;
};

type FileUploadContextValue = {
  props: {
    labelProps: FieldAria["labelProps"];
    inputProps: FieldAria["fieldProps"];
    descriptionProps: FieldAria["descriptionProps"];
    errorMessageProps: FieldAria["errorMessageProps"];
    triggerProps: FileTriggerProps;
    states: InputGroupStates;
  };
  state: {
    files?: File[] | null;
    setFiles: (value: File[] | null) => void;
  };
  refs: {
    labelRef: React.RefCallback<HTMLLabelElement>;
    errorMessageRef: React.RefCallback<HTMLDivElement>;
    descriptionRef: React.RefCallback<HTMLDivElement>;
    inputRef: React.RefObject<HTMLInputElement>;
  };
};

export const FileUploadContext = React.createContext<FileUploadContextValue>({
  props: {
    labelProps: {},
    inputProps: {},
    descriptionProps: {},
    errorMessageProps: {},
    triggerProps: {},
    states: {},
  },
  state: {
    files: null,
    setFiles: () => {},
  },
  refs: {
    labelRef: () => {},
    errorMessageRef: () => {},
    descriptionRef: () => {},
    inputRef: React.createRef<HTMLInputElement>(),
  },
});

export type FileUploadProps = Omit<
  AriaFieldProps,
  "label" | "errorMessage" | "description"
> &
  FileTriggerProps &
  ValueBase<File[] | null> & {
    children: React.ReactNode;
    /**
     * The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
     */
    name?: string;
  };

export function FileUpload(props: FileUploadProps) {
  const {
    children,
    acceptedFileTypes,
    allowsMultiple,
    defaultCamera,
    value,
    defaultValue,
    onChange,
    name,
    ...otherProps
  } = props;

  const [files, setFiles] = useControlledState(
    value,
    defaultValue,
    props.onChange
  );

  const [labelRef, label] = useSlot();
  const [errorMessageRef, errorMessage] = useSlot();
  const [descriptionRef, description] = useSlot();
  const inputRef = React.useRef<HTMLInputElement>(null!);

  const { labelProps, errorMessageProps, fieldProps, descriptionProps } =
    useField({
      ...otherProps,
      label: label,
      errorMessage: errorMessage,
      description: description,
    });

  return (
    <FileUploadContext.Provider
      value={{
        props: {
          labelProps,
          errorMessageProps,
          descriptionProps,
          triggerProps: {
            allowsMultiple,
            acceptedFileTypes,
            defaultCamera,
            onChange,
          },
          inputProps: mergeProps(fieldProps, {
            name,
          }),
          states: {
            isInvalid: props.validationState === "invalid",
          },
        },
        state: {
          files,
          setFiles,
        },
        refs: {
          labelRef,
          errorMessageRef,
          descriptionRef,
          inputRef,
        },
      }}
    >
      <Field>{children}</Field>
    </FileUploadContext.Provider>
  );
}

FileUpload.Label = FileUploadLabel;
FileUpload.Input = FileUploadInput;
FileUpload.ErrorMessage = FileUploadErrorMessage;
FileUpload.ContextualHelp = FileUploadContextualHelp;
FileUpload.Reset = FileUploadReset;
FileUpload.Description = FileUploadDescription;
