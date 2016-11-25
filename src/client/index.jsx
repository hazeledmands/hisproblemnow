/* @flow */
/* eslint-env browser */

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from '../components/App';
import reducer from '../reducer';

// Grab the state from a global injected into server-generated HTML
/* eslint-disable no-underscore-dangle */
const preloadedState = window.__PRELOADED_STATE__;
/* eslint-enable */

// Create Redux store with initial state
/* eslint-disable no-underscore-dangle */
const store = createStore(reducer, preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
