import * as React from "react";
import { infoAlertTitle } from "./InfoAlertTitle.css";

type InfoAlertTitleProps = {
  /**
   * The title (summary) of the InfoAlert
   */
  children: React.ReactNode;
};

export function InfoAlertTitle(props: InfoAlertTitleProps) {
  const { children } = props;

  return <h2 className={infoAlertTitle.container}>{children}</h2>;
}
