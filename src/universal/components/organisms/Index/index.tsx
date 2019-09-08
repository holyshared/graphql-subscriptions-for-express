import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { MessageForm } from '../../molecules/MessageForm';
import { MessageList } from '../../molecules/MessageList';
import { message } from '../../../../client/api';

type IndexProps = {
  channelId: string,
  messages: { id: string, content: string }[]
};

export const Index = ({ channelId, messages }: IndexProps) => {
  const [items, setItems] = useState(messages);
  const onClick = useCallback((content: string) => message.add(content), []);

  const onAdded = (values) => {
    const { data: { messageAdded } } = values;
    setItems((current) => current.concat([messageAdded]));
  };

  useEffect(() => {
    message.subscribe({ channelId }, onAdded);
  }, []);

  return (
    <React.Fragment>
      <h1>GraphQL Subscription for Express</h1>
      <MessageForm onClick={onClick} />
      <MessageList items={items} />
    </React.Fragment>
  );
};
