import { PostMutation } from './actionTypes';
import { PostsActions } from './actions';
const initialState: NormalizedObjects<NormalizedPostObject> = {
  byId: {},
  allIds: [],
};

const postsReducer = (state = initialState, action: PostsActions) => {
  switch (action.type) {
    case PostMutation.SET_POSTS:
      return { ...action.payload };
    default:
      return state;
  }
};

export default postsReducer;
