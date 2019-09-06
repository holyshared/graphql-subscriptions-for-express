import { pubsub } from '../pubsub';
import { v4 as uuid } from 'uuid';

export const addMessage = (_, args: { channelId: string, content: string }) => {
  const { channelId, content } = args;
  const message = {
    id: uuid(),
    channelId,
    content
  };
  pubsub.publish('messageAdded', { messageAdded: message });
  return message;
};
