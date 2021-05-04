import { CommentMutation } from './actionTypes';
import { CommentActions } from './actions';
const initialState: NormalizedObjects<Comment> = {
  byId: {},
  allIds: [],
};

const commentsReducer = (state = initialState, action: CommentActions) => {
  switch (action.type) {
    case CommentMutation.SET_COMMENTS:
      return { ...action.payload };
    default:
      return state;
  }
};

export default commentsReducer;
