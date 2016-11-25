import React, { PropTypes } from 'react';

import CallToAction from '../CallToAction';

const Todo = ({ onClick, completed, callToAction }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
    >
    <CallToAction {...callToAction.data} uid={callToAction.uid} key={callToAction.uid} />
  </li>
)


Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  callToAction: PropTypes.object.isRequired
}

export default Todo
