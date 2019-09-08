import * as React from 'react';
import { Template } from '../../templates/Template';
import { Index } from '../../organisms/Index';

type IndexPageProps = {
  channelId: string,
  messages: { id: string, content: string }[]
};

export const IndexPage = (props: IndexPageProps) => {
  return (
    <Template>
      <Index {...props} />
    </Template>
  );
};
