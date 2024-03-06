import { Tooltip } from "~/components/Tooltip";
import { IconOrderedList } from "~/icons/IconOrderedList";
import { useIntl } from "react-intl";
import React from "react";
import { TextEditorList } from "./_TextEditorList";

export function TextEditorOrderedList() {
  const intl = useIntl();

  const label = intl.formatMessage({
    id: "components.textEditor.textEditorOrderedListLabel",
    description: "Accessible label for the ordered list toolbar action",
    defaultMessage: "Numbered list",
  });

  return (
    <Tooltip.Trigger>
      <Tooltip>{label}</Tooltip>
      <TextEditorList type="number" aria-label={label}>
        <IconOrderedList />
      </TextEditorList>
    </Tooltip.Trigger>
  );
}
