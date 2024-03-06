import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const templateSelectPreviewContainer = style({
  display: "flex",

  position: "relative",

  width: theme.sizes.full,

  backgroundColor: theme.colors.accent[1],

  overflow: "hidden",

  ":before": {
    content: "''",

    display: "block",
    width: theme.sizes.full,

    // Aspect ratio of a a4
    paddingTop: `calc(${theme.sizes.full} * (297 / 210))`,
  },
});

const templateSelectPreviewImage = style({
  position: "absolute",
  inset: 0,

  width: theme.sizes.full,
  height: theme.sizes.full,
});

export const templateSelectPreview = {
  container: templateSelectPreviewContainer,
  image: templateSelectPreviewImage,
};
