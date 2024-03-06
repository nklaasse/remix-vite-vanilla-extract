import classnames from "classnames";
import * as React from "react";
import { infoAlert } from "./InfoAlert.css";
import { InfoAlertDescription } from "./InfoAlertDescription";
import { InfoAlertTitle } from "./InfoAlertTitle";

export type InfoAlertProps = {
  /**
   * A InfoAlert.Description and optional InfoAlert.Title and InfoAlert.Close
   */
  children: React.ReactNode;
  /**
   * The type of alert
   *
   * @default info
   */
  type?: keyof typeof infoAlert.variants.type;
};

/**
 * A Info alert is used to alert users to a particular section of the screen.
 */
export function InfoAlert(props: InfoAlertProps) {
  const { children, type = "info" } = props;

  return (
    <section
      role="alert"
      className={classnames(infoAlert.container, {
        [infoAlert.variants.type[type]]: type,
      })}
    >
      {children}
    </section>
  );
}

InfoAlert.Description = InfoAlertDescription;
InfoAlert.Title = InfoAlertTitle;
