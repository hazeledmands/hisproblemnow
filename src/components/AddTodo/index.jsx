import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules';

import styles from './styles.css';

const AddTodo = ({onClick, actionId, todo}) => {
  let text = "+"
  if (todo) {
    text = todo.completed ? "☑" : ""
  }
  return (
    <button styleName='add-todo' onClick={function() {onClick(actionId)}}>
      {text}
    </button>
  )
}

AddTodo.propTypes = {
  onClick: PropTypes.func.isRequired,
  actionId: PropTypes.string.isRequired,
  todo: PropTypes.object
}

export default CSSModules(AddTodo, styles);
