import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getClient } from "./client";
import { gql } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { UserRole } from "../../types/user";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "login",
      credentials: {
        // username: {
        //   label: "Username",
        //   type: "text",
        //   placeholder: "asdfasdfasd",
        // },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials) return null;

        try {
          const loginMutation = gql`
            mutation Login($data: LoginInput!) {
              login(data: $data) {
                accessToken
                refreshToken
                user {
                  id
                  firstName
                  lastName
                  phone
                  username
                  role
                  warehouse {
                    id
                  }
                }
              }
            }
          `;
          const {
            data: { login },
          } = await getClient().mutate({
            mutation: loginMutation,
            variables: {
              data: {
                password: credentials.password,
                phone: credentials.phone,
              },
            },
          });

          if (
            login.user.role !== UserRole.ADMIN &&
            login.user.role !== UserRole.WAREHOUSE_MANAGER
          )
            return null;
          return {
            id: login.user.id,
            user: {
              ...login.user,
              name: `${login.user.firstName} ${login.user.lastName}`,
              email: login.user.username,
              role: login.user.role,
              phone: login.user.phone,
              warehouseId:
                login.user.warehouse.length > 0
                  ? login.user.warehouse[0].id
                  : null,
            },
            accessToken: login.accessToken,
            refreshToken: login.refreshToken,
          };
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token, user }) => {
      return {
        ...session,
        ...token,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
    },
    jwt: (data) => {
      const { token, user, account } = data;
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          ...user,
        };
      }

      // Return previous token if the access token has not expired yet
      const { accessToken, refreshToken } = token as any;
      const { exp } = jwtDecode(accessToken) as any;
      const expirationTime = exp * 1000 - 60000;

      if (Date.now() < expirationTime) {
        console.log("data");
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
  },
};

async function refreshAccessToken(token: any) {
  try {
    const refreshMutation = gql`
      mutation RefreshToken($refreshToken: JWT!) {
        refreshToken(refreshToken: $refreshToken) {
          accessToken
          refreshToken
        }
      }
    `;
    const {
      data: { refreshToken: refresh },
    } = await getClient().mutate({
      mutation: refreshMutation,
      variables: {
        refreshToken: token.refreshToken,
      },
    });

    return {
      ...token,
      accessToken: refresh.accessToken,
      refreshToken: refresh.refreshToken,
    };
  } catch (e) {
    console.log("Refresh Error", e);
    // Fall back previouse refresh token
    return token;
  }
}

// session: ({ session, token, user }) => {
// console.log("Session", session, token, user);
// return {
//   ...session,
//   accessToken: token.accessToken,
//   refreshToken: token.refreshToken,
//   user: {
//     ...session.user,
//     ...user,
//     username: token?.username,
//     phone: token?.phone,
//     name: token?.name,
//     role: token?.role,
//     id: token.id,
//     warehouseId: token.warehouseId,
//   },
// };

// jwt
// if (user) {
//   const u = user as unknown as any;
//   return {
//     ...token,
//     id: u.id,
//     name: `${u.firstName} ${u.lastName}`,
//     email: u.username,
//     accessToken: u.accessToken,
//     refreshToken: u.refreshToken,
//     username: u.username,
//     role: u.role,
//     phone: u.phone,
//     warehouseId: u.warehouseId,
//   };
// }
// return token;
