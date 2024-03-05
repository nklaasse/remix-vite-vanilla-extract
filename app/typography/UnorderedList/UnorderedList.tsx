import { unorderedList } from "./UnorderedList.css";

export type UnorderedListProps = {
  /**
   * UnorderedList content
   */
  children: React.ReactNode;
};

/**
 * UnorderedList returns an styled Unordered List element
 */
export function UnorderedList(props: UnorderedListProps) {
  const { children } = props;

  return <ul className={unorderedList}>{children}</ul>;
}
