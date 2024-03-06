import * as React from "react";
import type { FieldLabelProps } from "../Field";
import { Field } from "../Field";
import { useElementType } from "./TemplateSelect";
import { TemplateSelectContext } from "./TemplateSelect";
import { templateSelectPreviewLabel } from "./TemplateSelectLabel.css";

export type TemplateSelectPreviewLabelProps = {
  children: string;
};

function TemplateSelectPreviewLabel(props: TemplateSelectPreviewLabelProps) {
  const { children } = props;

  return (
    <span className={templateSelectPreviewLabel.container}>{children}</span>
  );
}

type TemplateSelectInputLabelProps = FieldLabelProps;

function TemplateSelectInputLabel(props: TemplateSelectInputLabelProps) {
  const { children } = props;

  const context = React.useContext(TemplateSelectContext);

  const { labelProps } = context.props;
  const { labelRef } = context.refs;

  return (
    <Field.Label {...labelProps} ref={labelRef}>
      {children}
    </Field.Label>
  );
}

type TemplateSelectLabelProps =
  | TemplateSelectInputLabelProps
  | TemplateSelectPreviewLabelProps;

export function TemplateSelectLabel(props: TemplateSelectLabelProps) {
  const type = useElementType();

  const { children } = props;

  switch (type) {
    case "slide":
      return (
        <TemplateSelectPreviewLabel>{children}</TemplateSelectPreviewLabel>
      );
    case "input":
      return <TemplateSelectInputLabel>{children}</TemplateSelectInputLabel>;
  }
}
