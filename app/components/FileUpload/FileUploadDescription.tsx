import React from "react";
import type { FieldDescriptionProps } from "../Field";
import { Field } from "../Field";
import { FileUploadContext } from "./FileUpload";

export type FileUploadDescriptionProps = FieldDescriptionProps;

/**
 * Component that renders the errorMessage for a AvatarUpload, this is usually
 * used after the input has been validated.
 */
export function FileUploadDescription(props: FileUploadDescriptionProps) {
  const { children } = props;

  const context = React.useContext(FileUploadContext);

  const { errorMessageProps } = context.props;
  const { errorMessageRef } = context.refs;

  return (
    <Field.Description {...errorMessageProps} ref={errorMessageRef}>
      {children}
    </Field.Description>
  );
}
