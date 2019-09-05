import { message } from './api';

window.addEventListener('DOMContentLoaded', () => {
  message.subscribe({ channelId: 'xyz' }, (data) => {
    console.log(data);
  });

  const btn = document.getElementById('add');
  btn.addEventListener('click', () => message.add("add content"), false);
}, false);
