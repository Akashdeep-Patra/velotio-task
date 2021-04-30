import { UserMutation } from './actionTypes';
import { User } from './User.type';
import { UserActions } from './actions';
const initialState: User[] = [];

const UserReducer = (state = initialState, action: UserActions) => {
  switch (action.type) {
    case UserMutation.SET_USERS:
      return action.payload;
    case UserMutation.ADD_USER:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default UserReducer;
