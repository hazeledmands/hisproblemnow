/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import StructuredText from '../index';

it('does not render when provided with no input', () => {
  const component = renderer.create(<StructuredText />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a paragraph', () => {
  const component = renderer.create(
    <StructuredText
      value={[
        {
          type: 'paragraph',
          text: 'Lorem ipsum dolor sit amet',
          spans: [],
        },
      ]}
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('renders multiple paragraphs', () => {
  const component = renderer.create(
    <StructuredText
      value={[
        {
          type: 'paragraph',
          text: 'Lorem ipsum dolor sit amet',
          spans: [],
        },
        {
          type: 'paragraph',
          text: 'Consectitur adipiscing elit',
          spans: [],
        },
      ]}
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('renders bold text', () => {
  const component = renderer.create(
    <StructuredText
      value={[
        {
          type: 'paragraph',
          text: 'Lorem ipsum dolor sit amet!',
          spans: [{ start: 12, end: 26, type: 'strong' }],
        },
      ]}
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('renders hyperlinks', () => {
  const component = renderer.create(
    <StructuredText
      value={[
        {
          type: 'paragraph',
          text: 'Lorem ipsum dolor sit amet!',
          spans: [
            {
              start: 0,
              end: 5,
              type: 'hyperlink',
              data: {
                value: {
                  url: 'http://example.com',
                },
              },
            },
          ],
        },
      ]}
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('renders unordered lists', () => {
  const component = renderer.create(
    <StructuredText
      value={[
        {
          type: 'list-item',
          text: 'Lorem ipsum dolor sit amet!',
          spans: [],
        },
        {
          type: 'list-item',
          text: 'Sed do eiusmod tempor incidunt.',
          spans: [],
        },
        {
          type: 'list-item',
          text: 'Ut labore et dolore.',
          spans: [],
        },
      ]}
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('renders ordered lists', () => {
  const component = renderer.create(
    <StructuredText
      value={[
        {
          type: 'o-list-item',
          text: 'Lorem ipsum dolor sit amet!',
          spans: [],
        },
        {
          type: 'o-list-item',
          text: 'Sed do eiusmod tempor incidunt.',
          spans: [],
        },
        {
          type: 'o-list-item',
          text: 'Ut labore et dolore.',
          spans: [],
        },
      ]}
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('renders combinations of structured text elements', () => {
  const component = renderer.create(
    <StructuredText
      value={[
        {
          type: 'o-list-item',
          text: 'Lorem ipsum dolor sit amet!',
          spans: [],
        },
        {
          type: 'list-item',
          text: 'Sed do eiusmod tempor incidunt.',
          spans: [],
        },
        {
          type: 'paragraph',
          text: 'Ut labore et dolore.',
          spans: [],
        },
      ]}
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});
