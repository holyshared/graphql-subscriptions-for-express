import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';

type PageProps = {
  children?: ReactNode;
  className?: string;
};

const InternalPage = ({ className, children }: PageProps) => (<div className={className}>{children}</div>);

export const Page = styled(InternalPage)`
  margin: 0;
  padding: 20px;
`;
