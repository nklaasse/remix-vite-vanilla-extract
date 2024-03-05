import React from "react";
import { bold } from "./Bold.css";

export type BoldProps = {
  /**
   * Bold content
   */
  children: React.ReactNode;
};

/**
 * Bold returns an styled Bring Attention To element
 */
export const Bold = function (props: BoldProps) {
  const { children } = props;

  return <b className={bold}>{children}</b>;
};
