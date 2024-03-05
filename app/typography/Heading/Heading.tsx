import type { DOMProps } from "@react-types/shared";
import classNames from "classnames";
import * as React from "react";
import { heading } from "./Heading.css";

type Levels = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends DOMProps {
  /**
   * Heading content
   */
  children: React.ReactNode;
  /**
   * Sets heading level, h1 through h4
   * @default 3
   */
  level?: Levels;
  /**
   * Sets the visual style of the heading
   * defaults to the level property
   * @default 3
   */
  scale?: Levels;
}

/**
 * Heading is used to create the different heading levels of the typographic hierarchy
 */
export function Heading(props: HeadingProps) {
  const { children, level = 3, scale = level, ...otherProps } = props;

  const HeadingTag = `h${level}` as React.ElementType;

  return (
    <HeadingTag
      className={classNames(heading.container, heading.variants.scales[scale])}
      {...otherProps}
    >
      {children}
    </HeadingTag>
  );
}
