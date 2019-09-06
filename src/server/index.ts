import * as http from 'http';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';

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
