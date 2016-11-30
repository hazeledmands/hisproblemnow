import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import CallToAction from '../CallToAction';
import PhoneNumber from '../PhoneNumber';

import styles from './styles.css';

const Todo = ({ onClick, completed, target, callToAction }) => (
  <li onClick={onClick}
      styleName={completed ? 'todo-completed' : 'todo'}>
      Call <PhoneNumber value={target} />:
      {callToAction.data['call-to-action.title'].value[0].text}
      <CallToAction {...callToAction.data} uid={callToAction.uid} key={callToAction.uid} />
  </li>
)


Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  callToAction: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
}

export default CSSModules(Todo, styles);
