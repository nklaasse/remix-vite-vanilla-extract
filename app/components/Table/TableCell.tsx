import classnames from "classnames";
import type { CellProps as ReactAriaCellProps } from "react-aria-components";
import { Cell as ReactAriaCell } from "react-aria-components";
import { tableCell } from "./TableCell.css";

export type TableCellProps = ReactAriaCellProps;

export function TableCell(props: TableCellProps) {
  const { children, ...otherProps } = props;

  return (
    <ReactAriaCell
      {...otherProps}
      className={(props) =>
        classnames(tableCell.container, {
          [tableCell.states.isFocusVisible]: props.isFocusVisible,
        })
      }
    >
      {children}
    </ReactAriaCell>
  );
}
