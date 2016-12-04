import React, { PropTypes } from 'react'
import Todo from '../Todo'

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
         key={todo.uid}
         {...todo}
         />
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    callToAction: PropTypes.object.isRequired,
    target: PropTypes.object.isRequired,
  }).isRequired).isRequired,
}

export default TodoList
