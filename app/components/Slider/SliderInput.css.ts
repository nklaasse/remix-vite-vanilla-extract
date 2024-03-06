import { mixins, theme } from "~/css";
import { createVar, style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const thumbIsHovered = style({});
const thumbIsDragging = style({});
const thumbIsFocusVisible = style({});
const thumbIsFocused = style({});

const thumbStates = {
  isDragging: thumbIsDragging,
  isFocusVisible: thumbIsFocusVisible,
  isHovered: thumbIsHovered,
  isFocused: thumbIsFocused,
};

const min = (...operands: Array<string>) => `min(${operands.join(", ")})`;
const max = (...operands: Array<string>) => `max(${operands.join(", ")})`;

const thumbBase = style({
  position: "absolute",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: calc.add(
    theme.space[4],
    calc.multiply(
      calc.add(
        theme.borderWidths.border,
        theme.borderWidths.border,
        theme.borderWidths.delimiter
      ),
      2
    )
  ),
  height: calc.add(
    theme.space[4],
    calc.multiply(
      calc.add(
        theme.borderWidths.border,
        theme.borderWidths.border,
        theme.borderWidths.delimiter
      ),
      2
    )
  ),
});

const thumbContainer = style([
  thumbBase,
  {
    ...mixins.accents.brand,

    insetBlockStart: "50%",

    background: theme.colors.gray[1],

    borderRadius: theme.radii.circle,

    cursor: "grab",

    selectors: {
      "&:after": {
        content: "''",

        display: "block",

        width: theme.space[4],
        height: theme.space[4],

        margin: "auto",

        backgroundColor: theme.colors.accent[9],

        borderWidth: theme.borderWidths.border,
        borderColor: theme.colors.accent[10],
        borderStyle: "solid",

        borderRadius: theme.radii.circle,
      },

      [`&:is(${thumbIsHovered}, ${thumbIsFocused}, ${thumbIsDragging}):after`]:
        {
          backgroundColor: theme.colors.accent[10],

          borderColor: theme.colors.accent[11],
        },

      [`&:is(${thumbIsFocusVisible}):before`]: {
        content: "''",

        position: "absolute",
        inset: calc.multiply(
          calc.add(theme.borderWidths.delimiter, theme.borderWidths.border),
          1
        ),

        display: "block",

        borderRadius: "inherit",

        boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
      },
    },
  },
]);

export const thumb = {
  container: thumbContainer,

  states: thumbStates,
};

const sliderInputThumbPosition = createVar();
const sliderInputStartPosition = createVar();

const sliderInputVars = {
  thumbPosition: sliderInputThumbPosition,
  startPosition: sliderInputStartPosition,
};

const sliderInputIsHovered = style({});

const sliderInputStates = {
  isHovered: sliderInputIsHovered,
};

const sliderInputContainer = style({
  position: "relative",

  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  width: theme.sizes.full,
  height: calc.add(
    calc.multiply(theme.fontSizes.text, theme.lineHeights.text),
    calc.multiply(theme.space[2], 2)
  ),
});

const sliderInputBar = style({
  position: "absolute",

  display: "flex",

  height: theme.space[1],

  marginBlock: "auto",

  borderRadius: theme.radii.circle,

  overflow: "hidden",

  boxSizing: "border-box",
});

const sliderInputTrack = style([
  sliderInputBar,
  {
    backgroundColor: theme.colors.accent[4],

    insetInline: theme.space[0],
    width: theme.sizes.full,

    cursor: "pointer",
  },
]);

const sliderInputFill = style([
  sliderInputBar,
  {
    ...mixins.accents.brand,

    insetInlineStart: calc.multiply(
      min(sliderInputThumbPosition, sliderInputStartPosition),
      "1%"
    ),
    insetInlineEnd: calc.multiply(
      max(sliderInputThumbPosition, sliderInputStartPosition),
      "1%"
    ),

    width: calc.multiply(
      max(
        calc.subtract(sliderInputThumbPosition, sliderInputStartPosition),
        calc.subtract(sliderInputStartPosition, sliderInputThumbPosition)
      ),
      "1%"
    ),

    background: theme.colors.accent[7],

    cursor: "pointer",
  },
]);

export const sliderInput = {
  container: sliderInputContainer,
  track: sliderInputTrack,
  fill: sliderInputFill,

  vars: sliderInputVars,

  states: sliderInputStates,
};
