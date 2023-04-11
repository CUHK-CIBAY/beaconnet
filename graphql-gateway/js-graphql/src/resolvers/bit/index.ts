import { likeBit, isLikedBit } from './bit-like';

export const Query = {
  findBit: require('./bit-find'),
  isLikedBit,
};

export const Bit = {};

export const Mutation = {
  postBit: require('./bit-create'),
  likeBit,
};
