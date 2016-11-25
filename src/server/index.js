// @flow

import Prismic from 'prismic.io';
import bunyanMiddleware from 'bunyan-middleware';
import express from 'express';
import helmet from 'helmet';
import moment from 'moment';
import path from 'path';

import cachedData, { reloadPrismicData, getData } from './prismicStore';
import logger from './logger';
import renderSite from './renderSite';

const PORT = process.env.PORT || 3000;

const site = express();

site.use(helmet());
site.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
  },
}));
site.use(bunyanMiddleware({ logger }));

site.use((err, req, res, next) => { /* variadic functions in javascript are the worst idea */
  logger.error(err);
  next(err);
});

site.use('/static', express.static(path.join(__dirname, '..', '..', 'build', 'public')));

site.get('/', (req, res, next) => {
  Promise.resolve(renderSite(cachedData))
  .then(content => res.send(content), next);
});

site.get('/preview', (req, res, next) => {
  const previewToken = req.query.token;
  res.cookie(Prismic.previewCookie, previewToken, {
    maxAge: moment.duration(30, 'minutes').asMilliseconds(),
    path: '/',
    httpOnly: false,
  });

  return getData(previewToken)
  .then(previewData => renderSite(previewData, { includePrismicToolbar: true }))
  .then((content) => {
    res.send(content);
  }, next);
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
