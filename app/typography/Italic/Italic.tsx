import React from "react";
import { italic } from "./Italic.css";

export type ItalicProps = {
  /**
   * Italic content
   */
  children: React.ReactNode;
};

/**
 * Italic returns an styled Idiomatic Text element
 */
export const Italic = function (props: ItalicProps) {
  const { children } = props;

  return <i className={italic}>{children}</i>;
};
