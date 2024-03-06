import classnames from "classnames";
import type { ColumnProps as ReactAriaColumnProps } from "react-aria-components";
import { Column as ReactAriaColumn } from "react-aria-components";
import { tableColumn } from "./TableColumn.css";

export type TableColumnProps = Omit<
  ReactAriaColumnProps,
  "className" | "style" | "children"
> & {
  children?: React.ReactNode;

  /**
   * The size of the column
   *
   * @default auto
   */
  size?: keyof typeof tableColumn.variants.size | `${number}px` | `${number}%`;
};

export function TableColumn(props: TableColumnProps) {
  const { children, size = "auto", ...otherProps } = props;

  return (
    <ReactAriaColumn
      {...otherProps}
      className={classnames(
        tableColumn.container,
        size in tableColumn.variants.size
          ? tableColumn.variants.size[
              size as keyof typeof tableColumn.variants.size
            ]
          : null
      )}
      style={
        !(size in tableColumn.variants.size)
          ? {
              width: size,
              minWidth: `min(${size}, fit-content)`,
              maxWidth: "min-content",
            }
          : undefined
      }
    >
      {children}
    </ReactAriaColumn>
  );
}
