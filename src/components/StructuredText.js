import React, {PropTypes} from 'react';
import _ from 'lodash';

function StructuredText ({value}) {
  return (
    <div className='structured-text'>
      {value.map((block, i) => (
        <Block key={i} {...block} />
      ))}
    </div>
  );
};

function Block({type, spans, text}) {
  let segments = [];
  let index = 0;

  spans.forEach(function (span) {
    if(span.start !== index) {
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
    })
  }
  return (
    <p>
      {segments.map(function (segment, i) {
        switch (segment.type) {
          case 'span':
            return (<span key={i}><Segment text={segment.text} /></span>)
          case 'strong':
            return (<b key={i}><Segment text={segment.text} /></b>)
          case 'hyperlink':
            return (<a key={i} href={_.get(segment, 'data.value.url')} target='_blank'><Segment text={segment.text} /></a>)
          default:
            return (<tt key={i}>{JSON.stringify(segment)}</tt>)
        }
      })}
    </p>
  );
}

function Segment({text}) {
  const lines = text.split('\n')
  return (
    <span>
      {lines.map((line, i) =>
        <span key={i}>
          {line}{i < lines.length - 1 && <br />}
        </span>
      )}
    </span>
  )
}

export default StructuredText;
