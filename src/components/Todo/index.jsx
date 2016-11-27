import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import CallToAction from '../CallToAction';
import styles from './styles.css';

const Todo = ({ onClick, completed, callToAction }) => (
  <li onClick={onClick}
      styleName={completed ? 'todo-completed' : 'todo'}>
    <CallToAction {...callToAction.data} uid={callToAction.uid} key={callToAction.uid} />
  </li>
)


Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  callToAction: PropTypes.object.isRequired
}

export default CSSModules(Todo, styles);
