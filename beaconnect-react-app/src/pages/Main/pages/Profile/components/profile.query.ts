import { gql } from '@apollo/client';

export type showProfileQueryResult = {
  me: {
    info: {
      bio: string;
      nickname: string;
      image: string;
    };
    username: string;
    bits: [{
      id: string;
      content: string;
      createAt: string;
      totalLike: number;
      image: string;
      author: {
        id: string;
        username: string;
        info: {
          image: string;
          nickname: string;
        };
      };
      reBit: {
        content: string;
        createAt: string;
        author: {
          username: string;
          info: {
            image: string;
            nickname: string;
          };
        };
      };
      comment: [{
        id?: string;
        content: string;
        createAt: string;
        owner: {
          info: {
            nickname: string;
          };
          username: string;
        };
      }];
    }];
  };
};

export const showProfileQuery = gql`
  query showProfile {
    me {
      info {
        bio
        nickname
        image
      }
      username
      bits {
        id
        content
        createAt
        totalLike
        image
        author {
          id
          username
          info {
            image
            nickname
          }
        }
        likeGivers {
          id
        }
        reBit {
          content
          createAt
          author {
            username
            info {
              image
              nickname
            }
          }
        }
        comment {
          content
          createAt
          owner {
            info {
              nickname
            }
            username
          }
        }
      }
    }
  }
`;

export type showUserProfileQueryVariables = {
  username?: string;
  email?: string;
};

export type showUserProfileQueryResult = {
  findUser: {
    info: {
      bio: string;
      nickname: string;
      image: string;
    };
    username: string;
    bits: [{
      id: string;
      content: string;
      createAt: string;
      totalLike: number;
      image: string;
      author: {
        id: string;
        username: string;
        info: {
          image: string;
          nickname: string;
        };
      };
      reBit: {
        content: string;
        createAt: string;
        author: {
          username: string;
          info: {
            image: string;
            nickname: string;
          };
        };
      };
      comment: [{
        id?: string;
        content: string;
        createAt: string;
        owner: {
          info: {
            nickname: string;
          };
          username: string;
        };
      }];
    }];
  };
};

export const showUserProfileQueryUsername = gql`
  query showUserProfile($username: String!) {
    findUser(input: { username: $username }) {
      info {
        bio
        nickname
        image
      }
      username
      bits {
        id
        content
        createAt
        totalLike
        image
        author {
          id
          username
          info {
            image
            nickname
          }
        }
        likeGivers {
          id
        }
        reBit {
          content
          createAt
          author {
            username
            info {
              image
              nickname
            }
          }
        }
        comment {
          content
          createAt
          owner {
            info {
              nickname
            }
            username
          }
        }
      }
    }
  }
`;

export const showUserProfileQueryEmail = gql`
  query showUserProfile($email: String!) {
    findUser(input: { email: $email }) {
      info {
        bio
        nickname
        image
      }
      username
      bits {
        id
        content
        createAt
        totalLike
        image
        author {
          id
          username
          info {
            image
            nickname
          }
        }
        likeGivers {
          id
        }
        reBit {
          content
          createAt
          author {
            username
            info {
              image
              nickname
            }
          }
        }
        comment {
          content
          createAt
          owner {
            info {
              nickname
            }
            username
          }
        }
      }
    }
  }
`;
