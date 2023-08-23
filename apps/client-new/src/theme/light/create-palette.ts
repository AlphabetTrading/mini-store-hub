import { common } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import { error, info, neutral, success, warning, indigo } from "../colors";
import { getPrimary } from "../utils";

export const createPalette = (config: any) => {
  const { colorPreset, contrast } = config;
  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12),
    },
    background: {
      default: contrast === "high" ? neutral[50] : common.white,
      paper: common.white,
    },
    divider: "#F2F4F7",
    error,
    info,
    mode: "light",
    neutral50: neutral[50],
    neutral100: neutral[100],
    neutral200: neutral[200],
    neutral300: neutral[300],
    neutral400: neutral[400],
    neutral500: neutral[500],
    neutral600: neutral[600],
    neutral700: neutral[700],
    neutral800: neutral[800],
    neutral900: neutral[900],
    neutral,
    indigo,
    primary: getPrimary(colorPreset),
    success,
    text: {
      primary: neutral[900],
      secondary: neutral[500],
      disabled: alpha(neutral[900], 0.38),
    },
    warning,
  };
};
