import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const LIKE_POST_MUTATION = gql`
  mutation LikedBit($postId: ID!) {
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

const likedBitHandler = (postId: string) => {
  likedBit({ variables: { postId } })
    .then((result) => {
      const updatedLikes = result.data.likedBit.likes.length;
      setLikes(updatedLikes);
    })
    .catch((error) => {
      console.log(error);
    });
};


const [likedBit] = useMutation(LIKE_POST_MUTATION);