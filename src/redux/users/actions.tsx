import { UserMutation } from './actionTypes';
export interface SetUsers {
  type: string;
  payload: NormalizedObjects<NormalizedUserObject>;
}

export type UserActions = SetUsers;

export const setUsers = (
  users: NormalizedObjects<NormalizedUserObject>
): SetUsers => ({
  type: UserMutation.SET_USERS,
  payload: users,
});
