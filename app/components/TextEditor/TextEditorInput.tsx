import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { Field } from "~/components/Field";
import classNames from "classnames";
import type { LexicalEditor } from "lexical";
import { $getRoot, $setSelection } from "lexical";
import * as React from "react";
import { mergeProps, useFocusRing, useHover } from "react-aria";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "./serializer";
import { TextEditorContext } from "./TextEditor";
import { textEditorInput } from "./TextEditor.css";
import { editorTheme } from "./theme.css";

/**
 * Plugin which allows the editor to be accessed outside of the LexicalComposer
 **/
const RefPlugin = React.forwardRef(function RefPlugin(
  props: Record<string, unknown>,
  ref: React.ForwardedRef<LexicalEditor>
) {
  const [editor] = useLexicalComposerContext();

  if (ref && typeof ref !== "function") {
    ref.current = editor;
  }

  return null;
});

/**
 * Plugin which sets the initial state of the editor
 */
function InitialStatePlugin() {
  const context = React.useContext(TextEditorContext);

  const { editor: editorState } = context.state;

  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    editor.update(() => {
      const currentValue = $generateHtmlFromNodes();

      // Check if the content has been updated in the meantime
      if (currentValue !== editorState.value) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(
          editorState.value || "",
          "text/html"
        );

        const nodes = $generateNodesFromDOM(dom);
        const root = $getRoot();
        root.clear();
        root.append(...nodes);
        $setSelection(null); // Prevents the editor from autofocusing
      }
    });
  }, [editor, editorState.value]);

  const { setValue } = editorState;

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          setValue($generateHtmlFromNodes());
        });
      }}
    />
  );
}

type TextEditorInputProps = {
  /**
   * TextEditor.Canvas, TextEditor.Toolbar elements
   */
  children: React.ReactNode;
};

/**
 * Component to initialize the lexical editor
 */
export function TextEditorInput(props: TextEditorInputProps) {
  const { children } = props;

  const context = React.useContext(TextEditorContext);

  const { editorRef } = context.refs;
  const { inputProps } = context.props;

  const inputRef = React.useRef<LexicalEditor>(null!);

  React.useImperativeHandle(editorRef, () => ({
    activate: () => {
      if (inputRef.current) {
        // In case the editor is empty we need to focus the root element
        // otherwise we can focus the editor directly, this seems to be a bug
        // in the lexical package
        if (inputRef.current.getEditorState().isEmpty()) {
          inputRef.current.getRootElement()?.focus();
        } else {
          inputRef.current.focus();
        }
      }
    },
  }));

  const { onChange, ...otherInputProps } = inputProps;

  const initialConfig = {
    namespace: "@cvmaker/editor",
    theme: editorTheme,
    nodes: [ListNode, ListItemNode, LinkNode, AutoLinkNode],
    onError: () => null,
    editable: true,
  };

  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible, isFocused } = useFocusRing({
    isTextInput: true,
    within: true,
  });

  return (
    <Field.Input>
      <LexicalComposer initialConfig={initialConfig}>
        <InitialStatePlugin />
        <OnChangePlugin onChange={onChange} />
        <RefPlugin ref={inputRef} />
        <div
          className={classNames(textEditorInput.container, {
            [textEditorInput.states.isFocusVisible]: isFocusVisible,
            [textEditorInput.states.isFocused]: isFocused,
            [textEditorInput.states.isHovered]: isHovered,
          })}
          {...mergeProps(focusProps, hoverProps, otherInputProps)}
        >
          {children}
        </div>
      </LexicalComposer>
    </Field.Input>
  );
}
