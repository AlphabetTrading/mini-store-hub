import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import { apolloClient } from "../graphql/apolloClient";

import {
  FORGOT_PASSWORD_MUTATION,
  LOGIN_MUTATION,
  RESET_PASSWORD_MUTATION,
} from "../graphql/mutations/authMutations";
import {
  ACCEPT_NOTIFICATION_MUTATION,
  REMOVE_NOTIFICATION_MUTATION,
} from "../graphql/mutations/notificationMutations";
import { useLoading } from "./loading";
import Loading from "../components/Loading";

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
    notification_token?: string;
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
  setAuthState: React.Dispatch<
    React.SetStateAction<AuthState | null | undefined>
  >;
  updateNotificationToken: (
    authState: AuthState,
    token: string,
    device_type: string
  ) => Promise<any>;
  forgotPassword: (OTP: string, username: string) => Promise<any>;
  resetPassword: (newPassword: string, username: string) => Promise<any>;
}

// Define the Provider component
interface ProviderProps {
  children: React.ReactNode;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthContextProvider(props: ProviderProps) {
  const [authState, setAuthState] = useState<AuthState | null | undefined>();
  // get user from async storage, and set it to state
  const fetchData = useCallback(async () => {
    const localState = await SecureStore.getItemAsync("login");
    if (localState) {
      await setAuthState(JSON.parse(localState));
    } else {
      await setAuthState(null);
    }
  }, []);

  useEffect(() => {
    if (!authState) {
      fetchData();
    }
  }, [fetchData]);

  /**
   *
   * @returns
   */
  const logout = async (): Promise<SignOutResponse> => {
    try {
      const token = (await Notifications.getExpoPushTokenAsync()).data;

      await SecureStore.deleteItemAsync("login");
      const client = apolloClient(authState?.accessToken);
      const res = await client.mutate({
        mutation: REMOVE_NOTIFICATION_MUTATION,
        variables: {
          token,
        },
      });
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
      await SecureStore.setItemAsync("login", JSON.stringify(res.data.login));
      setAuthState(res.data.login);
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      await updateNotificationToken(res.data.login, token, "android");
      return { data: res.data.login, error: undefined };
    } catch (error) {
      console.log(error, " is the error");
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
      const client = apolloClient(authState.accessToken);
      const notificationInput = {
        device_type,
        token,
        userId: authState.user.id,
      };
      const res = await client.mutate({
        mutation: ACCEPT_NOTIFICATION_MUTATION,
        variables: {
          notificationInput,
        },
      });
      return { data: res.data, error: undefined };
    } catch (error) {
      console.log(error);
      // setAuthState(prev => ({...prev, user: {...prev?.user, allowsNotifications: false}}));
      return { error: error as Error, data: undefined };
    }
  };

  /***
   * forgot password
   * @param OTP
   * @param username
   */
  const forgotPassword = async (OTP: string, username: string) => {
    try {
      const client = apolloClient(null);
      const res = await client.mutate({
        mutation: FORGOT_PASSWORD_MUTATION,
        variables: {
          data: {
            username,
          },
        },
      });
      return { data: res.data.login, error: undefined };
    } catch (error) {
      setAuthState(null);
      return { error: error as Error, data: undefined };
    }
  };

  /***
   * reset password
   * @param newPassword
   * @param username
   * @returns
   */

  const resetPassword = async (newPassword: string, username: string) => {
    try {
      const client = apolloClient(null);
      const res = await client.mutate({
        mutation: RESET_PASSWORD_MUTATION,
        variables: {
          data: {
            username,
          },
        },
      });
      return { data: res.data.login, error: undefined };
    } catch (error) {
      setAuthState(null);
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
        forgotPassword,
        resetPassword,
      }}
    >
      {typeof authState === "undefined" ? <Loading /> : props.children}
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
