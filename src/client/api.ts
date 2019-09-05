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
  return fetch('http://localhost:4000/graphql', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: 'mutation Message($channelId: ID!, $content: String!) { addMessage(channelId: $channelId, content: $content) { channelId content } }',
      variables: {
        channelId: "xyz",
        content
      }
    })
  }).then(res => {
    return res.json();
  }).then(res => {
    console.log(res);
  });
};

export const message = {
  add: addMessage,
  subscribe: subscribeMessage
};
