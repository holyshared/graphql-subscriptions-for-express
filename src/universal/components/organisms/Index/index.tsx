import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { PageHeader } from '../../atoms/Header';
import { MessageForm } from '../../molecules/MessageForm';
import { MessageList } from '../../molecules/MessageList';
import { Page } from '../Container';
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
    <Page>
      <PageHeader title="GraphQL Subscription for Express" />
      <MessageForm onClick={onClick} />
      <MessageList items={items} />
    </Page>
  );
};
