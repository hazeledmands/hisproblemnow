import Prismic from 'prismic.io';

import logger from './logger';

const data = {
  callsToAction: [],
};

export default data;

export function reloadPrismicData () {
  logger.info('Loading cached posts.');
  return Prismic.api("https://hisproblemnow.prismic.io/api")
  .then(function (api) {
    return api.query(Prismic.Predicates.at('document.type', 'call-to-action'), {
      pageSize: 100,
      orderings: '[my.call-to-action.date desc]',
    });
  })
  .then(function (response) {
    logger.info({postCount: response.results.length}, 'Done loading posts!');
    data.callsToAction = response.results;
  });
}
