import classNames from "classnames";
import React from "react";
import { paragraph } from "./Paragraph.css";

export type ParagraphProps = {
  /**
   * Paragraph content
   */
  children: React.ReactNode;
  /**
   * Sets the visual style of the paragraph
   * @default "default"
   */
  variant?: "intro" | "compact" | "default";
};

export const Paragraph = React.forwardRef(function Paragraph(
  props: ParagraphProps,
  ref: React.Ref<HTMLParagraphElement>
) {
  const { children, variant = "default" } = props;

  return (
    <p
      className={classNames([paragraph.container, paragraph.variants[variant]])}
      ref={ref}
    >
      {children}
    </p>
  );
});
