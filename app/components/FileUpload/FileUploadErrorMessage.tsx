import React from "react";
import type { FieldErrorMessageProps } from "../Field";
import { Field } from "../Field";
import { FileUploadContext } from "./FileUpload";

export type FileUploadErrorMessageProps = FieldErrorMessageProps;

/**
 * Component that renders the errorMessage for a AvatarUpload, this is usually
 * used after the input has been validated.
 */
export function FileUploadErrorMessage(props: FileUploadErrorMessageProps) {
  const { children } = props;

  const context = React.useContext(FileUploadContext);

  const { errorMessageProps } = context.props;
  const { errorMessageRef } = context.refs;

  return (
    <Field.ErrorMessage {...errorMessageProps} ref={errorMessageRef}>
      {children}
    </Field.ErrorMessage>
  );
}
