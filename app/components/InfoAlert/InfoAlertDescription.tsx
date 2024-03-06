import * as React from "react";
import { infoAlertDescription } from "./InfoAlertDescription.css";

type InfoAlertDescriptionProps = {
  /**
   * The content of the InfoAlert
   */
  children: React.ReactNode;
};

export function InfoAlertDescription(props: InfoAlertDescriptionProps) {
  const { children } = props;

  return <p className={infoAlertDescription.container}>{children}</p>;
}
