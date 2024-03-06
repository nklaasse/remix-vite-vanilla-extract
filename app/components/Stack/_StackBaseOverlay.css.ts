import { breakpoints, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { stackBase } from "./_StackBase.css";

const borderRadius = `min(${theme.radii[2]}, ${calc.multiply(
  stackBase.vars.stack.count,
  theme.radii[2]
)})`;

const stackBaseOverlayContainer = style({
  justifySelf: "flex-end",

  width: theme.sizes.full,
  height: theme.sizes.full,

  borderStartStartRadius: borderRadius,
  borderStartEndRadius: borderRadius,

  background: theme.colors.gray[1],

  transformOrigin: "top center",
  transform: `translateY(${stackBase.vars.__internal.translateY}) scale(${stackBase.vars.__internal.scale})`,

  boxSizing: "border-box",

  overflow: "hidden",

  selectors: {
    [`${stackBase.variants.type.modal} &`]: {
      height: "auto",

      "@media": {
        [breakpoints.medium]: {
          marginInline: theme.space[2],
          marginBlock: "auto",

          maxWidth: theme.sizes.content,

          borderRadius: theme.radii[2],

          alignSelf: "center",

          maxHeight: "90%",
        },
      },
    },
  },
});

export const stackBaseOverlay = {
  container: stackBaseOverlayContainer,
};

const stackScreenContentContainer = style({
  height: theme.sizes.full,
});

export const stackScreenContent = {
  container: stackScreenContentContainer,
};
