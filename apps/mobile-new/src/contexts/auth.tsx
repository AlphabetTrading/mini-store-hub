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
  apolloClient,
  apolloClientWithNoToken,
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

interface Address {
  street: string;
}

interface UserProfile {
  photoUrl: string;
  idUrl: string;
  address: Address;
}

interface AuthState {
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
      const res = await fetch(
        "https://mini-store-hub-api.onrender.com/graphql/",
        requestOptions
      );
      const data = await res.json();
      if (data.errors) {
        console.log(data.errors, " res.errors");
        return { data: undefined, error: new Error("Invalid Credentials") };
      }
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
      console.log(error, " is the error");
      setAuthState(null);
      return { error: error as Error, data: undefined };
    }
  };

  /**
   *
   * @returns
   */
  const logout = async (): Promise<SignOutResponse> => {
    try {
      const token = (await Notifications.getExpoPushTokenAsync()).data;

      await SecureStore.deleteItemAsync("login");
      const client = apolloClient(authState, setAuthState);
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
      const client = apolloClient(authState, setAuthState);
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
   * @param phone
   */
  const forgotPassword = async (OTP: string, phone: string) => {
    try {
      const client = apolloClientWithNoToken();
      const res = await client.mutate({
        mutation: FORGOT_PASSWORD_MUTATION,
        variables: {
          data: {
            phone,
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
   * @param phone
   * @returns
   */

  const resetPassword = async (newPassword: string, phone: string) => {
    try {
      const client = apolloClientWithNoToken();
      const res = await client.mutate({
        mutation: RESET_PASSWORD_MUTATION,
        variables: {
          data: {
            phone,
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
