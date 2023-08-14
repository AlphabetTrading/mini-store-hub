// preference context
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { PaperProvider } from "react-native-paper";
import { DarkTheme, lightTheme } from "../constants/Colors";

const PreferenceContext = createContext<{
  theme: AppTheme;
  toggleTheme: () => void;
}>({
  theme: lightTheme,
  toggleTheme: () => {},
});

export type AppTheme = typeof lightTheme | typeof DarkTheme;

export const useAppTheme = () => {
  const theme = useContext(PreferenceContext);

  if (!theme) {
    throw new Error("useAppTheme must be used within an AppThemeProvider");
  }

  return theme;
};

import { useColorScheme } from "react-native";
import AsyncStorageUtils from "../utils/async_storage";
export const PreferenceContextProvider = ({ children }: any) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const saveTheme = useCallback(async () => {
    await AsyncStorageUtils.setItem("theme", { mode: theme });
  }, [theme]);

  useEffect(() => {
    // set theme to async storage when theme changes
    saveTheme();
  }, [saveTheme]);

  return (
    <PreferenceContext.Provider
      value={{ theme: theme === "light" ? lightTheme : DarkTheme, toggleTheme }}
    >
      <PaperProvider
        theme={theme === "light" ? (lightTheme as any) : (DarkTheme as any)}
      >
        {children}
      </PaperProvider>
    </PreferenceContext.Provider>
  );
};
