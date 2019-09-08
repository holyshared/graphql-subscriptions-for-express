import * as React from 'react';
import { Message } from '../../atoms/Message';

type MessageListProps = {
  items: { id: string, content: string }[]
};

export const MessageList = ({ items }: MessageListProps) => {
  return (
    <ul>
      {items.map(message => (<Message key={message.id} {...message} />))}
    </ul>
  );
};
