import React from "react";
import { cardMeta } from "./CardMeta.css";

type CardMetaProps = {
  children: React.ReactNode;
};

export function CardMeta(props: CardMetaProps) {
  const { children } = props;
  return <div className={cardMeta.container}>{children}</div>;
}
