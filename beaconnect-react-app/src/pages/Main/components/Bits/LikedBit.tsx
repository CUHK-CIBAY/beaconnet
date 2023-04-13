import { useMutation, gql } from '@apollo/client';
import React, { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

export const LIKE_POST_MUTATION = gql`
  mutation LikedBit($postId: ID!) {
    likedBit(postId: $postId) {
      id
      likes {
        id
        user {
          id
          username
          open
        }
      }
    }
  }
`;

export const likedBitHandler = (
  e: React.KeyboardEvent | React.MouseEvent,
  likedBit: any,
  postId: string,
  likes: number,
  setLikes: (likes: number) => void,
) => {
  console.log('test');
  setLikes(likes + 1);

  likedBit({ variables: { postId } })
    .then((result: any) => {
      const updatedLikes = result.data.likedBit.likes.length;
      console.log(updatedLikes);
      setLikes(updatedLikes);
    })
    .catch((error: any) => {
      console.log(error);
      setLikes(likes);
    });
};

export const Bits = () => {
  const [likedBit] = useMutation(LIKE_POST_MUTATION);
  const postId = '';
  const [likes, setLikes] = useState(0);

  return (
    <div
      className="bit-box-content-footer-likes bit-box-content-footer-icons"
      onClick={(e) => likedBitHandler(e, likedBit, postId, likes, setLikes)}
      onKeyDown={(e) => likedBitHandler(e, likedBit, postId, likes, setLikes)}
      role="button"
      tabIndex={0}
    >
      Like
      <div>{likes} Likes</div>
      <AiOutlineHeart />
    </div>
  );
};

export default Bits;
