import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";

const tintColorLight = "#5684E0";
const tintColorDark = "#5684E0";

export default {
  light: {
    text: "#000",
    background: "#F8F9FA",
    tint: tintColorLight,
    // tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    // tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};

// export const theme = createTheme({
//   lightColors: {
//     primary: "#5684E0", // Primary color
//     accent: "#FF4081", // Accent color
//     surface: "#F5F5F5", // Surface color (cards, dialogs, etc.)
//     text: "#333", // Text color
//     textSecondary: "#959595", // Secondary text color
//     disabled: "rgba(0, 0, 0, 0.38)", // Disabled elements color
//     placeholder: "rgba(0, 0, 0, 0.54)", // Placeholder text color
//     background: "#F8F9FA",
//     tint: tintColorLight,
//     tabIconDefault: "#ccc",
//     tabIconSelected: tintColorLight,
//     border: "#E3E3E3",
//     notification: "#FF80AB",
//   },
//   darkColors: {
//     primary: "#212121", // Primary color
//     accent: "#FF4081", // Accent color
//     background: "#121212", // Background color
//     surface: "#1E1E1E", // Surface color (cards, dialogs, etc.)
//     text: "#ccc", // Text color
//     textSecondary: "#828282", // Secondary text color
//     disabled: "rgba(255, 255, 255, 0.38)", // Disabled elements color
//     placeholder: "rgba(255, 255, 255, 0.54)", // Placeholder text color
//     tint: "#FEFEFE",
//     tabIconDefault: "#ccc",
//     tabIconSelected: tintColorDark,
//     border: "#E3E3E3",
//     notification: "#FF80AB",
//   },
//   mode: "light",
//   components: {
//     Button: (props, theme) => ({
//       // Props
//       titleStyle: {
//         color: theme.colors.text,
//       },
//     }),
//     Text: (props, theme) => ({
//       style: {
//         color: theme.colors.text,
//       },
//     }),
//   },
// });

export const lightTheme = {
  ...DefaultTheme,
  ...MD3LightTheme,
  roundness: 2,
  mode: "light",
  colors: {
    ...DefaultTheme.colors,
    primary: "#5684E0", // Primary color
    accent: "#FF4081", // Accent color
    surface: "#F5F5F5", // Surface color (cards, dialogs, etc.)
    text: "#333", // Text color
    textSecondary: "#959595", // Secondary text color
    disabled: "rgba(0, 0, 0, 0.38)", // Disabled elements color
    placeholder: "rgba(0, 0, 0, 0.54)", // Placeholder text color
    background: "#F8F9FA",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    border: "#E3E3E3",
    notification: "#FF80AB",
    white: "#fff",
  },
};

export const DarkTheme = {
  ...DefaultTheme,
  ...MD3DarkTheme,
  roundness: 2,
  mode: "dark",
  colors: {
    ...DefaultTheme.colors,
    primary: "#212121", // Primary color
    accent: "#FF4081", // Accent color
    background: "#121212", // Background color
    surface: "#1E1E1E", // Surface color (cards, dialogs, etc.)
    text: "#ccc", // Text color
    textSecondary: "#828282", // Secondary text color
    disabled: "rgba(255, 255, 255, 0.38)", // Disabled elements color
    placeholder: "rgba(255, 255, 255, 0.54)", // Placeholder text color
    tint: "#FEFEFE",
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    border: "#E3E3E3",
    notification: "#FF80AB",
    white: "#fff",
  },
};
