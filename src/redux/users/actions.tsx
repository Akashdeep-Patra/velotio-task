import { UserMutation } from './actionTypes';
export interface SetUsers {
  type: string;
  payload: NormalizedObjects<User>;
}

export type UserActions = SetUsers;

export const setUsers = (users: NormalizedObjects<User>): SetUsers => ({
  type: UserMutation.SET_USERS,
  payload: users,
});
