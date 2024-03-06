import * as React from "react";
import { mergeProps } from "react-aria";
import type { FieldResetProps } from "../Field";
import { Field } from "../Field";
import { FileUploadContext } from "./FileUpload";

export type FileUploadResetProps = FieldResetProps;

/**
 * Component that renders a reset button for the FileUpload.
 */
export function FileUploadReset(props: FileUploadResetProps) {
  const context = React.useContext(FileUploadContext);

  const { inputRef } = context.refs;

  const onPressEnd = React.useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <Field.Reset
      {...mergeProps(
        {
          onPressEnd,
        },
        props
      )}
    />
  );
}
