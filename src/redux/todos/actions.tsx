import { TodosMutations } from './actionTypes';
export interface SetTodos {
  type: string;
  payload: NormalizedObjects<Todo>;
}

export type TodoActions = SetTodos;

export const setTodos = (todos: NormalizedObjects<Todo>): SetTodos => ({
  type: TodosMutations.SET_TODOS,
  payload: todos,
});
