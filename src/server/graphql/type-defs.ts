import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Message {
    channelId: ID!
    id: ID!
    content: String
  }

  type Query {
    message(id: ID!): Message
  }

  type Mutation {
    addMessage(channelId: ID!, content: String!): Message
  }

  type Subscription {
    messageAdded(channelId: ID!): Message
  }
`;
