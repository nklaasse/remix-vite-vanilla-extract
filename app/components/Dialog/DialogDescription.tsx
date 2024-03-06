import * as React from "react";
import { dialogDescription } from "./DialogDescription.css";

type DialogDescriptionProps = {
  children: React.ReactNode;
};

export function DialogDescription(props: DialogDescriptionProps) {
  const { children } = props;

  return <p className={dialogDescription.container}>{children}</p>;
}
