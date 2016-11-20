'use strict';

var Prismic = require('prismic.io');
var bunyan = require('bunyan');
var express = require('express');
var moment = require('moment');
var bunyanMiddleware = require('bunyan-middleware');

var renderSite = require('./renderSite');

var PORT = process.env.PORT || 3000;

var logger = bunyan.createLogger({ name: 'hpn' });
var blogPosts = [];

reload().then(function () {
  /* reload local cache of posts every interval */
  setInterval(reload, moment.duration(10, 'minutes').asMilliseconds());
  logger.info('starting up server');
  site.listen(PORT, function () {
    logger.info({ port: PORT }, 'server listening');
  });
});

function reload() {
  logger.info('Loading cached posts.');
  return Prismic.api("https://hisproblemnow.prismic.io/api").then(function (api) {
    return api.query(Prismic.Predicates.at('document.type', 'call-to-action'), {
      pageSize: 100,
      orderings: '[my.call-to-action.date desc]'
    });
  }).then(function (response) {
    logger.info({ postCount: response.results.length }, 'Done loading posts!');
    blogPosts = response.results;
  });
}

var site = express();
site.use(bunyanMiddleware({ logger: logger }));
site.use(renderSite);