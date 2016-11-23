import Prismic from 'prismic.io';
import bunyanMiddleware from 'bunyan-middleware';
import express from 'express';
import moment from 'moment';

import cachedData, {reloadPrismicData, getPreviewData} from './prismicStore';
import logger from './logger';
import renderSite from './renderSite';

const PORT = process.env.PORT || 3000;

var site = express();

site.use(bunyanMiddleware({logger}));

site.use(function (err, req, res, next) { /* variadic functions in javascript are the worst idea */
  logger.error(err);
  next(err);
});

site.get('/', function (req, res, next) {
  Promise.resolve(renderSite(cachedData))
  .then(function (content) {
    return res.send(content);
  }, next);
});

site.get('/preview', function (req, res, next) {
  const previewToken = req.query.token;
  res.cookie(Prismic.previewCookie, previewToken, {
    maxAge: moment.duration(30, 'minutes').asMilliseconds(),
    path: '/',
    httpOnly: false
  });
  
  return getPreviewData(previewToken)
  .then(function (previewData) {
    return renderSite(previewData, {includePrismicToolbar: true});
  })
  .then(function (content) {
    res.send(content);
  }, next);
});

reloadPrismicData()
.then(function () {
  /* reload local cache of posts every interval */
  setInterval(reloadPrismicData, moment.duration(1, 'minutes').asMilliseconds());
  logger.info('starting up server');
  site.listen(PORT, function () {
    logger.info({port: PORT}, 'server listening');
  });
});

