import { likeBit, isLikedBit } from './bit-like';
import { postBitResolver, reBitResolver} from './bit-create';

export const Query = {
  findBit: require('./bit-find'),
  isLikedBit,
  showBits: require('./bit-show'),
};

export const Bit = {
  author: require('./bit-impl'),
};

export const Mutation = {
  postBit: postBitResolver,
  likeBit,
  reBit: reBitResolver,
};
