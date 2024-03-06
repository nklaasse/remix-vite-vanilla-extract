import classNames from "classnames";
import React from "react";
import { mergeProps, useFocusRing, useHover, usePress } from "react-aria";
import { card } from "./Card.css";
import { CardAuthor } from "./CardAuthor";
import { CardAvatar } from "./CardAvatar";
import { CardHeading } from "./CardHeading";
import { CardImage } from "./CardImage";
import { CardMeta } from "./CardMeta";
import { CardText } from "./CardText";
export type CardContextValue = {
  refs: {
    headingRef: React.RefObject<HTMLHeadingElement>;
  };
};

export const CardContext = React.createContext<CardContextValue>({
  refs: {
    headingRef: React.createRef(),
  },
});

type CardProps = {
  children: React.ReactNode;
};

export function Card(props: CardProps) {
  const { children } = props;
  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing({ within: true });
  const headingRef = React.useRef<HTMLHeadingElement>(null!);

  const { pressProps } = usePress({
    onPress: () => {
      // Detect if the heading contains a link
      if (headingRef.current) {
        const anchorElement = headingRef.current.querySelector("a[href]");
        // If so get the link and call the click event on it
        if (anchorElement instanceof HTMLAnchorElement) {
          anchorElement.click();
        }
      }
    },
  });

  return (
    <CardContext.Provider
      value={{
        refs: {
          headingRef,
        },
      }}
    >
      <article
        {...mergeProps(pressProps, hoverProps, focusProps)}
        className={classNames(card.container, {
          [card.states.isCardHovered]: isHovered,
          [card.states.isCardFocusVisible]: isFocusVisible,
        })}
      >
        {children}
      </article>
    </CardContext.Provider>
  );
}

Card.Image = CardImage;
Card.Meta = CardMeta;
Card.Text = CardText;
Card.Heading = CardHeading;
Card.Author = CardAuthor;
Card.Avatar = CardAvatar;
