import { ADD_USER, SET_USERS } from './actionTypes';
export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
}
export interface SetUsersAction {
  type: typeof SET_USERS;
  users: User[];
}
export interface AddUserAction {
  type: typeof ADD_USER;
  user: User;
}
export type UserActionTypes = SetUsersAction | AddUserAction;
