import { likeBit, isLikedBit } from './bit-like';

export const Query = {
  findBit: require('./bit-find'),
  isLikedBit,
  showBits: require('./bit-show'),
};

export const Bit = {
  author: require('./bit-impl'),
};

export const Mutation = {
  postBit: require('./bit-create'),
  likeBit,
};
