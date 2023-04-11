export const Query = {
  findBit: require('./bit-find'),
  islikedBit: require('./bit-isliked'),
};

export const Bit = {};

export const Mutation = {
  postBit: require('./bit-create'),
  likeBit: require('./bit-like'),
};
