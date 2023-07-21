import { useColorScheme } from "react-native";
import { router, useSegments } from "expo-router";
import React from "react";

type Props = {};

const RootContext = React.createContext<
  | {
      user: any;
      setUser: any;
    }
  | any
>(null);

export function useAppContext() {
  return React.useContext(RootContext);
}

function useCurrentTheme() {}

function useProtectedRoute(user: any) {
  const segments = useSegments();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/login");
    } else if (user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, segments]);
}

export function RootProvider(props: any) {
  const [user, setUser] = React.useState({ user: "nati" });
  const [currentTheme, setCurrentTheme] = React.useState("light");

  useProtectedRoute(user);
  useCurrentTheme();

  console.log(user);

  return (
    <RootContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </RootContext.Provider>
  );
}
