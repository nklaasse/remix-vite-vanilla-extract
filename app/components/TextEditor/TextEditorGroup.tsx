import React from "react";
import { textEditorGroup } from "./TextEditorGroup.css";

type TextEditorGroupProps = {
  children: React.ReactNode;
};

/**
 * TextEditorGroup is used to group together ToolbarItems in a TextEditorToolbar
 */
export function TextEditorGroup(props: TextEditorGroupProps) {
  const { children } = props;

  return <div className={textEditorGroup.container}>{children}</div>;
}
