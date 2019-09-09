import * as React from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
  className?: string;
};

const Header = ({ title, className }: Props) => (
  <h1 className={className}>
    {title}
  </h1>
);

export const PageHeader = styled(Header)`
  font-size: 18px;
  padding: 0px;
  margin: 0 0 20px 0;
`;
