import React from 'react';
import {renderToString} from 'react-dom/server';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/App';
import prismicStore from './prismicStore';
import reducer from './reducer';

export default function handleRender (req, res) {
  const preloadedState = prismicStore;
  const store = createStore(reducer, preloadedState);

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const finalState = store.getState();
  res.send(renderFullPage(html, finalState));
};

function renderFullPage (html, preloadedState) {
  return `
    <!doctype html>
      <head>
        <title>His Problem Now</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700|Patua+One" rel="stylesheet">
        <style>

body {
    font-family: 'Open Sans', sans-serif;
    background: #f0f6ff;
    padding: 0 auto;
    max-width: 780px;
}

h1, h2, h3, h4, h5 {
    font-family: 'Patua One', sans-serif;
}

.title {
  padding: 1vh 2.5vh;
  margin: 0;
}

.subtitle {
  padding: 1vh 2.5vh 0;
  margin: 0;
  font-weight: bold;
}

.info {
  padding: 1vh 2.5vh;
  margin: 0;
}

.toc {
  padding: 0.5vh 2.5vh 2vh;
  margin: 0;
}

.toc li {
  list-style-type: none;
}

a.link-button {
  display: block;
  background-color: #3fc1e2;
  color: #fff;
  border: 1px solid #0089a9;
  border-radius: 5px;
  padding: 0.5em;
  margin: 0.5em 0;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
}

.call-to-action {
    margin: 0.5vh 2vh 2vh;
    border: 1px solid grey;
    background: white;
}

.call-to-action h1 {
    margin: 0;
    padding: 1vh 2vh 0;
}

.call-to-action time {
    font-weight: bold;
    padding: 0 2vh;
}

.call-to-action .script {
    padding: 0 2vh;
    overflow: hidden;
}

.call-to-action .notes {
    border-top: 1px solid grey;
    margin: 0;
    padding: 0 2vh;
    background-color: #eaeaea;
    overflow: hidden;
}

        </style>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
      </body>
    </html>
  `
}
