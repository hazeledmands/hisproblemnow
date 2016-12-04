export const ADD_TODO = 'ADD_TODO';
export const ADD_OR_TOGGLE_TODO = 'ADD_OR_TOGGLE_TODO';

export function addTodo(actionId, phoneNumbers) {
  return { type: ADD_TODO, actionId, phoneNumbers };
}

export function addOrToggleTodo(actionId, phoneNumber) {
  return { type: ADD_OR_TOGGLE_TODO, actionId, phoneNumber };
}
