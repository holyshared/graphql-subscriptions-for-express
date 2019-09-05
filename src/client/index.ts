import { message } from './api';

window.addEventListener('DOMContentLoaded', () => {
  message.subscribe({ id: 'xyz' }, (data) => {
    console.log(data);
  });

  const btn = document.getElementById('add');
  btn.addEventListener('click', () => message.add(), false);
}, false);
