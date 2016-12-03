import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import AddTodo from '../../containers/AddTodo';
import StructuredText from '../StructuredText';
import PhoneNumbers from '../PhoneNumbers';
import styles from './styles.css';

const CallToAction = props => (
  <div styleName="call-to-action">
    <AddTodo actionId={props.uid} phoneNumbers={props['call-to-action.phone-numbers']} />
    <h1>{props['call-to-action.title'].value[0].text}</h1>

    <time>{props['call-to-action.date'].value}</time>

    <div styleName="script">
      <StructuredText {...props['call-to-action.script']} />
    </div>

    <div styleName="notes">
      <StructuredText {...props['call-to-action.notes']} />
    </div>

    <div styleName="phone-numbers">
      {props['call-to-action.phone-numbers'] && <PhoneNumbers value={props['call-to-action.phone-numbers'].value} actionId={props.uid} />}
    </div>
  </div>
);

CallToAction.propTypes = {
  uid: PropTypes.string.isRequired,
  'call-to-action.title': PropTypes.object.isRequired,
  'call-to-action.notes': PropTypes.object,
  'call-to-action.script': PropTypes.object,
  'call-to-action.date': PropTypes.object,
  'call-to-action.phone-numbers': PropTypes.object,
};

export default CSSModules(CallToAction, styles);
