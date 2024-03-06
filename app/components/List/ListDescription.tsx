import { listDescription } from "./ListDescription.css";

export type ListDescriptionProps = {
  children: string;
};

export function ListDescription(props: ListDescriptionProps) {
  const { children } = props;

  return <div className={listDescription.container}>{children}</div>;
}
