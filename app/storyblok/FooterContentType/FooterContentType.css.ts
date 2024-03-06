import { breakpoints, mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { absoluteSizes } from "~/css/_tokens";

// Footer ========
// ===============
const footerContainer = style({
  position: "relative",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const footerInnerContainer = style({
  ...mixins.typography.text,

  display: "flex",
  flexDirection: "column-reverse",
  alignItems: "center",

  maxInlineSize: absoluteSizes.contentContainer,
  inlineSize: theme.sizes.full,

  paddingBlock: theme.space["3.5"],
  paddingInline: theme.space["2"],

  "@media": {
    [breakpoints["medium"]]: {
      paddingBlock: calc.multiply(theme.space["5"], 4),
      paddingInline: theme.space["4"],
      flexDirection: "column",
    },
    [breakpoints["x-large"]]: {
      paddingInline: theme.space[0],
    },
  },
});

// color generated with https://codepen.io/sosuke/pen/Pjoqqp
const tintLogo = {
  filter:
    "invert(32%) sepia(58%) saturate(2255%) hue-rotate(345deg) brightness(88%) contrast(90%)",
};

// CTA Group ========
// ==================
const ctaBannerContainer = style({
  ...mixins.typography.text,

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  position: "relative",
  width: theme.sizes.full,

  background: "black",
  color: theme.colors.gray[1],

  textAlign: "center",

  paddingBlockStart: calc.multiply(theme.sizes["5"], 4),
  paddingBlockEnd: calc.multiply(theme.sizes["4"], 4.375),
  paddingInline: theme.space["2"],

  "@media": {
    [breakpoints["medium"]]: {
      paddingInline: theme.space["4"],
    },
  },
});

const ctaBannerInnerContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  width: theme.sizes["3/4"],

  zIndex: "1",

  "@media": {
    [breakpoints["large"]]: {
      width: calc.multiply(theme.sizes.content, 1.2),
    },
  },
});

const ctaBannerHeading = style({
  ...mixins.typography["heading-5"],

  marginBlockEnd: theme.space[2.5],

  "@media": {
    [breakpoints["small"]]: {
      ...mixins.typography["heading-4"],
    },
    [breakpoints["large"]]: {
      ...mixins.typography["heading-1"],
    },
  },
});

const ctaBannerSubtitle = style({
  width: "auto",
  marginBlockEnd: calc.multiply(theme.sizes["4"], 2),
  "@media": {
    [breakpoints["large"]]: {
      width: calc.multiply(theme.sizes.content, 0.8),
    },
  },
});

const ctaBannerCaption = style({
  display: "grid",
  gridAutoFlow: "column",
  gap: `0 ${theme.space["1"]}`,

  marginBlockStart: calc.multiply(theme.sizes["3"], 2),

  "@media": {
    [breakpoints["medium"]]: {
      alignItems: "center",
    },
  },
});

const ctaBannerCaptionIcon = style({
  ...mixins.accents.yellow,

  display: "flex",
  flexDirection: "column",
  justifyContent: "start",

  marginBlockStart: theme.space["0.5"],

  color: theme.colors.accent[9],

  "@media": {
    [breakpoints["medium"]]: {
      marginBlockStart: 0,
    },
  },
});

// Colored Shapes ========
// =======================
const hideShapeOnMobile = {
  display: "none",
  "@media": {
    [breakpoints["medium"]]: {
      display: "block",
    },
  },
};

const shapeContainer = style({
  position: "absolute",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  insetBlockStart: "0px",
  insetInlineStart: "0px",
});

const shape1 = style({
  position: "absolute",
  borderRadius: theme.radii.circle,

  width: calc.multiply(theme.sizes["2.5"], 4),
  height: calc.multiply(theme.sizes["2.5"], 4),

  insetBlockStart: "0%",
  insetInlineStart: "80%",

  transform: "translate(-50%,-20%)",

  background: theme.colors.brand[7],

  "@media": {
    [breakpoints["medium"]]: {
      transform: "translate(0,-20%)",
    },
  },
});

const shape2 = style({
  ...hideShapeOnMobile,

  position: "absolute",
  borderRadius: theme.radii.circle,

  width: calc.multiply(theme.sizes["4"], 4),
  height: calc.multiply(theme.sizes["4"], 4),

  insetBlockStart: "50%",
  insetInlineStart: "100%",

  transform: "translate(-50%,-50%)",

  background: theme.colors.gray[11],
});

const shape3 = style({
  ...mixins.accents.indigo,

  position: "absolute",
  borderRadius: theme.radii.circle,

  width: calc.multiply(theme.sizes["2.5"], 5),
  height: calc.multiply(theme.sizes["2.5"], 2.5),

  insetBlockStart: "100%",
  insetInlineStart: "85%",

  transform: "translate(0%,-75%) rotate(45deg)",

  background: theme.colors.accent[8],
});

const shape4 = style({
  ...mixins.accents.yellow,
  ...hideShapeOnMobile,

  position: "absolute",
  borderRadius: theme.radii.circle,

  width: calc.multiply(theme.sizes["4"], 5),
  height: calc.multiply(theme.sizes["4"], 2.5),

  insetBlockStart: "100%",
  insetInlineStart: "15%",

  transform: "translate(0%,-50%) rotate(-45deg)",

  background: theme.colors.accent[5],
});

const shape5 = style({
  ...hideShapeOnMobile,

  position: "absolute",
  borderRadius: theme.radii.circle,

  width: calc.multiply(theme.sizes["2.5"], 4),
  height: calc.multiply(theme.sizes["2.5"], 4),

  insetBlockStart: "50%",
  insetInlineStart: "7.5%",

  transform: "translate(0%,-50%)",

  background: theme.colors.gray[11],
});

const shape6 = style({
  ...hideShapeOnMobile,

  position: "absolute",
  borderRadius: theme.radii.circle,

  width: calc.multiply(theme.sizes["2.5"], 5),
  height: calc.multiply(theme.sizes["2.5"], 2.5),

  insetBlockStart: "10%",
  insetInlineStart: "0%",

  transform: "translate(-50%,0%) rotate(45deg)",

  background: theme.colors.gray[11],
});

// Footer top ========
// ===================

const footerTopInnerContainer = style({
  display: "flex",
  flexDirection: "column",

  maxWidth: absoluteSizes.page,
  width: "100%",

  marginBlockEnd: theme.space[0],

  "@media": {
    [breakpoints["medium"]]: {
      flexDirection: "row",
      marginBlockEnd: calc.multiply(theme.space["3.5"], 4),
    },
  },
});

// logo ----------
const footerTopLogoContainer = style({
  display: "none",

  textAlign: "center",

  "@media": {
    [breakpoints["medium"]]: {
      display: "block",
      width: theme.sizes["1/3"],
      textAlign: "start",
    },
    [breakpoints["large"]]: {
      width: theme.sizes["1/4"],
    },
  },
});

const footerTopLogo = style({
  width: calc.multiply(theme.sizes[4], 4),
  maxWidth: theme.sizes["3/4"],

  marginBlockEnd: theme.space["3.5"],

  ...tintLogo,
});

//links ----------
const footerTopLinksContainer = style({
  display: "grid",
  gridAutoFlow: "row",
  gap: `${theme.space["2"]} 0`,
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",

  width: theme.sizes.full,

  "@media": {
    [breakpoints["medium"]]: {
      gap: `${theme.space["2"]} ${theme.space["1"]}`,
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",

      width: theme.sizes["2/3"],
    },
    [breakpoints["large"]]: {
      gridAutoFlow: "column",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",

      width: theme.sizes["3/4"],
    },
  },
});

const footerTopCol = style({
  display: "flex",
  flexDirection: "column",

  paddingInline: theme.space[2],

  "@media": {
    [breakpoints["medium"]]: {
      paddingInline: theme.space[0],
    },
  },
});

const footerTopColTitle = style({
  ...mixins.typography.text,
  marginBlockEnd: theme.space[2.5],
  marginBlockStart: theme.space[0],

  fontWeight: "600",
});

const footerTopColList = style({
  listStyleType: "none",
  marginBlock: theme.space[0],
  paddingInline: theme.space[0],
});

const footerTopColItem = style({
  marginBlockEnd: theme.space["2"],
});

const footerTopColItemLink = style({
  color: theme.colors.gray[11],
  textDecoration: "none",
});

// Footer bottom ========
// ======================

const footerBottomContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "column",

  width: theme.sizes.full,

  marginBlockEnd: theme.space["3.5"],

  "@media": {
    [breakpoints["medium"]]: {
      flexDirection: "row",
      marginBlockEnd: theme.space[0],
    },
  },
});

