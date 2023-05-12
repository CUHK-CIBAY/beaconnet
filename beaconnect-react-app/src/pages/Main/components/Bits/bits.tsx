/* eslint-disable */
import React, { useEffect } from 'react';
import { useMutation, LazyQueryExecFunction, useLazyQuery } from '@apollo/client';
import { AiFillHeart } from 'react-icons/ai';
import { BiRepost } from 'react-icons/bi';
import { TbSend } from 'react-icons/tb';
import { FaCommentAlt } from 'react-icons/fa';
import { formatDistance } from 'date-fns';
import {
  likeBitMutationVariables,
  likeBitQuery,
  likeBitMutationResult,
  commentBitMutationVariables,
  commentBitMutationResult,
  commentBitMutation,
  BitQuery,
  BitQueryResult,
  BitQueryVariables,
  showBitsQueryResult,
  showBitsQueryVariables,
} from '../Query/bit.query';
import {
  showProfileQueryResult,
  showUserProfileQueryResult,
  showUserProfileQueryVariables,
} from '../../pages/Profile/components/profile.query';
import AUTH from '../../../../config/constants';
import userIcon from '../../pages/Home/components/icon.png';
import Loading from '../../../../components/Loading/loading';

function bitBoxReBit(data: BitQueryResult['findBit'] | null | undefined): React.ReactNode {
  return (
    <div className="bit-box-reBit-with-caption">
      <div className="bit-box-content-header">
        <img
          className="bit-box-icon"
          src={
            data?.reBit?.author?.info?.image
              ? `https://beaconnect-image-imagebucket-ft90dpqhkbr1.s3.ap-southeast-1.amazonaws.com/${data?.reBit?.author?.info?.image}`
              : userIcon
          }
          alt="profile"
        />
        <div className="bit-box-content-header-name">{data?.reBit?.author?.info?.nickname}</div>
        <div className="bit-box-content-header-userID">{data?.reBit?.author?.username}</div>
        <div className="bit-box-content-header-time">
          {formatDistance(new Date(data?.reBit?.createAt!), new Date(), { addSuffix: true })}
        </div>
      </div>
      <div className="bit-box-content">
        <div className="bit-box-content-text">{data?.reBit?.content}</div>
      </div>
    </div>
  );
}

function bitBoxHeader(
  data: BitQueryResult['findBit'] | null | undefined,
  redirectToProfile: (_username: string | undefined) => void,
): React.ReactNode {
  return (
    <div
      className="bit-box-content-header"
      onClick={() => redirectToProfile(data?.author?.username)}
      onKeyDown={() => redirectToProfile(data?.author?.username)}
      role="button"
      tabIndex={0}
    >
      <img
        className="bit-box-icon"
        src={
          data?.author?.info?.image
            ? `https://beaconnect-image-imagebucket-ft90dpqhkbr1.s3.ap-southeast-1.amazonaws.com/${data?.author?.info?.image}`
            : userIcon
        }
        alt="profile"
      />
      <div className="bit-box-content-header-name">{data?.author?.info?.nickname}</div>
      <div className="bit-box-content-header-userID">{`@${data?.author?.username}`}</div>
      <div className="bit-box-content-header-time">
        {data?.createAt && formatDistance(new Date(data?.createAt), new Date(), { addSuffix: true })}
      </div>
    </div>
  );
}

