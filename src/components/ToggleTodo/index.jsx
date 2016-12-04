// @flow
import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules';

import styles from './styles.css';

function shouldCheckToggle(todo: ?{completed: boolean}): boolean {
  if (todo == null) return false;
  return todo.completed;
}

const ToggleTodo = ({onClick, actionId, phoneNumber, todo}) => {
  return (
    <input type="checkbox"
           styleName='toggle-todo'
           onChange={function() {onClick(actionId, phoneNumber)}}
           checked={shouldCheckToggle(todo)} />
  )
}

ToggleTodo.propTypes = {
  onClick: PropTypes.func.isRequired,
  actionId: PropTypes.string.isRequired,
  phoneNumber: PropTypes.object.isRequired,
  todo: PropTypes.object
}

export default CSSModules(ToggleTodo, styles);
