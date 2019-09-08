import * as React from 'react';

type MessageProps = {
  key: string;
  id: string;
  content: string;
};

export const Message = ({ content }: MessageProps) => (<li>{content}</li>)
