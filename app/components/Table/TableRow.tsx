import classnames from "classnames";
import type { RowProps as ReactAriaRowProps } from "react-aria-components";
import { Row as ReactAriaRow } from "react-aria-components";
import { tableRow } from "./TableRow.css";

export type TableRowProps<T> = ReactAriaRowProps<T>;

export function TableRow<T extends object>(props: TableRowProps<T>) {
  const { children, ...otherProps } = props;

  return (
    <ReactAriaRow
      {...otherProps}
      className={(props) =>
        classnames(tableRow.container, {
          [tableRow.states.isFocusVisible]: props.isFocusVisible,
        })
      }
    >
      {children}
    </ReactAriaRow>
  );
}
