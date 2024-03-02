import { createThemeContract } from "@vanilla-extract/css";
import { global } from "./_global.css";

const color = createThemeContract(global.colors.light.brand);

export const accents = createThemeContract({
  neutral: color,
  brand: color,
  selection: color,

  indigo: color,
  tomato: color,
  yellow: color,
  amber: color,
});

export const base = createThemeContract({
  brand: color,
  error: color,
  success: color,
  selection: color,

  gray: color,
  overlay: color,

  accent: color,
});
