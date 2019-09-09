import * as React from 'react';
import { useRef, useCallback } from 'react';
import styled from 'styled-components';

type MessageFormProps = {
  className?: string;
  onClick: (content: string) => void;
};

export const InternalMessageForm = ({ className, onClick }: MessageFormProps) => {
  const text = useRef<HTMLInputElement>(null);
  const click = useCallback(() => {
    const content = text.current.value;
    text.current.value = ''; 
    onClick(content);
  }, [onClick]);
  return (
    <div className={className}>
      <input type="text" name="content" placeholder="Input message" ref={text} />
      <input type="button" name="add" value="Add" onClick={click} />
    </div>
  );
};

export const MessageForm = styled(InternalMessageForm)`
input {
  font-size: 14px;
}
input[type=text] {
  padding: 8px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
input[type=button] {
  color: #fff;
  margin: 0 0 0 10px;
  padding: 8px 10px;
  1px solid #ccc;
  display: inline-block;
  background-color: #333;
  border-radius: 5px;
}
display: flex;
margin: 0 0 15px 0;
padding: 0;
`;
