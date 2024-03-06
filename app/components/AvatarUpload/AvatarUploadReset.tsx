import * as React from "react";
import { mergeProps } from "react-aria";
import type { FieldResetProps } from "../Field";
import { Field } from "../Field";
import { AvatarUploadContext } from "./AvatarUpload";

export type AvatarUploadResetProps = FieldResetProps;

/**
 * Component that renders a reset button for the AvatarUpload.
 */
export function AvatarUploadReset(props: AvatarUploadResetProps) {
  const context = React.useContext(AvatarUploadContext);

  const { resetProps } = context.props;

  return <Field.Reset {...mergeProps(props, resetProps)} />;
}
