export const Comment = {
  owner: require('./comment-impl'),
  onBit: require('./comment-impl'),
};

export const Query = {};

export const Mutation = {
  commentBit: require('./comment-create'),
};
