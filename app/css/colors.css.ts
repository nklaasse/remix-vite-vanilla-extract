import { createThemeContract } from "@vanilla-extract/css";
// Vanilla-extract plugin crashes when importing diffently
import * as _global from "./_global.css";

const color = createThemeContract(_global.global.colors.light.brand);

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
