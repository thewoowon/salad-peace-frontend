import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  createHttpLink,
  split,
} from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "./constant";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { graphql } from "graphql";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const wsLink = new GraphQLWsLink(
  createClient({
    url:
      process.env.NODE_ENV === "production"
        ? "wss://salad-peace.herokuapp.com/graphql"
        : "ws://localhost:4000/graphql",
    connectionParams: {
      "x-jwt": authTokenVar() || "",
    },
  })
);

// const wsLink = new WebSocketLink({
//     uri:`ws://localhost:4000/graphql`,
//     options:{
//         reconnect:true
//     }
// })

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://salad-peace.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
