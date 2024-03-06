import { createElementTypeContext } from "~/components/ElementType";
import * as React from "react";
import { toolbar } from "./Toolbar.css";
import { ToolbarActions } from "./ToolbarActions";
import { ToolbarGroup } from "./ToolbarGroup";
import { ToolbarIcon } from "./ToolbarIcon";
import { ToolbarItem } from "./ToolbarItem";
import { ToolbarLabel } from "./ToolbarLabel";

export type ToolbarProps = {
  children: React.ReactNode;
};

export const { ElementTypeProvider, useElementType } = createElementTypeContext<
  "toolbar" | "button" | "actions"
>();

export function Toolbar(props: ToolbarProps) {
  const { children } = props;

  return (
    <ElementTypeProvider type="toolbar">
      <div className={toolbar.container}>{children}</div>
    </ElementTypeProvider>
  );
}

Toolbar.Group = ToolbarGroup;
Toolbar.Actions = ToolbarActions;
Toolbar.Button = ToolbarItem;
Toolbar.Label = ToolbarLabel;
Toolbar.Item = ToolbarItem;
Toolbar.Icon = ToolbarIcon;
