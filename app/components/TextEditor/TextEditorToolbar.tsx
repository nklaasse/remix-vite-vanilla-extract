import React from "react";
import { FocusScope } from "react-aria";
import { TextEditorContext } from "./TextEditor";
import { textEditorToolbar } from "./TextEditorToolbar.css";

export type TextEditorToolbarProps = {
  children: React.ReactChild[] | React.ReactChild;
};

type TextEditorToolbarContextValue = {
  state: {
    focusedElement: React.RefObject<HTMLElement> | null;
    setFocusedElement: React.Dispatch<
      React.SetStateAction<React.RefObject<HTMLElement> | null>
    >;
  };
};

export const TextEditorToolbarContext =
  React.createContext<TextEditorToolbarContextValue>(null!);

/**
 * TextEditorToolbar can only be used within a TextEditor and is used to add options to the toolbar
 */
export function TextEditorToolbar(props: TextEditorToolbarProps) {
  const [focusedElement, setFocusedElement] =
    React.useState<React.RefObject<HTMLElement> | null>(null);

  const ref = React.useRef<HTMLDivElement>(null);

  const { children } = props;
  const context = React.useContext(TextEditorContext);
  const { toolbarProps } = context.props;

  return (
    <TextEditorToolbarContext.Provider
      value={{
        state: {
          focusedElement,
          setFocusedElement,
        },
      }}
    >
      <FocusScope>
        <div
          className={textEditorToolbar.container}
          {...toolbarProps}
          ref={ref}
        >
          {children}
        </div>
      </FocusScope>
    </TextEditorToolbarContext.Provider>
  );
}
