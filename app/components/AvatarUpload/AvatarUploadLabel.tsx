import React from "react";
import type { FieldLabelProps } from "../Field";
import { Field } from "../Field";
import { AvatarUploadContext } from "./AvatarUpload";

export type AvatarUploadLabelProps = FieldLabelProps;

/**
 * Component that renders the Label for the AvatarUpload, in case you don't want to
 * use a label, supply the Input element with an aria-label attribute.
 */
export function AvatarUploadLabel(props: AvatarUploadLabelProps) {
  const { children } = props;

  const context = React.useContext(AvatarUploadContext);

  const { labelRef } = context.refs;
  const { labelProps } = context.props;

  return (
    <Field.Label ref={labelRef} {...labelProps}>
      {children}
    </Field.Label>
  );
}
