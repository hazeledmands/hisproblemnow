# "We're His Problem Now" [![Build Status](https://travis-ci.org/demands/hisproblemnow.svg?branch=master)](https://travis-ci.org/demands/hisproblemnow)

This project builds on [this Google Spreadsheet](https://docs.google.com/spreadsheets/d/174f0WBSVNSdcQ5_S6rWPGB3pNCsruyyM_ZRQ6QUhGmo/htmlview?usp=sharing&sle=true).

## Running in development

Will watch changes, but doesn't yet do hot reloading.

1. `npm install`
2. `npm run dev`

## Tests

Right now there are no unit tests but we're doing type checking with flow and linting with eslint.

```
npm run test
```

## Deploying

This app is designed to be deployed on any system that understands node. Right now it's running on heroku. Deploys should automatically happen after a push to master and a successful CI pass.

If you're deploying elsewhere, then you'll need to do the following:

1. Make sure you have a node 6 / npm 3 binary in your `$PATH`
2. `npm install --production`
3. `npm run build`
4. `NODE_ENV=production PORT=80 BUGSNAG_API_KEY=xyz npm start`
