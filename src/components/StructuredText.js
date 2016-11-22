import React, {PropTypes} from 'react';

const StructuredText = (props) => (
  <div className='structured-text'>
    {props.value.map((block, i) => {
      if (block.type === 'paragraph') {
        return (
          <p className='block' key={i}>
            {block.text.split('\n').map((segment, i) => 
              <span key={i}>
                {segment}<br />
              </span>
            )}
          </p>
        )
      }
    })}
  </div>
);

export default StructuredText;
