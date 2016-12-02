import { connect } from 'react-redux';
import _ from 'lodash';

import { toggleTodo } from '../actions';
import TodoListComponent from '../components/TodoList';

const mapStateToProps = state => (
  {
    todos: state.todos.map(todo => (
      Object.assign({}, todo, {
        callToAction: _.find(state.callsToAction, { uid: todo.actionId }),
      })
    )),
  }
);

const mapDispatchToProps = dispatch => (
  {
    onTodoClick: (uid) => {
      dispatch(toggleTodo(uid));
    },
  }
);

const TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoListComponent);

export default TodoList;
