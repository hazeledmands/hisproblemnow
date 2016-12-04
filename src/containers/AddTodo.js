import { connect } from 'react-redux';
import _ from 'lodash';

import { addTodos } from '../actions';
import AddTodoComponent from '../components/AddTodo';

const mapStateToProps = (state, { actionId }) => (
  { todo: _.find(state.todos, { actionId }) }
);

const mapDispatchToProps = dispatch => (
  {
    onClick: (actionId, phoneNumbers) => {
      dispatch(addTodos(actionId, phoneNumbers.value));
    },
  }
);

const AddTodo = connect(mapStateToProps, mapDispatchToProps)(AddTodoComponent);

export default AddTodo;
