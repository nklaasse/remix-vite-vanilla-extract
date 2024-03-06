import { mixins } from "~/css";
import { style } from "@vanilla-extract/css";

const menuDescriptionContainer = style({
  ...mixins.typography.compact,

  display: "inline",

  overflow: "hidden",
  textOverflow: "ellipsis",

  whiteSpace: "nowrap",

  width: "max-content",

  gridArea: "description",
});

export const menuDescription = {
  container: menuDescriptionContainer,
};
