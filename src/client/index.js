import { split } from 'apollo-link';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import gql from 'graphql-tag';

import { message } from './api';

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/subscriptions`,
  options: {
    reconnect: true
  }
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

const client = new ApolloClient({
  link: link,
  cache: cache
});

const subscribe = () => {
  return client.subscribe({
    query: gql`
      subscription Message($id: ID!) {
        messageAdded(id: $id) {
          id
          name
        }
      }
    `,
    variables: {
      id: 'xyz'
    }
  }).subscribe({
    next (data) {
      console.log('subscribe---------------');
      console.log(data);
    }
  });
}


window.addEventListener('DOMContentLoaded', () => {
  subscribe();

  const btn = document.getElementById('add');
  btn.addEventListener('click', () => {
    message.add();
  }, false);

}, false);
