import { createContext, useContext, useState } from "react";

interface LoadingContextProps {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

type Props = {
  children: React.ReactNode;
};

export const LoadingContext = createContext<LoadingContextProps | undefined>({
  loading: false,
  setLoading: (value: boolean) => {},
});

export const LoadingContextProvider = (props: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {props.children}
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
