// @flow

import _ from 'lodash';
import uuid from 'uuid';

import { ADD_TODO, TOGGLE_TODO } from './actions';

export default function reducer(
  state: { todos: [] },
  action: {
    type: string, actionId?: string, uid?: string
  }) {
  switch (action.type) {
    case ADD_TODO:
      if (_.find(state.todos, { actionId: action.actionId })) {
        return state;
      }
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            uid: uuid.v4(),
            actionId: action.actionId,
            completed: false,
          },
        ],
      });
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo) => {
          if (todo.uid === action.uid) {
            return Object.assign({}, todo, {
              completed: !todo.completed,
            });
          }
          return todo;
        }),
      });
    default:
      return state;
  }
}
