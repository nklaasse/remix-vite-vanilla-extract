import { listTitle } from "./ListTitle.css";

export type ListTitleProps = {
  children: string;
};

export function ListTitle(props: ListTitleProps) {
  const { children } = props;

  return <strong className={listTitle.container}>{children}</strong>;
}
