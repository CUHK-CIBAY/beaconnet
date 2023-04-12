import { findComment, getUserComment, getBitComment } from "./comment-get";
import { getCommenOwner, getCommentBit } from "./comment-impl";

export const Comment = {
  owner: getCommenOwner,
  onBit: getCommentBit,
};

export const Query = {
  findComment,
  getUserComment,
  getBitComment,
};

export const Mutation = {
  commentBit: require('./comment-create'),
  deleteComment: require('./comment-delete'),
}
