declare interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}
declare interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}
declare interface Comment {
  postId: string;
  id: string;
  name: string;
  body: string;
}
declare interface Todo {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
}
declare interface DataWithId {
  id: string;
}
declare function fetchUsers(): Promise<User[]>;

declare interface MiddlewareAPI<S> {
  dispatch: Dispatch<S>;
  getState(): S;
}

declare interface NormalizedObjects<T> {
  byId: { [id: string]: T };
  allIds: string[];
}
