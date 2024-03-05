import { listItem } from "./ListItem.css";

export type ListItemProps = {
  /**
   * ListItem content
   */
  children: React.ReactNode;
};

/**
 * ListItem returns an styled List Item element
 */
export function ListItem(props: ListItemProps) {
  const { children } = props;

  return <li className={listItem}>{children}</li>;
}
