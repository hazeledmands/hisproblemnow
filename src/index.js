import express from 'express';
import moment from 'moment';
import bunyanMiddleware from 'bunyan-middleware';

import logger from './logger';
import {reloadPrismicData} from './prismicStore';
import renderSite from './renderSite';

const PORT = process.env.PORT || 3000;

var site = express();
site.use(bunyanMiddleware({logger}));
site.use(renderSite);

reloadPrismicData()
.then(function () {
  /* reload local cache of posts every interval */
  setInterval(reloadPrismicData, moment.duration(10, 'minutes').asMilliseconds());
  logger.info('starting up server');
  site.listen(PORT, function () {
    logger.info({port: PORT}, 'server listening');
  });
});

