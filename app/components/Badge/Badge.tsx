import classnames from "classnames";
import * as React from "react";
import { badge } from "./Badge.css";

export type BadgeProps = {
  /**
   * The content to display in the badge.
   */
  children: React.ReactNode;
  /**
   *
   * The variant changes the background color of the badge. When badge has a semantic meaning, they should use the variant for semantic colors.
   *
   * @default 'brand'
   */
  variant?: keyof typeof badge.variants.variant;
};

/**
 * Badges are used for showing a small amount of color-categorized metadata, ideal for getting a user's attention.
 */
export function Badge(props: BadgeProps) {
  const { children, variant = "brand" } = props;

  return (
    <div
      className={classnames(badge.container, badge.variants.variant[variant])}
    >
      <span className={badge.text}>{children}</span>
    </div>
  );
}
