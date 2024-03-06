import type {
  ActionMenuMenuProps,
  ActionMenuProps,
} from "~/components/ActionMenu";
import { ActionMenu } from "~/components/ActionMenu";
import { documentActions } from "./DocumentActions.css";

export type DocumentActionsProps<T> = ActionMenuMenuProps<T> & ActionMenuProps;

export function DocumentActions<T extends object>(
  props: DocumentActionsProps<T>
) {
  const { children, items, ...otherProps } = props;

  return (
    <div className={documentActions.container}>
      <ActionMenu {...otherProps}>
        <ActionMenu.Button />
        <ActionMenu.Menu items={items}>{children}</ActionMenu.Menu>
      </ActionMenu>
    </div>
  );
}
