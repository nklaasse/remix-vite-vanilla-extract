import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import type { TextFormatType } from "lexical";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import * as React from "react";
import { TextEditorToggleButton } from "./_TextEditorToggleButton";

type TextEditorFormatProps = {
  type: TextFormatType;
  children: React.ReactNode;
};

export function TextEditorFormat(props: TextEditorFormatProps) {
  const { children, type } = props;

  const [isSelected, setIsSelected] = React.useState(false);

  const [editor] = useLexicalComposerContext();

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      setIsSelected(selection.hasFormat(type));
    }
  }, [setIsSelected, type]);

  React.useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [updateToolbar, editor]);

  return (
    <TextEditorToggleButton
      isSelected={isSelected}
      onPress={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
      }}
    >
      {children}
    </TextEditorToggleButton>
  );
}
