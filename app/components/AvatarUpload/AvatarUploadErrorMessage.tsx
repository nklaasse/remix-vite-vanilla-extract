import React from "react";
import type { FieldErrorMessageProps } from "../Field";
import { Field } from "../Field";
import { AvatarUploadContext } from "./AvatarUpload";

export type AvatarUploadErrorMessageProps = FieldErrorMessageProps;

/**
 * Component that renders the errorMessage for a AvatarUpload, this is usually
 * used after the input has been validated.
 */
export function AvatarUploadErrorMessage(props: AvatarUploadErrorMessageProps) {
  const { children } = props;

  const context = React.useContext(AvatarUploadContext);

  const { errorMessageProps } = context.props;
  const { errorMessageRef } = context.refs;

  return (
    <Field.ErrorMessage {...errorMessageProps} ref={errorMessageRef}>
      {children}
    </Field.ErrorMessage>
  );
}
