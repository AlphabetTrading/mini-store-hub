import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getClient } from "./client";
import { gql } from "@apollo/client";

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
                username: credentials.username,
              },
            },
          });

          return {
            ...login.user,
            user: {
              name: `${login.user.firstName} ${login.user.lastName}`,
              email: login.user.username,
              role: login.user.role,
              id: login.user.id,
              phone: login.user.phone,
            },
            accessToken: login.accessToken,
            refreshToken: login.refreshToken,
          };
        } catch (e) {
          console.log("Login Error", e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: (data) => {
      const { session, token, user } = data;
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        user: {
          ...session.user,
          ...user,
          username: token?.username,
          phone: token?.phone,
          name: token?.name,
          role: token?.role,
          id: token.id,
        },
      };
    },
    jwt: (data) => {
      const { token, user, account } = data;
      if (account) {
        token.accessToken = account.access_token;
      }

      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          name: `${u.firstName} ${u.lastName}`,
          email: u.username,
          accessToken: u.accessToken,
          refreshToken: u.refreshToken,
          username: u.username,
          role: u.role,
          phone: u.phone,
        };
      }
      return token;
    },
  },
};
