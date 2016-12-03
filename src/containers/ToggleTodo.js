import { connect } from 'react-redux';
import _ from 'lodash';

import { addOrToggleTodo } from '../actions';
import ToggleTodoComponent from '../components/ToggleTodo';

const mapStateToProps = (state, { actionId, phoneNumber }) => (
  {
    todo: _.find(state.todos, { actionId, target: phoneNumber }),
  }
);

const mapDispatchToProps = dispatch => (
  {
    onClick: (actionId, phoneNumber) => {
      dispatch(addOrToggleTodo(actionId, phoneNumber));
    },
  }
);

const ToggleTodo = connect(mapStateToProps, mapDispatchToProps)(ToggleTodoComponent);

export default ToggleTodo;
