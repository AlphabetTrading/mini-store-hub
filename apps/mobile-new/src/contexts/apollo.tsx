import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../graphql/apolloClient";
import { useAuth } from "./auth";
import { useLoading } from "./loading";
import Loading from "../components/Loading";

type Props = {
  children: React.ReactNode;
};

export const ApolloContextProvider = (props: Props) => {
  const { authState } = useAuth();
  const client = apolloClient(authState?.accessToken);
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
