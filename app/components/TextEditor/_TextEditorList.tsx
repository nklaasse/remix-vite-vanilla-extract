import type { ListType } from "@lexical/list";
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import * as React from "react";
import { TextEditorToggleButton } from "./_TextEditorToggleButton";

type TextEditorFormatProps = {
  type: ListType;
  children: React.ReactNode;
};

export function TextEditorList(props: TextEditorFormatProps) {
  const { children, type } = props;

  const [editor] = useLexicalComposerContext();

  const [isSelected, setIsSelected] = React.useState(false);

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();

      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElement();

      if ($isListNode(element)) {
        const parentList = $getNearestNodeOfType(anchorNode, ListNode);
        const elementType = parentList ? parentList.getTag() : element.getTag();

        if (type === "bullet" && elementType === "ul") {
          setIsSelected(true);
        } else if (type === "number" && elementType === "ol") {
          setIsSelected(true);
        } else {
          setIsSelected(false);
        }
      } else {
        setIsSelected(false);
      }
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

  /**
   * Toggle the list items, in case the selection is already a list item we should either remove it or change it to the other type.
   */
  const onPress = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const anchorNode = selection.anchor.getNode();

        const element =
          anchorNode.getKey() === "root"
            ? anchorNode
            : anchorNode.getTopLevelElement();

        if ($isListNode(element)) {
          const listType = element.getListType();

          if (listType === type) {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);

            return;
          }
        }
      }

      if (type === "bullet") {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      } else if (type === "number") {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      }
    });
  };

  return (
    <>
      <ListPlugin />
      <TextEditorToggleButton isSelected={isSelected} onPress={onPress}>
        {children}
      </TextEditorToggleButton>
    </>
  );
}
