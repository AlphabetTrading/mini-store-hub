"use client";

import { ApolloLink, HttpLink, from } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from "@apollo/client/link/context";
import { API_URL } from "@/constants/urls";
import { createUploadLink } from "apollo-upload-client";

function makeClient() {
  const httpLink = createUploadLink({
    uri: API_URL,
  });

  const authMiddleware = setContext(async (operation, { headers }) => {
    const data = await fetch("/api/auth/session").then((res) => res.json());
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${data.accessToken}`,
        "Apollo-Require-Preflight": "true",
      },
    };
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            from([authMiddleware, httpLink]),
          ])
        : from([authMiddleware, httpLink]),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
