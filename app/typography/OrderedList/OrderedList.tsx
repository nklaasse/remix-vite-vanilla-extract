import { orderedList } from "./OrderedList.css";

export type OrderedListProps = {
  /**
   * OrderedList content
   */
  children: React.ReactNode;
};

/**
 * OrderedList returns an styled Ordered List element
 */
export function OrderedList(props: OrderedListProps) {
  const { children } = props;

  return <ol className={orderedList}>{children}</ol>;
}
