/* @flow */
/* eslint-env browser */

import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { RouterProvider, routerForBrowser } from 'redux-little-router';

import App from '../components/App';
import routes from '../routes';
import reducer from '../reducer';

// Grab the state from a global injected into server-generated HTML
/* eslint-disable no-underscore-dangle */
const preloadedState = window.__PRELOADED_STATE__;
/* eslint-enable */

const { routerEnhancer, routerMiddleware } = routerForBrowser({ routes });

// Create Redux store with initial state
/* eslint-disable no-underscore-dangle */
const store = createStore(reducer, preloadedState,
  compose(
    routerEnhancer,
    applyMiddleware(routerMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
/* eslint-enable */

render(
  <Provider store={store}>
    <RouterProvider store={store}>
      <App />
    </RouterProvider>
  </Provider>,
  document.getElementById('root'),
);
