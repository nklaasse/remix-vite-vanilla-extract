import { Tooltip } from "~/components/Tooltip";
import { IconUnderline } from "~/icons/IconUnderline";
import { useIntl } from "react-intl";
import { isMac } from "@react-aria/utils";
import { TextEditorFormat } from "./_TextEditorFormat";
import { TextEditorShortcut } from "./_TextEditorShortcut";

export function TextEditorUnderline() {
  const shortcut = isMac() ? ["⌘", "U"] : ["Ctrl", "U"];

  const intl = useIntl();

  const label = intl.formatMessage({
    id: "components.textEditor.textEditorUnderlineLabel",
    description: "Accessible label for the underline toolbar action",
    defaultMessage: "Underline",
  });

  return (
    <Tooltip.Trigger>
      <Tooltip>
        {label} <TextEditorShortcut>{shortcut}</TextEditorShortcut>
      </Tooltip>
      <TextEditorFormat type="underline" aria-label={label}>
        <IconUnderline />
      </TextEditorFormat>
    </Tooltip.Trigger>
  );
}
