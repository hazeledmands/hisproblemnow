import React from 'react';
import {renderToString} from 'react-dom/server';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/App';
import reducer from './reducer';

export default function (preloadedState, {includePrismicToolbar} = {}) {
  const store = createStore(reducer, preloadedState);

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const finalState = store.getState();
  return renderFullPage(html, finalState, includePrismicToolbar);
};

function renderFullPage (html, preloadedState, includePrismicToolbar) {
  let prismicToolbarScriptTag = '';
  if (includePrismicToolbar) {
    prismicToolbarScriptTag = '<script type="text/javascript" src="//static.cdn.prismic.io/prismic.min.js"></script>'
  }
  
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
    margin: 0 auto;
    max-width: 780px;
}

h1, h2, h3, h4, h5 {
    font-family: 'Patua One', sans-serif;
}

.title {
  padding: 1vh 2.5vh;
  margin: 0;
  text-align: center;
}

.subtitle {
  padding: 1vh 2.5vh 0;
  margin: 0;
  font-weight: bold;
  text-align: center;
}

.info {
  padding: 1vh 2.5vh;
  margin: 0;
}

a.link-button {
  display: block;
  background-color: #3fc1e2;
  color: #fff;
  border: 1px solid #0089a9;
  border-radius: 5px;
  padding: 0.5em;
  margin: 0.5em auto;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  max-width: 360px;
  text-align: center;
}

.intro {
  margin-bottom: 5vh;
}

.start-here {
  margin-top: 5vh;
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

.call-to-action .phone-number-block {
    padding: 1vh 2vh;
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
	${prismicToolbarScriptTag}
      </body>
    </html>
  `
}
