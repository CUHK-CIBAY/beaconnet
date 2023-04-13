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
        }
      }
    }
  }
`;

const likedBitHandler = async (postId) => {
  try {
    const { data } = await likedBit({
      variables: { postId },
    });
    return data.likedBit.likes.length;
  } catch (error) {
    console.log(error);
  }
};

const [likedBit] = useMutation(LIKE_POST_MUTATION);