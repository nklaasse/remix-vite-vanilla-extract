import React from "react";
import { CardContext } from "./Card";
import { cardHeading } from "./CardHeading.css";

type CardHeadingProps = {
  level: 2 | 3 | 4 | 5 | 6;
  children: string | React.ReactElement;
};

export function CardHeading(props: CardHeadingProps) {
  const { level = 2, children } = props;
  const HeadingTag = `h${level}` as React.ElementType;
  const context = React.useContext(CardContext);
  const { headingRef } = context.refs;

  return (
    <HeadingTag ref={headingRef} className={cardHeading.container}>
      {children}
    </HeadingTag>
  );
}
