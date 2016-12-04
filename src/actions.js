export const ADD_TODOS = 'ADD_TODOS';
export const ADD_OR_TOGGLE_TODO = 'ADD_OR_TOGGLE_TODO';

export function addTodos(actionId, phoneNumbers) {
  return { type: ADD_TODOS, actionId, phoneNumbers };
}

export function addOrToggleTodo(actionId, phoneNumber) {
  return { type: ADD_OR_TOGGLE_TODO, actionId, phoneNumber };
}
