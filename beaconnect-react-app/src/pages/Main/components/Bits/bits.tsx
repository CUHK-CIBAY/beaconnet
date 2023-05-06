/* eslint-disable */
/* eslint-disable max-len */
import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { AiFillHeart } from 'react-icons/ai';
import { BiComment, BiRepost } from 'react-icons/bi';
import { TbSend } from 'react-icons/tb';
import { formatDistance } from 'date-fns';
import { likeBitMutationVariables, likeBitQuery, likeBitMutationResult } from '../Query/bit.query';
import AUTH from '../../../../config/constants';
import userIcon from '../../pages/Home/components/icon.png';

const BitBox = (data: any) => {
  const addActiveStatus = (e: React.FocusEvent) => {
    const { currentTarget } = e;
    const parent = currentTarget.parentElement?.parentElement?.parentElement as HTMLDivElement;
    parent.classList.add('active');
  };

  const removeActiveStatus = (e: React.FocusEvent) => {
    const { currentTarget, target } = e;
    const textBox = target as HTMLTextAreaElement;
    const currentInput = textBox.value;
    if (currentInput.length === 0) {
      const parent = currentTarget.parentElement?.parentElement?.parentElement as HTMLDivElement;
      parent.classList.remove('active');
    }
  };

  const [giveLikeToBit] = useMutation<likeBitMutationResult, likeBitMutationVariables>(likeBitQuery, {
    onCompleted: () => {
      data.showBits;
    },
  });

  const handleGiveLike = (id: string, currentTarget: HTMLDivElement) => {
    currentTarget.classList.toggle('active');
    giveLikeToBit({
      variables: {
        id,
      },
    });
  };

  const handleRepost = (id: string, content: string) => {
    // eslint-disable-next-line react/destructuring-assignment
    data.setReBit([id, content]);
    document.querySelector('.write-bit-box-content-text')?.scrollIntoView({ behavior: 'smooth' });
  };

  const [commentBit] = useMutation<any, any>(
    gql`
      mutation commentBit($bitID: ID!, $comment: String!) {
        commentBit(id: $bitID, content: $comment) {
          id
        }
      }
    `,
    {
      onCompleted: () => {
        console.log('commented');
        data.showBits;
      },
    },
  );

  const handleCommentSubmit = (e: React.KeyboardEvent | React.MouseEvent) => {
    const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement;
    const currentInput = input.value;

    if (currentInput.length > 0) {
      commentBit({
        variables: {
          bitID: data.id,
          comment: currentInput,
        },
      });
      input.value = '';
    }
  };

  return (
    <div className="bit-box bit-box-container">
      {bitBoxHeader(data)}
      <div className="bit-box-content">
        <div className="bit-box-content-text">{data?.content}</div>
      </div>
      {data?.reBit && bitBoxReBit(data)}
      {data?.image && (
        <img
          className="bit-box-content-image"
          src={`https://beaconnect-image-imagebucket-ft90dpqhkbr1.s3.ap-southeast-1.amazonaws.com/${data?.image}`}
          alt="bit"
        />
      )}
      {data?.showFooterButton && bitBoxFooterButtons(handleGiveLike, data, handleRepost)}

      <div className="bit-box-content-footer-comment-list">
        {data?.comment?.map(
          (comment: any) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            comment && bitBoxShowComment(comment),
        )}
      </div>

      {data?.isLoggedIn && bitBoxComment(addActiveStatus, removeActiveStatus, handleCommentSubmit)}
    </div>
  );
};

BitBox.defaultProps = {
  haveCaption: false,
  isRepost: false,
  havePhoto: false,
};

function bitBoxReBit(data: any): React.ReactNode {
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
          {formatDistance(new Date(data?.reBit?.createAt), new Date(), { addSuffix: true })}
        </div>
      </div>
      <div className="bit-box-content">
        <div className="bit-box-content-text">{data?.reBit?.content}</div>
      </div>
    </div>
  );
}

function bitBoxHeader(data: any) {
  function redirectToProfile(username: any): void {
    if (username) window.location.href = `/profile?username=${username}`;
  }
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
        {formatDistance(new Date(data?.createAt), new Date(), { addSuffix: true })}
      </div>
    </div>
  );
}

function bitBoxFooterButtons(
  handleGiveLike: (id: string, currentTarget: HTMLDivElement) => void,
  data: any,
  handleRepost: (id: string, content: string) => void,
) {
  return (
    <div className="bit-box-content-footer">
      <div
        className={`bit-box-content-footer-likes bit-box-content-footer-icons ${
          data.likeGivers.find((likeGiver: any) => likeGiver.id === JSON.parse(localStorage.getItem(AUTH.userInfo)!).id)
            ? 'active'
            : ''
        }`}
        onClick={(e) => {
          handleGiveLike(data?.id, e.currentTarget);
        }}
        onKeyDown={(e) => {
          handleGiveLike(data?.id, e.currentTarget);
        }}
        role="button"
        tabIndex={0}
      >
        <AiFillHeart />
        <p>{data?.totalLike}</p>
      </div>
      <div className="bit-box-content-footer-comments bit-box-content-footer-icons">
        <BiComment />
        <p>{`${data?.comment?.length ? data?.comment?.length : 0} comments`}</p>
      </div>
      <div
        className="bit-box-content-footer-repost bit-box-content-footer-icons"
        onClick={() => {
          handleRepost(data?.id, data?.content);
          data?.setBitAttachment(null);
        }}
        onKeyDown={() => {
          handleRepost(data?.id, data?.content);
          data?.setBitAttachment(null);
        }}
        role="button"
        tabIndex={0}
      >
        <BiRepost />
      </div>
    </div>
  );
}

function bitBoxShowComment(comment: any) {
  return (
    <div className="bit-box-content-footer-comment-list-item" key={comment.id}>
      <div className="bit-box-content-footer-comment-list-item-header">
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

function bitBoxComment(
  addActiveStatus: (e: React.FocusEvent) => void,
  removeActiveStatus: (e: React.FocusEvent) => void,
  handleCommentSubmit: (e: React.KeyboardEvent | React.MouseEvent) => void,
): React.ReactNode {
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
}

export default BitBox;