const footerBottomCopyright = style({
  marginBlockStart: theme.space["0.5"],

  "@media": {
    [breakpoints["medium"]]: {
      marginBlockStart: theme.space[0],
    },
  },
});

const footerBottomLogo = style({
  display: "block",

  width: calc.multiply(theme.sizes[4], 4),

  "@media": {
    [breakpoints["medium"]]: {
      display: "none",
    },
  },

  ...tintLogo,
});

const footerBottomSocialIconContainer = style({
  display: "flex",
  flexDirection: "row",

  marginBlock: theme.space["2"],

  "@media": {
    [breakpoints["medium"]]: {
      marginBlock: theme.space[0],
    },
  },
});

const footerBottomSocialIcon = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: theme.space[4],
  height: theme.space[4],

  color: "black",
  background: theme.colors.gray[6],

  borderRadius: theme.radii.circle,

  selectors: {
    "&:not(:last-child)": {
      marginInlineEnd: theme.space["1"],
    },
    "&:hover": {
      background: theme.colors.gray[8],
    },
  },
});

// ======== ======== ========
export const footer = {
  container: footerContainer,
  innerContainer: footerInnerContainer,
};

export const ctaBanner = {
  container: ctaBannerContainer,
  innerContainer: ctaBannerInnerContainer,
  heading: ctaBannerHeading,
  subtitle: ctaBannerSubtitle,
  caption: ctaBannerCaption,
  captionIcon: ctaBannerCaptionIcon,
  shapeContainer: shapeContainer,
  shape1,
  shape2,
  shape3,
  shape4,
  shape5,
  shape6,
};

export const footerTop = {
  innerContainer: footerTopInnerContainer,
  logoContainer: footerTopLogoContainer,
  logo: footerTopLogo,
  linksContainer: footerTopLinksContainer,
  column: footerTopCol,
  columnTitle: footerTopColTitle,
  columnList: footerTopColList,
  columnListItem: footerTopColItem,
  columnListItemLink: footerTopColItemLink,
};

export const footerBottom = {
  container: footerBottomContainer,
  logo: footerBottomLogo,
  copyright: footerBottomCopyright,
  socialIconContainer: footerBottomSocialIconContainer,
  socialIcon: footerBottomSocialIcon,
};
