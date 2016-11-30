import React, { PropTypes } from 'react';
import _ from 'lodash';

import groupContiguousByType from './groupContiguousByType';

const TAG_BY_BLOCK_TYPE = {
  'list-item': 'li',
  'o-list-item': 'li',
  paragraph: 'p',
};

const WRAPPER_TAG_BY_BLOCK_TYPE = {
  'list-item': 'ul',
  'o-list-item': 'ol',
};

function StructuredText({ value }) {
  const groups = groupContiguousByType(value || []);

  return (
    <div className="structured-text">
      {_.flatten(groups.map((group, groupKey) => {
        if (group.length === 0) return [];

        const groupType = group[0].type;
        const groupBlocks = group.map((block, blockKey) => <Block
          key={`group-${groupKey}|block-${blockKey}`}
          {...block}
        />);

        if (WRAPPER_TAG_BY_BLOCK_TYPE[groupType]) {
          const tag = WRAPPER_TAG_BY_BLOCK_TYPE[groupType];
          return React.createElement(tag, { key: `group-${groupKey}` }, groupBlocks);
        }

        return groupBlocks;
      }))}
    </div>
  );
}

StructuredText.propTypes = {
  value: PropTypes.array,
};

function Block({ type, spans, text }) {
  const segments = [];
  const tag = TAG_BY_BLOCK_TYPE[type] || 'p';
  let index = 0;

  spans.forEach((span) => {
    if (span.start !== index) {
      segments.push({
        text: text.slice(index, span.start),
        type: 'span',
      });
    }
    segments.push({
      text: text.slice(span.start, span.end),
      type: span.type,
      data: span.data,
    });
    index = span.end;
  });

  if (index < text.length) {
    segments.push({
      text: text.slice(index),
      type: 'span',
    });
  }

  return React.createElement(tag, {},
    segments.map((segment, i) => {
      switch (segment.type) {
        case 'span':
          return (<span key={i}><Segment text={segment.text} /></span>);
        case 'strong':
          return (<b key={i}><Segment text={segment.text} /></b>);
        case 'hyperlink':
          return (<a
            key={i}
            href={_.get(segment, 'data.value.url')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Segment text={segment.text} />
          </a>);
        default:
          return (<tt key={i}>{JSON.stringify(segment)}</tt>);
      }
    }),
  );
}

Block.propTypes = {
  type: PropTypes.string.isRequired,
  spans: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired,
};

function Segment({ text }) {
  const lines = text.split('\n');
  return (
    <span>
      {lines.map((line, i) =>
        <span key={i}>
          {line}{i < lines.length - 1 && <br />}
        </span>,
      )}
    </span>
  );
}

Segment.propTypes = {
  text: PropTypes.string.isRequired,
};

export default StructuredText;
