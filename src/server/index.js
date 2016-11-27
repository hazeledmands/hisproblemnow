// @flow

import Prismic from 'prismic.io';
import bugsnag from 'bugsnag';
import bunyanMiddleware from 'bunyan-middleware';
import express from 'express';
import helmet from 'helmet';
import moment from 'moment';
import path from 'path';
import { routerForExpress } from 'redux-little-router';

import cachedData, { reloadPrismicData, getData } from './prismicStore';
import logger from './logger';
import routes from '../routes';
import renderSite from './renderSite';

if (process.env.BUGSNAG_API_KEY) {
  bugsnag.register(process.env.BUGSNAG_API_KEY);
}

const PORT = process.env.PORT || 3000;

const site = express();

site.use(helmet());
site.use(helmet.contentSecurityPolicy({
  directives: {
    styleSrc: [
      "'self'",
      'fonts.googleapis.com',
    ],
    scriptSrc: [
      "'self'",
      "'unsafe-inline'",
      'd2wy8f7a9ursnm.cloudfront.net', /* bugsnag */
      'static.cdn.prismic.io', /* prismic toolbar */
      'code.jquery.com', /* prismic toolbar */
    ],
    fontSrc: [
      'fonts.gstatic.com',
    ],
  },
}));
site.use(bunyanMiddleware({ logger }));

site.use((err, req, res, next) => { /* variadic functions in javascript are the worst idea */
  logger.error(err);
  next(err);
});

site.use('/static', express.static(path.join(__dirname, '..', '..', 'build', 'public')));

site.get('/preview', (req, res, next) => {
  const previewToken = req.query.token;
  res.cookie(Prismic.previewCookie, previewToken, {
    maxAge: moment.duration(30, 'minutes').asMilliseconds(),
    path: '/',
    httpOnly: false,
  });

  const router = routerForExpress({
    routes, request: req,
  });

  return getData(previewToken)
    .then(previewData => renderSite(router, previewData,
                                    { includePrismicToolbar: true }))
  .then((content) => {
    res.send(content);
  }, next);
});

site.get('*', (req, res, next) => {
  const router = routerForExpress({
    routes, request: req,
  });

  Promise.resolve(renderSite(router, cachedData))
  .then(content => res.send(content), next);
});

reloadPrismicData()
.then(() => {
  /* reload local cache of posts every interval */
  setInterval(reloadPrismicData, moment.duration(1, 'minutes').asMilliseconds());
  logger.info('starting up server');
  site.listen(PORT, () => {
    logger.info({ port: PORT }, 'server listening');
  });
});
