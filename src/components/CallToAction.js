import React, {PropTypes} from 'react';

const CallToAction = (props) => (
  <div className='call-to-action'>
    <h1>{props['call-to-action.title'].value[0].text}</h1>

    <time>{props['call-to-action.date'].value}</time>

    <div className='script'>
      {props['call-to-action.script'].value.map((block) => {
        if (block.type === 'paragraph') {
          return (<p>{block.text}</p>);
        }
      })}
    </div>

    <div className='notes'>
      {props['call-to-action.notes'].value.map((block) => {
        if (block.type === 'paragraph') {
          return (<p>{block.text}</p>);
        }
      })}
    </div>
  </div>
)

CallToAction.propTypes = {
  uid: PropTypes.string.isRequired,
  'call-to-action.title': PropTypes.object.isRequired,
  'call-to-action.notes': PropTypes.object.isRequired,
  'call-to-action.script': PropTypes.object.isRequired,
  'call-to-action.date': PropTypes.object.isRequired,
}

export default CallToAction;
