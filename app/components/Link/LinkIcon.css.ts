import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const linkIconContainer = style({
  position: "relative",

  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",

  selectors: {
    [`&:last-child:not(:first-child)`]: {
      marginInlineStart: theme.space[1],
    },

    [`&:first-child:not(:last-child)`]: {
      marginInlineEnd: theme.space[1],
    },

    "&:after": {
      content: "0",

      textIndent: "-9999px",

      marginInlineEnd: "-100%",

      boxSizing: "border-box",

      width: theme.sizes.icon,
    },
  },
});

const linkIconIcon = style({
  position: "absolute",
  inset: theme.space[0],

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const linkIcon = {
  container: linkIconContainer,
  icon: linkIconIcon,
};
