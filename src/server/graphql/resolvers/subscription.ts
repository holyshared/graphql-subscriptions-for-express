import { withFilter } from 'apollo-server-express';
import { pubsub } from '../pubsub';

export const messageAdded = {
  subscribe: withFilter(
    () => pubsub.asyncIterator('messageAdded'),
    (payload, variables) => payload.messageAdded.channelId === variables.channelId
  )
};
