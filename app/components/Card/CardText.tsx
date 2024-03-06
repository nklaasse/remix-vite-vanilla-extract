import { cardText } from "./CardText.css";

type CardTextProps = {
  children: React.ReactNode;
};

export function CardText(props: CardTextProps) {
  const { children } = props;
  return <span className={cardText.container}>{children}</span>;
}
