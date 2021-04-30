import { UserMutation } from './actionTypes';
import { User } from './User.type';

export interface SetUsers {
  type: string;
  payload: User[];
}
export interface AddUser {
  type: string;
  payload: User;
}
export type UserActions = SetUsers | AddUser;

export const setUsers = (users: User[]): SetUsers => ({
  type: UserMutation.SET_USERS,
  payload: users,
});

export const addUser = (user: User): AddUser => ({
  type: UserMutation.ADD_USER,
  payload: user,
});
