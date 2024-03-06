import { Field } from "~/components/Field";
import { useControlledState } from "~/hooks/useControlledState";
import { useSlot } from "~/hooks/useSlot";
import type { EditorState, LexicalEditor } from "lexical";
import * as React from "react";
import type { AriaFieldProps, FieldAria } from "react-aria";
import { useField } from "react-aria";
import { TextEditorBold } from "./TextEditorBold";
import { TextEditorCanvas } from "./TextEditorCanvas";
import { TextEditorContextualHelp } from "./TextEditorContextualHelp";
import { TextEditorGroup } from "./TextEditorGroup";
import { TextEditorInput } from "./TextEditorInput";
import { TextEditorItalic } from "./TextEditorItalic";
import { TextEditorLabel } from "./TextEditorLabel";
import { TextEditorLink } from "./TextEditorLink";
import { TextEditorOrderedList } from "./TextEditorOrderedList";
import { TextEditorReset } from "./TextEditorReset";
import { TextEditorStrikethrough } from "./TextEditorStrikethrough";
import { TextEditorToolbar } from "./TextEditorToolbar";
import { TextEditorUnderline } from "./TextEditorUnderline";
import { TextEditorUnorderedList } from "./TextEditorUnorderedList";

export type TextEditorContextValue = {
  props: {
    labelProps: FieldAria["labelProps"];
    errorMessageProps: FieldAria["errorMessageProps"];
    fieldProps: FieldAria["fieldProps"];
    previewProps: {
      value?: EditorState;
    };
    inputProps: {
      children?: React.ReactNode;
      onChange: (value: EditorState, editor: LexicalEditor) => void;
    };
    toolbarProps: React.HTMLAttributes<HTMLDivElement>;
  };
  state: {
    editor: {
      value?: string;
      setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
    };
  };
  refs: {
    labelRef: React.RefCallback<HTMLLabelElement>;
    errorMessageRef: React.RefCallback<HTMLDivElement>;
    editorRef: React.MutableRefObject<{ activate: () => void } | undefined>;
  };
};

export const TextEditorContext = React.createContext<TextEditorContextValue>({
  props: {
    labelProps: {},
    errorMessageProps: {},
    fieldProps: {},
    toolbarProps: {},
    previewProps: {},
    inputProps: {
      onChange: () => {},
    },
  },
  state: {
    editor: {
      value: undefined,
      setValue: () => {},
    },
  },
  refs: {
    labelRef: () => {},
    errorMessageRef: () => {},
    editorRef: { current: { activate: () => {} } },
  },
});

export type TextEditorProps = {
  /**
   * HTML string to be used as the controlled value
   */
  value?: string;
  /**
   * HTML string to be used as the default value
   */
  defaultValue?: string;
  /**
   * Function triggered on every change
   */
  onChange?: (arg: string) => void;
  /**
   * Children elements to render
   */
  children: React.ReactNode;
  /**
   * The name of the input element, used when submitting an HTML form.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  name?: string;
} & Omit<AriaFieldProps, "label" | "errorMessage">;

const _TextEditor = React.forwardRef(function TextEditor(
  props: TextEditorProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    name,
    children,
    value: _value,
    defaultValue: _defaultValue,
    onChange: _onChange,
    ...otherProps
  } = props;

  const [labelRef, label] = useSlot();
  const [errorMessageRef, errorMessage] = useSlot();

  const [value, setValue] = useControlledState(
    _value,
    _defaultValue,
    _onChange
  );

  const [editorValue, setEditorValue] = React.useState<
    EditorState | undefined
  >();

  const { labelProps, errorMessageProps, fieldProps } = useField({
    ...otherProps,
    label,
    errorMessage,
  });

  const editorRef = React.useRef<{ activate: () => void } | undefined>();

  const handleInputChange = React.useCallback(
    (editorValue: React.SetStateAction<EditorState | undefined>) => {
      setEditorValue(editorValue);
    },
    [setEditorValue]
  );

  return (
    <>
      <TextEditorContext.Provider
        value={{
          props: {
            errorMessageProps,
            fieldProps,
            labelProps,
            previewProps: {
              value: editorValue,
            },
            inputProps: {
              children,
              onChange: handleInputChange,
            },
            toolbarProps: {
              "aria-labelledby": labelProps["id"],
              "aria-orientation": "horizontal",
              role: "toolbar",
            },
          },
          state: {
            editor: {
              value,
              setValue,
            },
          },
          refs: {
            editorRef,
            labelRef,
            errorMessageRef,
          },
        }}
      >
        <Field ref={ref}>
          <input type="hidden" name={name} value={value} />
          {children}
        </Field>
      </TextEditorContext.Provider>
    </>
  );
});

export const TextEditor = Object.assign({}, _TextEditor, {
  Label: TextEditorLabel,
  Input: TextEditorInput,
  Reset: TextEditorReset,
  ContextualHelp: TextEditorContextualHelp,

  Canvas: TextEditorCanvas,
  Toolbar: TextEditorToolbar,
  Group: TextEditorGroup,

  /** Toolbar items */
  Bold: TextEditorBold,
  Italic: TextEditorItalic,
  Underline: TextEditorUnderline,
  Strikethrough: TextEditorStrikethrough,
  OrderedList: TextEditorOrderedList,
  UnorderedList: TextEditorUnorderedList,
  Link: TextEditorLink,
});
