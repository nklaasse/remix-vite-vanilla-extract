import { mixins } from "~/css";
import { style } from "@vanilla-extract/css";
import { listBox } from "./ListBox.css";

const listBoxDescriptionContainer = style({
  ...mixins.typography.caption,

  display: "none",

  overflow: "hidden",
  textOverflow: "ellipsis",

  gridArea: "description",

  selectors: {
    [`${listBox.container} &`]: {
      display: "inline",
    },
  },
});

export const listBoxDescription = {
  container: listBoxDescriptionContainer,
};
