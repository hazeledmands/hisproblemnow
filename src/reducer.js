// @flow
import { combineReducers } from 'redux';
import _ from 'lodash';
import uuid from 'uuid';

import { ADD_TODO, TOGGLE_TODO } from './actions';

function callsToAction(state: Array<{}> = []) {
  return state;
}

function startHere(state: {} = {}) {
  return state;
}

function todos(
  state: Array<{uid: string, actionId: string, completed: boolean}> = [],
  action: {
    type: string, actionId?: string, uid?: string
  }) {
  switch (action.type) {
    case ADD_TODO:
      if (_.find(state, { actionId: action.actionId })) {
        return state;
      }
      return [
        ...state,
        {
          uid: uuid.v4(),
          actionId: action.actionId,
          completed: false,
        },
      ];
    case TOGGLE_TODO:
      return state.map((todo) => {
        if (todo.uid === action.uid) {
          return Object.assign({}, todo, {
            completed: !todo.completed,
          });
        }
        return todo;
      });
    default:
      return state;
  }
}

const app = combineReducers({
  callsToAction, startHere, todos,
});

export default app;
