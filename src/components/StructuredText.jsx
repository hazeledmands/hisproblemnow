import React, { PropTypes } from 'react';
import _ from 'lodash';

function StructuredText({ value }) {
  const blocks = [];
  let listItems = [];

  /* group contiguous list items */
  (value || []).forEach((block) => {
    if (block.type === 'list-item') {
      listItems.push(block);
    } else {
      if (listItems.length > 0) {
        blocks.push({
          type: 'unordered-list',
          listItems,
        });
        listItems = [];
      }
      blocks.push(block);
    }
  });
  if (listItems.length > 0) {
    blocks.push({
      type: 'unordered-list',
      listItems,
    });
    listItems = [];
  }

  return (
    <div className="structured-text">
      {blocks.map((block, blockKey) => {
        if (block.type === 'unordered-list') {
          return (<ul key={blockKey}>
            {block.listItems.map((listItem, listItemKey) =>
              <Block key={listItemKey} {...listItem} />,
            )}
          </ul>);
        }
        return <Block key={blockKey} {...block} />;
      })}
    </div>
  );
}

StructuredText.propTypes = {
  value: PropTypes.array,
};

function Block({ type, spans, text }) {
  const segments = [];
  let index = 0;
  let tag;

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
  if (index < text.length - 1) {
    segments.push({
      text: text.slice(index),
      type: 'span',
    });
  }

  switch (type) {
    case 'list-item':
      tag = 'li';
      break;
    case 'paragraph':
    default:
      tag = 'p';
      break;
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
