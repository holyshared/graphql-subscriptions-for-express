import { message } from './api';

type Message = {
  channelId: string,
  content: string,
}; 

type SubscribedMessage = {
  messageAdded: Message
};

type SubscribedPayload = {
  data: SubscribedMessage
};

const addMessageTo = (root: HTMLElement) => (values: SubscribedPayload) => {
  const { data: { messageAdded: { content } } } = values;
  const createMessageNode = (content: string) => {
    const li = document.createElement('li');
    const text = document.createTextNode(content);
    li.appendChild(text);
    return li;
  };
  root.appendChild(createMessageNode(content));
};

window.addEventListener('DOMContentLoaded', () => {
  const addNewMessage = addMessageTo(document.getElementById('messages'));
  message.subscribe({ channelId: 'xyz' }, addNewMessage);

  const btn = document.getElementById('add');
  const content = document.getElementById('content') as HTMLInputElement;
  btn.addEventListener('click', () => message.add(content.value), false);
}, false);
