import Prismic from 'prismic.io';

import logger from './logger';

const cache = {
  callsToAction: [],
};

export default cache;

function getDocumentsOfType({ type, ref, orderings }) {
  const apiLogger = logger.child({ type, ref, orderings });
  apiLogger.info('Loading documents.');
  return Prismic.api('https://hisproblemnow.prismic.io/api')
  .then(api => api.query(Prismic.Predicates.at('document.type', type), {
    pageSize: 100,
    orderings,
    ref,
  })
    .then((response) => {
      apiLogger.info({ count: response.results.length }, 'Loaded documents.');
      return response;
    }))
  .then(response => response.results);
}

export function getData(ref) {
  logger.info('Loading all data.');
  return Promise.all([
    getDocumentsOfType({
      type: 'call-to-action',
      orderings: '[my.call-to-action.date desc]',
      ref,
    }),
    getDocumentsOfType({
      type: 'start-here',
      ref,
    }),
  ])
  .then(([callsToAction, [startHere]]) => ({ callsToAction, startHere }));
}

export function reloadPrismicData() {
  logger.info('Loading data for cache.');
  return getData()
  .then((response) => {
    logger.info('Adding data to cache.');
    cache.callsToAction = response.callsToAction;
    cache.startHere = response.startHere;
  });
}
