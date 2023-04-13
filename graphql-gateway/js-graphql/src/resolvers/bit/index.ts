import { likeBit, isLikedBit } from './bit-like';
import { postBitResolver, reBitResolver } from './bit-create';
import { authorResolver, reBitResolver as reBit, likeGiverResolver } from './bit-impl';

export const Query = {
  findBit: require('./bit-find'),
  isLikedBit,
  showBits: require('./bit-show'),
};

export const Bit = {
  author: authorResolver,
  reBit,
  likeGivers: likeGiverResolver,
};

export const Mutation = {
  postBit: postBitResolver,
  likeBit,
  reBit: reBitResolver,
};
