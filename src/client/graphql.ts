import fetch from 'node-fetch'
import * as ws from 'ws';
import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { isServer } from '../universal/env';

const cache = new InMemoryCache();

const defaultHttpLinkOptions = {
  uri: 'http://localhost:4000/graphql',
};
const httpLinkOptions = isServer ? { ...defaultHttpLinkOptions, fetch } : defaultHttpLinkOptions;
const httpLink = createHttpLink(httpLinkOptions);

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/subscriptions`,
  options: {
    reconnect: true,
  },
  webSocketImpl: isServer ? ws : null
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    const isTarget = definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    return isTarget;
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link: link,
  cache: cache
});
