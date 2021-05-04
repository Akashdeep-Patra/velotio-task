import { CommentMutation } from './actionTypes';
export interface SetComments {
  type: string;
  payload: NormalizedObjects<Comment>;
}

export type CommentActions = SetComments;

export const setComments = (
  comments: NormalizedObjects<Comment>
): SetComments => ({
  type: CommentMutation.SET_COMMENTS,
  payload: comments,
});
