import { Tooltip } from "~/components/Tooltip";
import { IconItalic } from "~/icons/IconItalic";
import { useIntl } from "react-intl";
import { isMac } from "@react-aria/utils";
import { TextEditorFormat } from "./_TextEditorFormat";
import { TextEditorShortcut } from "./_TextEditorShortcut";

export function TextEditorItalic() {
  const shortcut = isMac() ? ["⌘", "I"] : ["Ctrl", "I"];

  const intl = useIntl();

  const label = intl.formatMessage({
    id: "components.textEditor.textEditorItalicLabel",
    description: "Accessible label for the italic toolbar action",
    defaultMessage: "Italic",
  });

  return (
    <Tooltip.Trigger>
      <Tooltip>
        {label} <TextEditorShortcut>{shortcut}</TextEditorShortcut>
      </Tooltip>
      <TextEditorFormat type="italic" aria-label={label}>
        <IconItalic />
      </TextEditorFormat>
    </Tooltip.Trigger>
  );
}
