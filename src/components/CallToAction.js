import React, {PropTypes} from 'react';

import StructuredText from './StructuredText';

const CallToAction = (props) => (
  <div className='call-to-action'>
    <h1>{props['call-to-action.title'].value[0].text}</h1>

    <time>{props['call-to-action.date'].value}</time>

    <div className='script'>
      <StructuredText {...props['call-to-action.script']} />
    </div>

    <div className='notes'>
      <StructuredText {...props['call-to-action.notes']} />
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
