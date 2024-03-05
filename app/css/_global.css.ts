import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";
import {
  absoluteSizes,
  borderWidths,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii,
  relativeSizes,
  space,
} from "./_tokens.css";

const toRem = (v: number) => `${v}rem`;
const toEm = (v: number) => `${v}em`;
const toPx = (v: number) => `${v}px`;
const toPercentage = (v: number) => `${v * 100}%`;
const toUnitLess = (v: number | string) => `${v}`;
const toNull = (_: number | string) => null;

const mapValues = <T extends object, R>(
  obj: T,
  iteratee: (value: T[keyof T]) => R
): { [P in keyof T]: R } => {
  const result: Partial<{ [P in keyof T]: R }> = {};

  for (const key in obj) {
    result[key] = iteratee(obj[key]);
  }

  return result as { [P in keyof T]: R };
};

export const global = createThemeContract({
  colors: {
    dark: {
      brand: mapValues(colors.dark.tomato, toNull),
      error: mapValues(colors.dark.red, toNull),
      success: mapValues(colors.dark.grass, toNull),
      selection: mapValues(colors.dark.indigo, toNull),
      gray: mapValues(colors.dark.gray, toNull),
      overlay: mapValues(colors.dark.overlay, toNull),
      indigo: mapValues(colors.dark.indigo, toNull),
      tomato: mapValues(colors.dark.tomato, toNull),
      yellow: mapValues(colors.dark.yellow, toNull),
      amber: mapValues(colors.dark.amber, toNull),
    },
    light: {
      brand: mapValues(colors.light.tomato, toNull),
      error: mapValues(colors.light.red, toNull),
      success: mapValues(colors.light.grass, toNull),
      selection: mapValues(colors.light.indigo, toNull),
      gray: mapValues(colors.light.gray, toNull),
      overlay: mapValues(colors.light.overlay, toNull),
      indigo: mapValues(colors.light.indigo, toNull),
      tomato: mapValues(colors.light.tomato, toNull),
      yellow: mapValues(colors.light.yellow, toNull),
      amber: mapValues(colors.light.amber, toNull),
    },
  },
  fonts: mapValues(fonts, toNull),
  fontWeights: mapValues(fontWeights, toNull),
  fontSizes: mapValues(fontSizes, toNull),
  lineHeights: mapValues(lineHeights, toNull),
  letterSpacings: mapValues(letterSpacings, toNull),
  space: mapValues(space, toNull),
  sizes: {
    ...mapValues(absoluteSizes, toNull),
    ...mapValues(relativeSizes, toNull),
  },
  radii: mapValues(radii, toNull),
  borderWidths: mapValues(borderWidths, toNull),
});

createGlobalTheme(":root", global, {
  colors: {
    dark: {
      brand: mapValues(colors.dark.tomato, toUnitLess),
      error: mapValues(colors.dark.red, toUnitLess),
      success: mapValues(colors.dark.grass, toUnitLess),
      selection: mapValues(colors.dark.indigo, toUnitLess),
      gray: mapValues(colors.dark.gray, toUnitLess),
      overlay: mapValues(colors.dark.overlay, toUnitLess),
      indigo: mapValues(colors.dark.indigo, toUnitLess),
      tomato: mapValues(colors.dark.tomato, toUnitLess),
      yellow: mapValues(colors.dark.yellow, toUnitLess),
      amber: mapValues(colors.dark.amber, toUnitLess),
    },
    light: {
      brand: mapValues(colors.light.tomato, toUnitLess),
      error: mapValues(colors.light.red, toUnitLess),
      success: mapValues(colors.light.grass, toUnitLess),
      selection: mapValues(colors.light.indigo, toUnitLess),
      gray: mapValues(colors.light.gray, toUnitLess),
      overlay: mapValues(colors.light.overlay, toUnitLess),
      indigo: mapValues(colors.light.indigo, toUnitLess),
      tomato: mapValues(colors.light.tomato, toUnitLess),
      yellow: mapValues(colors.light.yellow, toUnitLess),
      amber: mapValues(colors.light.amber, toUnitLess),
    },
  },
  fonts: mapValues(fonts, toUnitLess),
  fontWeights: mapValues(fontWeights, toUnitLess),
  fontSizes: mapValues(fontSizes, toRem),
  lineHeights: mapValues(lineHeights, toUnitLess),
  letterSpacings: mapValues(letterSpacings, toEm),
  space: mapValues(space, toPx),
  sizes: {
    ...mapValues(absoluteSizes, toPx),
    ...mapValues(relativeSizes, toPercentage),
  },
  radii: mapValues(radii, toPx),
  borderWidths: mapValues(borderWidths, toPx),
});
