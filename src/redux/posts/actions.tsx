import { PostMutation } from './actionTypes';
export interface SetPosts {
  type: string;
  payload: NormalizedObjects<NormalizedPostObject>;
}

export type PostsActions = SetPosts;

export const setPosts = (
  posts: NormalizedObjects<NormalizedPostObject>
): SetPosts => ({
  type: PostMutation.SET_POSTS,
  payload: posts,
});
