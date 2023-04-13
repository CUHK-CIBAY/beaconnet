import { useMutation, gql } from '@apollo/client';
import React, { useState } from 'react';

const LIKE_POST_MUTATION = gql`
  mutation LikedBit($postId: id!) {
    likedBit(postId: $postId) {
      id
      likes {
        id
        user {
          id
          username
        }
      }
    }
  }
`;

const likedBitHandler = (
  e: React.KeyboardEvent | React.MouseEvent,
  likedBit: any,
  postId: string,
  likes: number,
  setLikes: (likes: number) => void,
) => {
  setLikes(likes + 1);

  likedBit({ variables: { postId } })
    .then((result: any) => {
      const updatedLikes = result.data.likedBit.likes.length;
      setLikes(updatedLikes);
    })
    .catch((error: any) => {
      console.log(error);
      setLikes(likes);
    });
};

const Bits = () => {
  const [likedBit] = useMutation(LIKE_POST_MUTATION);
  const postId = '';
  const [likes, setLikes] = useState(0);

  return (
    <div>
      <div
        className="bit-box-content-footer-likes bit-box-content-footer-icons"
        onClick={(e) => likedBitHandler(e, likedBit, postId, likes, setLikes)}
        onKeyDown={(e) => likedBitHandler(e, likedBit, postId, likes, setLikes)}
        role="button"
        tabIndex={0}
      >
        Like
      </div>
      <div>{likes} Likes</div>
    </div>
  );
};

export default Bits;
