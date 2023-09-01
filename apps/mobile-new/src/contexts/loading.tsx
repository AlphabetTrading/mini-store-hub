import { createContext, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import AsyncStorageUtils from "../utils/async_storage";
import { useAppTheme } from "./preference";

interface LoadingContextProps {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

type Props = {
  children: React.ReactNode;
};

export const LoadingContext = createContext<LoadingContextProps | undefined>({
  loading: false,
  setLoading: (value: boolean) => { },
});
import * as SecureStore from "expo-secure-store";
export const LoadingContextProvider = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const { toggleTheme, theme } = useAppTheme();

  useEffect(() => {
    const fetchTheme = async () => {
      const savedTheme = await AsyncStorageUtils.getItem("savedTheme");
      if (!savedTheme) {
        await AsyncStorageUtils.setItem("savedTheme", { mode: theme.mode });
      } else {
        if (savedTheme.mode !== theme.mode) toggleTheme();
      }
    };

    fetchTheme();
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading ? <Loading /> : props.children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const loadingContext = useContext(LoadingContext);

  if (!loadingContext) {
    throw new Error("useloading must be used within an loadingContextProvider");
  }

  return loadingContext;
};
