// @flow

import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { RouterProvider } from 'redux-little-router';

import App from '../../build/App';
import reducer from '../reducer';

function renderFullPage(html, preloadedState, includePrismicToolbar) {
  let prismicToolbarScriptTag = '';
  let bugsnagScriptTag = '';

  if (process.env.BUGSNAG_API_KEY) {
    bugsnagScriptTag = `<script src="//d2wy8f7a9ursnm.cloudfront.net/bugsnag-3.min.js"
        data-apikey="${process.env.BUGSNAG_API_KEY}"
        data-releasestage="${process.env.NODE_ENV || 'development'}"></script>`;
  }

  if (includePrismicToolbar) {
    prismicToolbarScriptTag = '<script type="text/javascript" src="//static.cdn.prismic.io/prismic.min.js"></script>';
  }

  return `
    <!doctype html>
      <head>
        <title>His Problem Now</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700" rel="stylesheet">
        <link href="./static/bundle.css" rel="stylesheet">
        ${bugsnagScriptTag}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        ${prismicToolbarScriptTag}
        <script src='./static/bundle.js'></script>
      </body>
    </html>
  `;
}

export default function (
  router: { routerEnhancer: {}, routerMiddleware: {} },
  preloadedState: {}, {
  includePrismicToolbar,
}: {
  includePrismicToolbar: boolean,
} = {}) {
  const store = createStore(reducer, preloadedState, 
                            compose(
                              router.routerEnhancer,
                              applyMiddleware(
                                router.routerMiddleware
                              )
                            ));

  const html = renderToString(
    <Provider store={store}>
      <RouterProvider store={store}>
        <App />
      </RouterProvider>
    </Provider>,
  );

  const finalState = store.getState();
  return renderFullPage(html, finalState, includePrismicToolbar);
}
