import React from "react";
import { cardAuthor } from "./CardAuthor.css";

type CardAuthorProps = {
  children: React.ReactNode;
};

export function CardAuthor(props: CardAuthorProps) {
  const { children } = props;
  return <footer className={cardAuthor.container}>{children}</footer>;
}
