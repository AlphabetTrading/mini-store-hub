import React, { useContext, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apolloClient } from "../graphql/apolloClient";
import {
  ACCEPT_NOTIFICATION_MUTATION,
  LOGIN_MUTATION,
} from "../graphql/mutations/authMutations";

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
    retailShop: any[];
    allowsNotifications: boolean;
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
  setAuthState: React.Dispatch<React.SetStateAction<AuthState | null>>;
  updateNotificationToken: (
    authState: AuthState,
    token: string,
    device_type: string
  ) => Promise<any>;
}

// Define the Provider component
interface ProviderProps {
  children: React.ReactNode;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthContextProvider(props: ProviderProps) {
  const [authState, setAuthState] = useState<AuthState | null>(null);
  // get user from async storage, and set it to state
  useEffect(() => {
    const fetchData = async () => {
      const localState = await AsyncStorage.getItem("login");
      if (localState) {
        setAuthState(JSON.parse(localState));
      }
    };
    if (!authState) {
      fetchData();
    }
  }, []);

  /**
   *
   * @returns
   */
  const logout = async (): Promise<SignOutResponse> => {
    try {
      await AsyncStorage.removeItem("login");
      setAuthState(null);
      return { error: undefined, data: true };
    } catch (error) {
      return { error, data: undefined };
    } finally {
      setAuthState(null);
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
            username: username,
            password: password,
          },
        },
      });
      await AsyncStorage.setItem("login", JSON.stringify(res.data.login));
      setAuthState(res.data.login);
      return { data: res.data.login, error: undefined };
    } catch (error) {
      setAuthState(null);
      return { error: error as Error, data: undefined };
    }
  };

  /**
   *
   * @param authState
   * @param token
   * @returns
   *
   */
  const updateNotificationToken = async (
    authState: AuthState,
    token: string,
    device_type: string
  ) => {
    try {
      console.log(authState, "authState");
      const client = apolloClient(authState.accessToken);
      const notificationInput = {
        device_type,
        token,
        userId: authState.user.id,
        status: true,
      };
      console.log(notificationInput, "notificationInput");
      const res = await client.mutate({
        mutation: ACCEPT_NOTIFICATION_MUTATION,
        variables: {
          notificationInput,
        },
      });
      console.log(res.data, "notification");
      return { data: res.data, error: undefined };
    } catch (error) {
      console.log(error);
      // setAuthState(prev => ({...prev, user: {...prev?.user, allowsNotifications: false}}));
      return { error: error as Error, data: undefined };
    }
  };

  //   useProtectedRoute(authState);

  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signOut: logout,
        authState,
        setAuthState,
        updateNotificationToken,
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
