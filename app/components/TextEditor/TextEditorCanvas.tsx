import {
  BOLD_ITALIC_STAR,
  BOLD_ITALIC_UNDERSCORE,
  BOLD_STAR,
  BOLD_UNDERSCORE,
  ITALIC_STAR,
  ITALIC_UNDERSCORE,
  LINK,
  ORDERED_LIST,
  STRIKETHROUGH,
  UNORDERED_LIST,
} from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useAlternativeScript } from "~/hooks/useAlternativeScript";
import type { DOMProps } from "~/utils/filterDOMProps";
import { filterDOMProps } from "~/utils/filterDOMProps";
import classnames from "classnames";
import { TextNode } from "lexical";
import * as React from "react";
import { TextEditorContext } from "./TextEditor";
import { textEditorCanvas } from "./TextEditorCanvas.css";

function DisableFormatsPlugin() {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    return editor.registerNodeTransform(TextNode, (textNode) => {
      if (textNode.hasFormat("code")) {
        textNode.toggleFormat("code");
      }

      if (textNode.hasFormat("subscript")) {
        textNode.toggleFormat("subscript");
      }

      if (textNode.hasFormat("superscript")) {
        textNode.toggleFormat("superscript");
      }
    });
  }, [editor]);
  return null;
}

export type TextEditorCanvasProps = DOMProps;

export function TextEditorCanvas(props: TextEditorCanvasProps) {
  const context = React.useContext(TextEditorContext);

  const { fieldProps } = context.props;

  const script = useAlternativeScript(props);

  return (
    <div
      className={classnames(textEditorCanvas.container, script)}
      {...filterDOMProps(props)}
    >
      <DisableFormatsPlugin />
      <MarkdownShortcutPlugin
        transformers={[
          BOLD_ITALIC_STAR,
          BOLD_ITALIC_UNDERSCORE,
          BOLD_STAR,
          BOLD_UNDERSCORE,
          ITALIC_STAR,
          ITALIC_UNDERSCORE,
          LINK,
          ORDERED_LIST,
          STRIKETHROUGH,
          UNORDERED_LIST,
        ]}
      />
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            {...fieldProps}
            className={textEditorCanvas.contentEditable}
          />
        }
        placeholder={null}
        ErrorBoundary={() => null}
      />
    </div>
  );
}
