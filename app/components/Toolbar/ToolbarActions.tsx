import type { ActionGroupProps } from "~/components/ActionGroup";
import { ActionGroup } from "~/components/ActionGroup";
import * as React from "react";
import { ElementTypeProvider } from "./Toolbar";
import { toolbarActions } from "./ToolbarActions.css";

export type ToolbarActionsProps<T extends object> = ActionGroupProps<T>;

export function ToolbarActions<T extends object>(
  props: ToolbarActionsProps<T>
) {
  const { children, ...otherProps } = props;

  return (
    <ElementTypeProvider type="actions">
      <div className={toolbarActions.container}>
        {/** The type casting is incorrect, but don't have time to investigate - Famous last words... */}
        <ActionGroup {...otherProps}>{children as React.ReactNode}</ActionGroup>
      </div>
    </ElementTypeProvider>
  );
}
