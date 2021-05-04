import { PostMutation } from './actionTypes';
export interface SetPosts {
  type: string;
  payload: NormalizedObjects<Post>;
}

export type PostsActions = SetPosts;

export const setPosts = (posts: NormalizedObjects<Post>): SetPosts => ({
  type: PostMutation.SET_POSTS,
  payload: posts,
});
