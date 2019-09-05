const http = require('http');
const path = require('path');
const express = require('express');
const { ApolloServer, gql, PubSub, withFilter } = require('apollo-server-express');
const uuid = require('uuid/v4');

const pubsub = new PubSub();

const typeDefs = gql`
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

const resolvers = {
  Query: {
    message: (_, args: { id: string }) => {
      const { id } = args;
      return { id, channelId: 'xyz', content: "added" };
    }
  },
  Mutation: {
    addMessage: (_, args: { channelId: string, content: string }) => {
      const { channelId, content } = args;
      const message = {
        id: uuid(),
        channelId,
        content
      };
      pubsub.publish('messageAdded', { messageAdded: message });
      return message;
    }
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('messageAdded'),
        (payload, variables) => payload.messageAdded.channelId === variables.channelId
      )
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: '/subscriptions'
  }
});

const app = express();
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

app.use(express.static('./public'));

httpServer.listen(4000, () => {
  console.log(`🚀 Server ready at ${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ${server.subscriptionsPath}`);
});
