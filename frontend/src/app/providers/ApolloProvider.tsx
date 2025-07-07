import { ApolloClient, InMemoryCache, ApolloProvider as RawApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useUserStore } from '@entities/User/model/user.store';
import { graphqlEndpoint } from '@app/config/apiConfig';

const httpLink = createHttpLink({
  uri: graphqlEndpoint,
});

const authLink = setContext((_, { headers }) => {
  const accessToken = useUserStore.getState().accessToken;
  return {
    headers: {
      ...headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => (
  <RawApolloProvider client={client}>{children}</RawApolloProvider>
);
