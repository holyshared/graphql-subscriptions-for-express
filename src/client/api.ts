import gql from 'graphql-tag';
import { client } from './graphql';

type SubscribeVariables = {
  channelId: string
};

export const subscribeMessage = (variables: SubscribeVariables, next: (data: any) => void) => {
  return client.subscribe({
    query: gql`
      subscription Message($channelId: ID!) {
        messageAdded(channelId: $channelId) {
          channelId
          content
        }
      }
    `,
    variables: variables
  }).subscribe({
    next
  });
}

const addMessage = (content: string) => {
  return client.mutate({
    mutation: gql`
      mutation Message($channelId: ID!, $content: String!) {
        addMessage(channelId: $channelId, content: $content) {
          channelId
          content
        }
      }
    `,
    variables: {
      channelId: "xyz",
      content
    }
  });
};

export const message = {
  add: addMessage,
  subscribe: subscribeMessage
};
