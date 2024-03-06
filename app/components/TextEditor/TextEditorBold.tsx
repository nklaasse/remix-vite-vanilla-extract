import { Tooltip } from "~/components/Tooltip";
import { IconBold } from "~/icons/IconBold";
import { useIntl } from "react-intl";
import { isMac } from "@react-aria/utils";
import { TextEditorFormat } from "./_TextEditorFormat";
import { TextEditorShortcut } from "./_TextEditorShortcut";

export function TextEditorBold() {
  const shortcut = isMac() ? ["⌘", "B"] : ["Ctrl", "B"];

  const intl = useIntl();

  const label = intl.formatMessage({
    id: "components.textEditor.textEditorBoldLabel",
    description: "Accessible label for the bold toolbar action",
    defaultMessage: "Bold",
  });

  return (
    <Tooltip.Trigger placement="top">
      <Tooltip>
        {label} <TextEditorShortcut>{shortcut}</TextEditorShortcut>
      </Tooltip>
      <TextEditorFormat type="bold" aria-label={label}>
        <IconBold />
      </TextEditorFormat>
    </Tooltip.Trigger>
  );
}
