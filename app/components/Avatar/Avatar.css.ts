import { theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const avatarSizes = styleVariants({
  compact: {},
  default: {},
  intro: {},
});

const avatarVariants = {
  sizes: avatarSizes,
};

const avatarContainer = style({
  position: "relative",

  padding: theme.space[0.5],

  height: calc.multiply(theme.fontSizes.text, theme.lineHeights.text),
  width: calc.multiply(theme.fontSizes.text, theme.lineHeights.text),

  borderRadius: theme.radii.circle,

  boxSizing: "content-box",

  selectors: {
    [`&:is(${avatarVariants.sizes.compact})`]: {
      height: calc.multiply(theme.fontSizes.compact, theme.lineHeights.compact),
      width: calc.multiply(theme.fontSizes.compact, theme.lineHeights.compact),
    },
    [`&:is(${avatarVariants.sizes.intro})`]: {
      height: calc.multiply(theme.fontSizes.intro, theme.lineHeights.intro),
      width: calc.multiply(theme.fontSizes.intro, theme.lineHeights.intro),

      padding: theme.space[1],
    },
  },
});

const avatarImage = style({
  position: "absolute",
  inset: theme.space[0],

  borderRadius: theme.radii.circle,
  borderWidth: theme.borderWidths.border,
  borderColor: theme.colors.gray[7],
  borderStyle: "solid",

  width: theme.sizes.full,
  height: theme.sizes.full,
  backgroundColor: theme.colors.gray[3],

  objectFit: "cover",

  boxSizing: "border-box",
  // This prevents a broken image from being visible.
  textIndent: -9999,
});

export const avatar = {
  container: avatarContainer,
  image: avatarImage,

  variants: avatarVariants,
};
