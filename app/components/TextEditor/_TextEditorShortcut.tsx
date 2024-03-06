import * as React from "react";
import { textEditorShortcut } from "./_TextEditorShortcut.css";

type TextEditorShortcutProps = {
  children: Array<string>;
};

/**
 * @private
 *
 * Display keyboard shortcuts in the text editor
 */
export function TextEditorShortcut(props: TextEditorShortcutProps) {
  const { children } = props;

  return (
    <div className={textEditorShortcut.container}>
      {React.Children.map(children, (key) => (
        <kbd key={key} className={textEditorShortcut.shortcut}>
          {key}
        </kbd>
      ))}
    </div>
  );
}
