import * as React from 'react';
import { useRef, useCallback } from 'react';

type MessageFormProps = {
  onClick: (content: string) => void;
};

export const MessageForm = ({ onClick }: MessageFormProps) => {
  const text = useRef<HTMLInputElement>(null);
  const click = useCallback(() => {
    const content = text.current.value;
    text.current.value = ''; 
    onClick(content);
  }, [onClick]);
  return (
    <div>
      <input type="text" name="content" placeholder="Input message" ref={text} />
      <input type="button" name="add" value="Add" onClick={click} />
    </div>
  );
};