function bitBoxFooterButtons(
  data: any,
  showComment: boolean,
  setShowComment: React.Dispatch<React.SetStateAction<boolean>>,
  setBitBoxLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setReBit: React.Dispatch<React.SetStateAction<[string, string] | string | null>> | undefined,
  isLoggedIn: boolean,
  queryBits: LazyQueryExecFunction<BitQueryResult, BitQueryVariables>,
  setBitAttachment: React.Dispatch<React.SetStateAction<File | null>> | undefined,
  showInHomepages: boolean | undefined,
): React.ReactNode {
  const [giveLikeToBit] = useMutation<likeBitMutationResult, likeBitMutationVariables>(likeBitQuery, {
    onCompleted: () => {
      queryBits({
        variables: {
          id: data?.id,
        },
      }).then(() => {
        setBitBoxLoading(false);
      });
    },
  });

  const handleGiveLike = () => {
    setBitBoxLoading(true);
    if (isLoggedIn) {
      const id = data?.id;
      giveLikeToBit({
        variables: {
          id,
        },
      });
    } else {
      window.location.href = '/login';
    }
  };

  const handleRepost = (id: string, content: string) => {
    if (setReBit) setReBit([id, content]);
    document.querySelector('.page-center-content')?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const selfLikeCheck = () => {
    if (
      data?.likeGivers?.find(
        (likeGiver: { id: string }) => likeGiver?.id === JSON.parse(localStorage.getItem(AUTH.userInfo)!)?.id,
      )
    ) {
      return 'active';
    }
    return '';
  };

  const showCommentHandler = () => {
    setShowComment(!showComment);
    if (data?.comment?.length === 0) {
      setTimeout(() => {
        setShowComment(false);
      }, 500);
    }
  };

  return (
    <div className="bit-box-content-footer">
      <div
        className={`bit-box-content-footer-likes bit-box-content-footer-icons ${selfLikeCheck()}`}
        onClick={handleGiveLike}
        onKeyDown={handleGiveLike}
        role="button"
        tabIndex={0}
      >
        <AiFillHeart />
        <p>{data?.totalLike}</p>
      </div>
      <div
        className={`bit-box-content-footer-comments bit-box-content-footer-icons ${showComment && 'active'}`}
        onClick={showCommentHandler}
        onKeyDown={showCommentHandler}
        role="button"
        tabIndex={0}
      >
        <FaCommentAlt />
        <p>{`${data?.comment?.length ? data?.comment?.length : 0} comments`}</p>
      </div>
      {showInHomepages && (
        <div
          className="bit-box-content-footer-repost bit-box-content-footer-icons"
          onClick={() => {
            if (data?.content) handleRepost(data?.id, data?.content);
            if (setBitAttachment) setBitAttachment(null);
          }}
          onKeyDown={() => {
            if (data?.content) handleRepost(data?.id, data?.content);
            if (setBitAttachment) setBitAttachment(null);
          }}
          role="button"
          tabIndex={0}
        >
          <BiRepost />
        </div>
      )}
    </div>
  );
}

function bitBoxShowComment(
  comment: BitQueryResult['findBit']['comment'][0],
  redirectToProfile: (_username: string | undefined) => void,
): React.ReactNode {
  return (
    <div className="bit-box-content-footer-comment-list-item" key={comment.id}>
      <div
        className="bit-box-content-footer-comment-list-item-header"
        onClick={() => redirectToProfile(comment.owner?.username)}
        onKeyDown={() => redirectToProfile(comment.owner?.username)}
        role="button"
        tabIndex={0}
      >
        <p>{comment.owner?.username ? comment.owner?.info?.nickname : 'DeletedUser'}</p>
        {comment.owner?.username && (
          <p>
            @$
            {comment.owner?.username}
          </p>
        )}
        <p>{formatDistance(new Date(comment.createAt), new Date(), { addSuffix: true })}</p>
      </div>
      <div className="bit-box-content-footer-comment-list-item-content">
        <p>{comment.content}</p>
      </div>
    </div>
  );
}

const bitBoxComment = (
  data: showProfileQueryResult['me']['bits'][0],
  setBitBoxLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setShowCommentInput: React.Dispatch<React.SetStateAction<boolean>>,
  setShowComment: React.Dispatch<React.SetStateAction<boolean>>,
  queryBits: LazyQueryExecFunction<BitQueryResult, BitQueryVariables>,
) => {
  const addActiveStatus = () => {
    setShowCommentInput(true);
  };

  const removeActiveStatus = (e: React.FocusEvent) => {
    const { target } = e;
    const textBox = target as HTMLTextAreaElement;
    const currentInput = textBox.value;
    if (currentInput.length === 0) {
      setShowCommentInput(false);
    }
  };

  const [commentBit] = useMutation<commentBitMutationResult, commentBitMutationVariables>(commentBitMutation, {
    onCompleted: () => {
      queryBits({
        variables: {
          id: data!.id,
        },
      }).then(() => {
        setBitBoxLoading(false);
        setShowComment(true);
      });
    },
  });

  const handleCommentSubmit = (e: React.KeyboardEvent | React.MouseEvent) => {
    setBitBoxLoading(true);
    const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement;
    const currentInput = input.value;

    if (currentInput.length > 0) {
      commentBit({
        variables: {
          id: data!.id,
          content: currentInput,
        },
      });
      input.value = '';
    }
  };

  return (
    <div className="bit-box-content-footer-comment">
      <div className="bit-box-content-footer-comment-input">
        <input
          type="text"
          placeholder="Write a comment..."
          onFocus={addActiveStatus}
          onBlur={removeActiveStatus}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCommentSubmit(e);
            }
          }}
        />
      </div>
      <div
        className="bit-box-content-footer-comment-submit"
        onClick={handleCommentSubmit}
        onKeyDown={handleCommentSubmit}
        role="button"
        tabIndex={0}
      >
        <TbSend />
      </div>
    </div>
  );
};

