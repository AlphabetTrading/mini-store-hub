import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import {
  BASE_URL,
  apolloClient, getTokensFromStorage,
} from "../graphql/apolloClient";
import Constants from "expo-constants";
import {
  FORGOT_PASSWORD_MUTATION,
  LOGIN_MUTATION,
  RESET_PASSWORD_MUTATION,
} from "../graphql/mutations/authMutations";
import {
  ACCEPT_NOTIFICATION_MUTATION,
  REMOVE_NOTIFICATION_MUTATION,
} from "../graphql/mutations/notificationMutations";
import Loading from "../components/Loading";
import { print } from "graphql";
import jwtDecode from "jwt-decode";

interface Address {
  street: string;
}

interface UserProfile {
  photoUrl: string;
  idUrl: string;
  address: Address;
}

export interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    amharicFirstName: string;
    amharicLastName: string;
    gender: string;
    username: string;
    phone: string;
    role: string;
    userProfile?: UserProfile;
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

type AuthStateType = AuthState | null | undefined;

interface AuthContextValue {
  signIn: (phone: string, password: string) => Promise<SignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  authState: AuthStateType;
  setAuthState: React.Dispatch<
    React.SetStateAction<AuthState | null | undefined>
  >;
  updateNotificationToken: (
    authState: AuthState,
    token: string,
    device_type: string
  ) => Promise<any>;
  forgotPassword: (OTP: string, phne: string) => Promise<any>;
  resetPassword: (newPassword: string, phne: string) => Promise<any>;
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
    const localState = await getTokensFromStorage();

    // if there is no local state, set auth state to null
    if (!localState) return setAuthState(null);

    // if there is a local state, set auth state to local state
    const refreshToken = localState?.refreshToken;

    const { exp } = jwtDecode(refreshToken) as any;
    const expirationTime = exp * 1000 - 60000;

    if (Date.now() < expirationTime) {
      setAuthState(localState);
    } else {
      setAuthState(null);
    }
  }, []);

  useEffect(() => {
    if (!authState) {
      fetchData();
    }
  }, [fetchData]);

  /**
   *
   * @param phone
   * @param password
   * @returns
   */
  const login = async (
    phone: string,
    password: string
  ): Promise<SignInResponse> => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: print(LOGIN_MUTATION),
        variables: {
          data: {
            phone,
            password,
          },
        },
      }),
    };
    try {
      let status = false;
      setTimeout(() => {
        if (!status) {
          return { data: undefined, error: new Error("Invalid Credentials/ Network Error Please Try again!") };
        }
      }, 3000);
      const res = await fetch(
        BASE_URL,
        requestOptions
      );
      const data = await res.json();
      if (data.errors) {
        return { data: undefined, error: new Error("Invalid Credentials") };
      }
      status = true;
      await SecureStore.setItemAsync("login", JSON.stringify(data.data.login));
      setAuthState(data.data.login);
      const token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas?.projectId,
        })
      ).data;
      await updateNotificationToken(data.data.login, token, "android");
      return { data: data.data.login, error: undefined };
    } catch (error) {
      setAuthState(null);
      return { error: error as Error, data: undefined };
    }

    // try {
    //   const token = (
    //     await Notifications.getExpoPushTokenAsync({
    //       projectId: Constants.expoConfig?.extra?.eas?.projectId,
    //     })
    //   ).data;
    //   const client = apolloClient(authState, setAuthState);
    //   const res = await client.mutate({
    //     mutation: LOGIN_MUTATION,
    //     variables: {
    //       data: {
    //         phone,
    //         password,
    //       },
    //     },
    //   });
    //   await SecureStore.setItemAsync("login", JSON.stringify(res.data.login));
    //   setAuthState(res.data.login);
    //   await updateNotificationToken(res.data.login, token, "android");
    //   return { data: res.data.login, error: undefined };
    // } catch (error) {
    //   console.log(error, " is the error");
    //   setAuthState(null);
    //   return { error: error as Error, data: undefined };
    // }

  };

  /**
   *
   * @returns
   */
  const logout = async (): Promise<SignOutResponse> => {
    try {
      const token = (await Notifications.getExpoPushTokenAsync()).data;

      await SecureStore.deleteItemAsync("login");
      const client = apolloClient();
      await client.mutate({
        mutation: REMOVE_NOTIFICATION_MUTATION,
        variables: {
          token,
        },
      });
      await client.clearStore();
      setAuthState(null);
      return { error: undefined, data: true };
    } catch (error) {
      return { error, data: undefined };
    } finally {
      setAuthState(null);
      return { error: undefined, data: true };
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
      const client = apolloClient();
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
      return { error: error as Error, data: undefined };
    }
  };

  /***
   * forgot password
   * @param OTP
   * @param phone
   */
  const forgotPassword = async (OTP: string, phone: string) => {
    try {
      // const client = apolloClientWithNoToken();
      // const res = await client.mutate({
      //   mutation: FORGOT_PASSWORD_MUTATION,
      //   variables: {
      //     data: {
      //       phone,
      //     },
      //   },
      // });
      return { data: null, error: undefined };
    } catch (error) {
      setAuthState(null);
      return { error: error as Error, data: undefined };
    }
  };

  /***
   * reset password
   * @param newPassword
   * @param phone
   * @returns
   */

  const resetPassword = async (newPassword: string, phone: string) => {
    try {
      // const client = apolloClientWithNoToken();
      // const res = await client.mutate({
      //   mutation: RESET_PASSWORD_MUTATION,
      //   variables: {
      //     data: {
      //       phone,
      //     },
      //   },
      // });
      return { data: null, error: undefined };
    } catch (error) {
      setAuthState(null);
      return { error: error as Error, data: undefined };
    }
  };

  //   useProtectedRoute(authState);

  // wrap the object in useMemo to avoid unnecessary re-renders
  const authContextValue = React.useMemo(
    () => ({
      signIn: login,
      signOut: logout,
      authState,
      setAuthState,
      updateNotificationToken,
      forgotPassword,
      resetPassword,
    }),
    [authState]
  );

  return (
    <AuthContext.Provider
      value={authContextValue}
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
