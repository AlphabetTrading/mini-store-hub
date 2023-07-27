import {
  useRootNavigation,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import React, { useContext, createContext, useEffect, useState } from "react";
import { apolloClient } from "@/graphql/apolloClient";
import { LOGIN_MUTATION } from "@/graphql/mutations/authMutations";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    phone: string;
    role: string;
  };
}
// Define the AuthContextValue interface
interface SignInResponse {
  data: AuthState | undefined;
  error: Error | undefined;
}

interface SignOutResponse {
  error: any | undefined;
  data: {} | undefined;
}

interface AuthContextValue {
  signIn: (e: string, p: string) => Promise<SignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  authState: AuthState | undefined | null;
}

// Define the Provider component
interface ProviderProps {
  children: React.ReactNode;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthContextProvider(props: ProviderProps) {
  const [authState, setAuth] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // get user from async storage, and set it to state
  useEffect(() => {
    const fetchData = async () => {
      const localState = await AsyncStorage.getItem("login");
      if (localState) {
        setAuth(JSON.parse(localState));
      }
    };
    if (!authState) {
      fetchData();
    }
  }, []);

  // This hook will protect the route access based on user authentication.
  const useProtectedRoute = (authState: AuthState | null) => {
    const segments = useSegments();
    const router = useRouter();

    const navigationState = useRootNavigationState();

    useEffect(() => {
      // checking that navigation is all good;
      if (!navigationState?.key) return;

      const inAuthGroup = segments[0] === "(auth)";
      if (
        // If the user is not signed in and the initial segment is not anything in the auth group.
        !authState &&
        !inAuthGroup
      ) {
        router.replace("/login");
      } else if (authState && inAuthGroup) {
        router.replace("/(tabs)/");
      }
    }, [authState, segments, navigationState?.key]);
  };

  /**
   *
   * @returns
   */
  const logout = async (): Promise<SignOutResponse> => {
    try {
      await AsyncStorage.removeItem("login");
      setAuth(null);
      return { error: undefined, data: true };
    } catch (error) {
      return { error, data: undefined };
    } finally {
      setAuth(null);
    }
  };

  /**
   *
   * @param username
   * @param password
   * @returns
   */
  const login = async (
    username: string,
    password: string
  ): Promise<SignInResponse> => {
    try {
      const client = apolloClient(null);
      const res = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          data: {
            username: "admin",
            password: "secret42",
          },
        },
      });
      await AsyncStorage.setItem("login", JSON.stringify(res.data.login));
      setAuth(res.data.login);
      return { data: res.data.login, error: undefined };
    } catch (error) {
      setAuth(null);
      return { error: error as Error, data: undefined };
    }
  };

  useProtectedRoute(authState);

  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signOut: logout,
        authState,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// Define the useAuth hook
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return authContext;
};
