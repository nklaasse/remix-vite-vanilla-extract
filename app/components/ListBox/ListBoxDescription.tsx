import { listBoxDescription } from "./ListBoxDescription.css";

export type ListBoxDescriptionProps = {
  /**
   * The content to display as the description
   */
  children: string;
};

/**
 * ListBoxDescription renders an aditional optional description to the item
 */
export function ListBoxDescription(props: ListBoxDescriptionProps) {
  const { children } = props;

  return <span className={listBoxDescription.container}>{children}</span>;
}
