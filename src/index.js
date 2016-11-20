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
site.get('/', renderSite(cachedData));

site.get('/preview', function (req, res) {
  const previewToken = req.query.token;
  res.cookie(Prismic.previewCookie, previewToken, {
    maxAge: moment.duration(30, 'minutes').asMilliseconds(),
    path: '/',
    httpOnly: false
  });
  
  return getPreviewData(previewToken)
  .then(function (previewData) {
    return renderSite(previewData, {includePrismicToolbar: true})(req, res);
  })
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

