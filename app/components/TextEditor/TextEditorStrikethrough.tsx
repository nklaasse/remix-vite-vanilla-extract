import { Tooltip } from "~/components/Tooltip";
import { IconStrikethrough } from "~/icons/IconStrikethrough";
import { useIntl } from "react-intl";
import { isMac } from "@react-aria/utils";
import { TextEditorFormat } from "./_TextEditorFormat";
import { TextEditorShortcut } from "./_TextEditorShortcut";

export function TextEditorStrikethrough() {
  const shortcut = isMac() ? ["⌘", "⇧", "X"] : ["Ctrl", "⇧", "X"];

  const intl = useIntl();

  const label = intl.formatMessage({
    id: "components.textEditor.textEditorStrikethroughLabel",
    description: "Accessible label for the strikethrough toolbar action",
    defaultMessage: "Strikethrough",
  });

  return (
    <Tooltip.Trigger>
      <Tooltip>
        {label} <TextEditorShortcut>{shortcut}</TextEditorShortcut>
      </Tooltip>
      <TextEditorFormat type="bold" aria-label={label}>
        <IconStrikethrough />
      </TextEditorFormat>
    </Tooltip.Trigger>
  );
}
