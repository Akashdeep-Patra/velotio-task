import { SET_USERS, ADD_USER } from './actionTypes';
import { User, UserActionTypes } from './User.type';

export const setUsers = (users: User[]): UserActionTypes => ({
  type: SET_USERS,
  users,
});

export const addUser = (user: User): UserActionTypes => ({
  type: ADD_USER,
  user,
});
