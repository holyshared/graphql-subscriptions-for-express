const http = require('http');
const path = require('path');
const express = require('express');
const { ApolloServer, gql, PubSub, withFilter } = require('apollo-server-express');
const uuid = require('uuid/v4');

const pubsub = new PubSub();

const typeDefs = gql`
  type Message {
    id: ID!
    name: String
  }

  type Query {
    message(id: ID!): Message
  }

  type Mutation {
    addMessage(id: ID!): Message
  }

  type Subscription {
    messageAdded(id: ID!): Message
  }
`;

const resolvers = {
  Query: {
    message: () => {
      return { name: "added" };
    }
  },
  Mutation: {
    addMessage: (_, args) => {
      const message = { id: args.id, name: uuid() };
      pubsub.publish('messageAdded', { messageAdded: message });
      return message;
    }
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('messageAdded'),
        (payload, variables) => payload.messageAdded.id === variables.id
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

app.use(express.static(path.resolve(__dirname, '../../public')));

httpServer.listen(4000, () => {
  console.log(`🚀 Server ready at ${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ${server.subscriptionsPath}`);
});
