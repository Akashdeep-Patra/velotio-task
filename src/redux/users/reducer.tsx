import { UserMutation } from './actionTypes';
import { UserActions } from './actions';
const initialState: NormalizedObjects<User> = {
  byId: {},
  allIds: [],
};

const UserReducer = (state = initialState, action: UserActions) => {
  switch (action.type) {
    case UserMutation.SET_USERS:
      return { ...action.payload };
    default:
      return state;
  }
};

export default UserReducer;
