import { breakpoints, theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { stackBase } from "./_StackBase.css";

const stackBaseUnderlayStyle = styleVariants({
  blurred: {},
  transparent: {},
});

const stackBaseUnderlayVariants = {
  backdrop: stackBaseUnderlayStyle,
};

const stackBaseUnderlayContainer = style({
  position: "fixed",
  inset: 0,

  display: "flex",
  flexDirection: "column",

  backgroundColor: theme.colors.overlay[11],

  selectors: {
    [`${stackBase.variants.type.modal} &`]: {
      "@media": {
        [breakpoints.large]: {
          backgroundColor: theme.colors.overlay[10],
        },
      },
    },

    [`&${stackBaseUnderlayStyle.blurred}`]: {
      backdropFilter: "blur(3px)",

      "@media": {
        [breakpoints.large]: {
          backgroundColor: theme.colors.overlay[11],
        },
      },
    },
  },
});

export const stackBaseUnderlay = {
  container: stackBaseUnderlayContainer,

  variants: stackBaseUnderlayVariants,
};
