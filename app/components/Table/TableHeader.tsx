import type { TableHeaderProps as ReactAriaTableHeaderProps } from "react-aria-components";
import { TableHeader as ReactAriaTableHeader } from "react-aria-components";

export type TableHeaderProps<T> = ReactAriaTableHeaderProps<T>;

export function TableHeader<T extends object>(props: TableHeaderProps<T>) {
  const { children, ...otherProps } = props;

  return (
    <ReactAriaTableHeader {...otherProps}>{children}</ReactAriaTableHeader>
  );
}
