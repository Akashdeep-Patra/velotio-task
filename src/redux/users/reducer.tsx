import { ADD_USER, SET_USERS } from './actionTypes';
import { User, UserActionTypes } from './User.type';
const initialState: User[] = [];

const UserReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case ADD_USER:
      return [...state, action.user];
    default:
      return state;
  }
};

export default UserReducer;
