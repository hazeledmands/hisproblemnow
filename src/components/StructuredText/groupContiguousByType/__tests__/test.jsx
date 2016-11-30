/* eslint-env jest */

import groupContiguousByType from '../index';

it('groups arrays of elements by contiguous types', () => {
  expect(groupContiguousByType([
    { type: 'a', id: 1 },
    { type: 'a', id: 2 },
    { type: 'a', id: 3 },
    { type: 'b', id: 4 },
    { type: 'b', id: 5 },
    { type: 'a', id: 6 },
  ])).toEqual([
    [
      { type: 'a', id: 1 },
      { type: 'a', id: 2 },
      { type: 'a', id: 3 },
    ],
    [
      { type: 'b', id: 4 },
      { type: 'b', id: 5 },
    ],
    [
      { type: 'a', id: 6 },
    ],
  ]);
});
