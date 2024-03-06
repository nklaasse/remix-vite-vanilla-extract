import * as React from "react";
import type { Node } from "react-stately";
import { listBoxSection } from "./ListBoxSection.css";

export type ListBoxSectionProps<T> = {
  item: Node<T>;
  children: React.ReactNode;
};

/**
 * ListBoxSection can be used to split ListBoxItem's in different groups
 */
export function ListBoxSection<T>(props: ListBoxSectionProps<T>) {
  const { item, children } = props;

  return (
    <li className={listBoxSection.container}>
      <strong className={listBoxSection.label}>{item.rendered}</strong>
      <ul className={listBoxSection.content}>{children}</ul>
    </li>
  );
}
