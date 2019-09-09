import * as React from 'react';
import { Message } from '../../atoms/Message';
import styled from 'styled-components';

type MessageListProps = {
  className?: string;
  items: { id: string, content: string }[];
};

const InternalMessageList = ({ className, items }: MessageListProps) => {
  return (
    <ul className={className}>
      {items.map(message => (<Message key={message.id} {...message} />))}
    </ul>
  );
};

export const MessageList = styled(InternalMessageList)`
list-style: none;
margin: 0;
padding: 0;
li {
  margin-bottom: 10px;
}
`;
