import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../graphql/apolloClient";
import { useAuth } from "./auth";

type Props = {
  children: React.ReactNode;
};

export const ApolloContextProvider = (props: Props) => {
  const { authState, setAuthState } = useAuth();
  const client = apolloClient(authState, setAuthState);
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
