import type { TableBodyProps as ReactAriaTableBodyProps } from "react-aria-components";
import { TableBody as ReactAriaTableBody } from "react-aria-components";
import { tableBody } from "./TableBody.css";

export type TableBodyProps<T> = ReactAriaTableBodyProps<T>;

export function TableBody<T extends object>(props: TableBodyProps<T>) {
  const { children, renderEmptyState, ...otherProps } = props;

  return (
    <ReactAriaTableBody
      {...otherProps}
      renderEmptyState={
        renderEmptyState
          ? () => (
              <div className={tableBody.emptySlate}>{renderEmptyState()}</div>
            )
          : undefined
      }
    >
      {children}
    </ReactAriaTableBody>
  );
}
