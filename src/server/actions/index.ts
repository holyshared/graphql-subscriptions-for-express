import { createFactory } from 'react';
import { Request, Response, NextFunction } from 'express';
import { renderToNodeStream } from 'react-dom/server';
import { IndexPage } from '../../universal/components/pages/Index';

export const index = (_req: Request, res: Response, _next: NextFunction) => {
  const renderer = createFactory(IndexPage);
  const page = renderer({
    channelId: 'xyz',
    messages: []
  });
  res.write('<!doctype html>');
  renderToNodeStream(page).pipe(res);
};
