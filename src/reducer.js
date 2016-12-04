// @flow
import { combineReducers } from 'redux';
import _ from 'lodash';
import uuid from 'uuid';

import { ADD_TODO, ADD_OR_TOGGLE_TODO } from './actions';

function callsToAction(state: Array<{}> = []) {
  return state;
}

function startHere(state: {} = {}) {
  return state;
}

function addTodo(
  state: Array<{
    uid: string,
    target: {},
    actionId: string,
    completed: boolean}>,
  actionId: string,
  phoneNumber: {}) {
  // If there are already todos for this action, do nothing
  if (_.find(state, { actionId, target: phoneNumber })) {
    return state;
  }
  return state.concat(
    {
      actionId,
      target: phoneNumber,
      uid: uuid.v4(),
      completed: false,
    },
  );
}

function toggleTodo(
  state: Array<{
    uid: string,
    target: {},
    actionId: string,
    completed: boolean}> = [],
  actionId: string,
  phoneNumber: {}) {
  return state.map((todo) => {
    if (todo.actionId === actionId && todo.target === phoneNumber) {
      return Object.assign({}, todo, {
        completed: !todo.completed,
      });
    }
    return todo;
  });
}

function todos(
  state: Array<{
    uid: string,
    target: {},
    actionId: string,
    completed: boolean}> = [],
  action: {
    type: string,
    actionId: string, uid?: string,
    phoneNumbers?: Array<{}>,
    phoneNumber?: {},
  }) {
  const actionPhoneNumber = action.phoneNumber;
  const actionPhoneNumbers = action.phoneNumbers;
  switch (action.type) {
    case ADD_OR_TOGGLE_TODO:
      if (actionPhoneNumber == null) {
        throw new Error("Can't add / toggle a todo without a phone number");
      }
      return toggleTodo(addTodo(state, action.actionId, actionPhoneNumber),
                        action.actionId, actionPhoneNumber);
    case ADD_TODO:
      if (actionPhoneNumbers === null) {
        throw new Error("Can't add / toggle a todo without a phone number");
      }
      return _.reduce((actionPhoneNumbers || []),
                      (newState, phoneNumber) => (
                        addTodo(newState,
                                action.actionId,
                                phoneNumber)
                      ), state);
    default:
      return state;
  }
}

const app = combineReducers({
  callsToAction, startHere, todos,
});

export default app;
