import * as React from 'react';
import styled from 'styled-components';

type MessageProps = {
  key: string;
  id: string;
  content: string;
  className?: string;
};

const InternalMessage = ({ className, content }: MessageProps) => (<li className={className}>{content}</li>)

export const Message = styled(InternalMessage)`
font-size: 14px;
padding: 10px;
margin: 0;
border: 1px solid #ccc;
border-radius: 5px;
`;
