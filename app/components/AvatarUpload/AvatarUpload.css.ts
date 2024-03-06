import { createVar, style } from "@vanilla-extract/css";

const avatarUploadTranslateX = createVar();
const avatarUploadTranslateY = createVar();
const avatarUploadScale = createVar();

const avatarUploadVars = {
  translateX: avatarUploadTranslateX,
  translateY: avatarUploadTranslateY,
  scale: avatarUploadScale,
};

const avatarUploadContainer = style({});

export const avatarUpload = {
  container: avatarUploadContainer,

  vars: avatarUploadVars,
};