function BitBox({
  data,
  setBitAttachment,
  isLoggedIn,
  showInHomepage,
  setReBit,
}: {
  isLoggedIn: boolean;
  showInHomepage?: boolean;
  setBitAttachment?: React.Dispatch<React.SetStateAction<File | null>>;
  setReBit?: React.Dispatch<React.SetStateAction<[string, string] | string | null>>;
  data: showBitsQueryResult['showBits'][0];
}) {
  const [bitBoxLoading, setBitBoxLoading] = React.useState(true);
  const [showComment, setShowComment] = React.useState(false);
  const [showCommentInput, setShowCommentInput] = React.useState(false);

  const [queryData, setQueryData] = React.useState<any | null>(null);
  const [queryBits] = useLazyQuery<BitQueryResult, BitQueryVariables>(BitQuery, {
    onCompleted: (data) => {
      setQueryData(data.findBit);
      setBitBoxLoading(false);
    },
    onError: (err) => {
      setTimeout(() => {
        queryBits({ variables: { id: data.id } });
      }, 1000);
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    queryBits({ variables: { id: data.id } });
  }, []);

  function redirectToProfile(username: string | undefined) {
    if (username) window.location.href = `/profile?username=${username}`;
  }

  return (
    <div className={`bit-box bit-box-container ${showCommentInput && 'active'}`}>
      {bitBoxHeader(queryData, redirectToProfile)}
      <div className="bit-box-content">
        <div className="bit-box-content-text">{queryData?.content}</div>
      </div>
      {queryData?.reBit && bitBoxReBit(queryData)}
      {queryData?.image && (
        <img
          className="bit-box-content-image"
          src={`https://beaconnect-image-imagebucket-ft90dpqhkbr1.s3.ap-southeast-1.amazonaws.com/${queryData?.image}`}
          alt="bit"
        />
      )}
      {bitBoxFooterButtons(
        queryData,
        showComment,
        setShowComment,
        setBitBoxLoading,
        setReBit,
        isLoggedIn,
        queryBits,
        setBitAttachment,
        showInHomepage,
      )}

      <div className={`bit-box-content-footer-comment-list ${showComment && 'active'}`}>
        {queryData?.comment?.map(
          (comment: BitQueryResult['findBit']['comment'][0]) =>
            comment && bitBoxShowComment(comment, redirectToProfile),
        )}
      </div>

      {isLoggedIn && bitBoxComment(queryData, setBitBoxLoading, setShowCommentInput, setShowComment, queryBits)}
      <Loading showLoading={bitBoxLoading} />
    </div>
  );
}

BitBox.defaultProps = {
  showInHomepage: false,
  setReBit: null,
  setBitAttachment: null,
};

export default BitBox;
