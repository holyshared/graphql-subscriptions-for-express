import * as React from 'react';
import { ReactNode } from 'react';

type TemplateProps = {
  children?: ReactNode
};

export const Template = ({ children }: TemplateProps) => {
  return (
    <html>
      <head>
        <meta charSet="utf8" />
        <title>GraphQL Subscription for Express</title>
      </head>
      <body>
        <div id="app">{children}</div>
        <script src="js/bundle.js"></script>
      </body>
    </html>
  );
};
