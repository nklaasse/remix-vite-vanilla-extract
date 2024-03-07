import { Field } from "~/components/Field";
import { useIntl } from "react-intl";
import classNames from "classnames";
import * as React from "react";
import { mergeProps, useButton, useHover, usePress } from "react-aria";
import {
  DropZone as ReactAriaDropZone,
  FileTrigger as ReactAriaFileTrigger,
  InputContext as ReactAriaInputContext,
  Provider as ReactAriaProvider,
  Text as ReactAriaText,
} from "react-aria-components";
import { InputGroup } from "../InputGroup";
import { FileUploadContext } from "./FileUpload";
import ICON from "./FileUploadIcon.png";
import { fakeUploadTrigger, fileUploadInput } from "./FileUploadInput.css";

type FakeUploadTriggerProps = {
  children: React.ReactNode;
};

function FakeUploadTrigger(props: FakeUploadTriggerProps) {
  const { children } = props;

  const context = React.useContext(FileUploadContext);

  const { inputRef: defaultInputRef } = context.refs;

  const { isHovered, hoverProps } = useHover({});
  const { isPressed, pressProps } = usePress({
    onPress: () => {
      defaultInputRef.current?.click();
    },
  });

  return (
    <div
      {...mergeProps(hoverProps, pressProps)}
      className={classNames(fakeUploadTrigger.container, {
        [fakeUploadTrigger.states.isHovered]: isHovered,
        [fakeUploadTrigger.states.isPressed]: isPressed,
      })}
    >
      {children}
    </div>
  );
}

export function FileUploadInput() {
  const context = React.useContext(FileUploadContext);

  const intl = useIntl();

  const { files, setFiles } = context.state;
  const { inputProps, triggerProps, states } = context.props;
  const { inputRef: defaultInputRef } = context.refs;

  const ref = React.useRef<HTMLInputElement>(null);

  const { isPressed, buttonProps } = useButton(
    {
      elementType: "div",
      onPressEnd: () => {
        defaultInputRef.current?.click();
      },
    },
    ref
  );

  React.useEffect(() => {
    if (defaultInputRef.current instanceof HTMLInputElement) {
      defaultInputRef.current.files = null;

      let dataTransfer: DataTransfer | null = null;

      // In safari < 14, DataTransfer is not constructable
      // in this case if we wan't need to support it we can't sync it with the HTML input
      try {
        dataTransfer = new DataTransfer();
      } catch (error) {
        console.error(error);
      }

      if (dataTransfer) {
        if (files) {
          for (const file of files) {
            dataTransfer.items.add(file);
          }
        }

        defaultInputRef.current.files = dataTransfer.files;
      }
    }
  }, [defaultInputRef, files]);

  let value: React.ReactNode = null;

  if (files && files.length > 0) {
    if (files.length === 1) {
      value = <span className={fileUploadInput.fileName}>{files[0].name}</span>;
    } else {
      value = files ? `${files.length} files selected` : "";
    }
  }

  return (
    <ReactAriaProvider
      values={[
        [
          ReactAriaInputContext,
          {
            ...inputProps,
            ref: defaultInputRef,
          },
        ],
      ]}
    >
      <Field.Input>
        <ReactAriaFileTrigger
          {...triggerProps}
          onSelect={(files) => {
            setFiles(files ? Array.from(files) : null);
          }}
          ref={ref}
        >
          <ReactAriaDropZone
            className={fileUploadInput.container}
            onDrop={async (event) => {
              if (event.type === "drop") {
                const files: File[] = [];

                for (const item of event.items) {
                  if (item.kind === "file") {
                    files.push(await item.getFile());
                    break;
                  }
                }

                setFiles(files);
              }
            }}
          >
            {({ isDropTarget }) => (
              <InputGroup
                {...buttonProps}
                ref={ref}
                border="dashed"
                states={{
                  ...states,
                  isDropTarget: isDropTarget,
                  isPressed: isPressed,
                }}
              >
                <InputGroup.Value>
                  <div className={fileUploadInput.content}>
                    <img alt="" src={ICON} className={fileUploadInput.icon} />

                    <ReactAriaText
                      slot="label"
                      className={fileUploadInput.label}
                    >
                      {intl.formatMessage(
                        {
                          id: "components.fileUpload.inputFeedbackLabel",
                          description:
                            "Label which is used to explain the possible actions to the user inside the file upload",
                          defaultMessage:
                            "<trigger>Click to upload</trigger> or drag and drop a file here",
                        },
                        {
                          trigger: (str: React.ReactNode) => (
                            <FakeUploadTrigger>{str}</FakeUploadTrigger>
                          ),
                        }
                      )}
                    </ReactAriaText>
                    {value ? (
                      <span className={fileUploadInput.value}>{value} </span>
                    ) : null}
                  </div>
                </InputGroup.Value>
              </InputGroup>
            )}
          </ReactAriaDropZone>
        </ReactAriaFileTrigger>
      </Field.Input>
    </ReactAriaProvider>
  );
}
