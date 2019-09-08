import { createFactory } from 'react';
import { hydrate } from 'react-dom';
import { Index } from '../universal/components/organisms/Index';

const app = document.getElementById('app');
const renderer = createFactory(Index);

hydrate(renderer({ channelId: 'xyz', messages: [] }), app);
