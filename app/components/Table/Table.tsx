import type { TableProps as ReactAriaTableProps } from "react-aria-components";
import { Table as ReactAriaTable } from "react-aria-components";
import { table } from "./Table.css";
import { TableBody } from "./TableBody";
import { TableCell } from "./TableCell";
import { TableCheckbox } from "./TableCheckbox";
import { TableColumn } from "./TableColumn";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

export type TableProps = ReactAriaTableProps;

export function Table(props: TableProps) {
  const { children, ...otherProps } = props;

  return (
    <ReactAriaTable {...otherProps} className={table.container}>
      {children}
    </ReactAriaTable>
  );
}

Table.Header = TableHeader;
Table.Column = TableColumn;
Table.Checkbox = TableCheckbox;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Body = TableBody;
