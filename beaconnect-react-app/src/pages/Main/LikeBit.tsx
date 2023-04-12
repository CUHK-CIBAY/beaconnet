import { gql } from '@apollo/client';

function likePost(postId: string): void {
    const data: LikeData = {
      post_id: postId,
      is_liked: true
    };

    fetch('/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  }