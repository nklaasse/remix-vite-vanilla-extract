import React from "react";
import type { FieldLabelProps } from "../Field";
import { Field } from "../Field";
import { FileUploadContext } from "./FileUpload";

export type FileUploadLabelProps = FieldLabelProps;

/**
 * Component that renders the Label for the TextField, in case you don't want to
 * use a label, supply the Input element with an aria-label attribute.
 */
export function FileUploadLabel(props: FileUploadLabelProps) {
  const { children } = props;

  const context = React.useContext(FileUploadContext);

  const { labelRef } = context.refs;
  const { labelProps } = context.props;

  return (
    <Field.Label ref={labelRef} {...labelProps}>
      {children}
    </Field.Label>
  );
}
