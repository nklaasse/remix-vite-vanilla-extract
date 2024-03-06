import { cardImg } from "./CardImage.css";

type CardImageProps = {
  url: string;
};

export function CardImage(props: CardImageProps) {
  const { url } = props;

  return <img src={url} className={cardImg.container} alt="" />;
}
