import { Tooltip } from "~/components/Tooltip";
import { IconUnorderedList } from "~/icons/IconUnorderedList";
import { useIntl } from "react-intl";
import { TextEditorList } from "./_TextEditorList";

export function TextEditorUnorderedList() {
  const intl = useIntl();

  const label = intl.formatMessage({
    id: "components.textEditor.textEditorUnorderedListLabel",
    description: "Accessible label for the bulleted list toolbar action",
    defaultMessage: "Bulleted list",
  });

  return (
    <Tooltip.Trigger>
      <Tooltip>{label}</Tooltip>
      <TextEditorList type="bullet" aria-label={label}>
        <IconUnorderedList />
      </TextEditorList>
    </Tooltip.Trigger>
  );
}
