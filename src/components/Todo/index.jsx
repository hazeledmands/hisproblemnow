import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import CallToAction from '../CallToAction';
import PhoneNumber from '../PhoneNumber';

import styles from './styles.css';

const Todo = ({ onClick, completed, target, callToAction }) => (
  <li onClick={onClick}
      styleName={completed ? 'todo-completed' : 'todo'}>
    <PhoneNumber value={target} actionId={callToAction.uid} />
    <div styleName={completed ? 'todo-completed-summary' : 'todo-summary'}>
      {callToAction.data['call-to-action.title'].value[0].text}
    </div>
    <div styleName={completed ? 'todo-completed-call-to-action' : 'todo-call-to-action'}>
      <CallToAction {...callToAction.data}
                    uid={callToAction.uid}
                    key={callToAction.uid} />
    </div>
  </li>
)


Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  callToAction: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
}

export default CSSModules(Todo, styles);
