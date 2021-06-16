import { TodosMutations } from './actionTypes';
import { TodoActions } from './actions';
const initialState: NormalizedObjects<Todo> = {
  byId: {},
  allIds: [],
};

const todosReducer = (state = initialState, action: TodoActions) => {
  switch (action.type) {
    case TodosMutations.SET_TODOS:
      return { ...action.payload };
    default:
      return state;
  }
};

export default todosReducer;
