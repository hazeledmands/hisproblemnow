import { connect } from 'react-redux';
import _ from 'lodash';

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

const mapDispatchToProps = () => (
  {}
);

const TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoListComponent);

export default TodoList;
