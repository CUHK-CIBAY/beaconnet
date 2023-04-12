import React from 'react';
import { useMutation } from '@apollo/client';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiComment, BiRepost } from 'react-icons/bi';
import { BsSoundwave, BsImage } from 'react-icons/bs';
import { FiVideo } from 'react-icons/fi';
import { TbSend } from 'react-icons/tb';
import { formatDistance } from 'date-fns';
import { postBitQuery, postBitMutationVariables, postBitMutationResult } from '../Query/bit.query';
import userIcon from '../../pages/Home/components/icon.png';

export const WriteBitBox = () => {
  const [postBit] = useMutation<postBitMutationResult, postBitMutationVariables>(postBitQuery, {
    onCompleted: (data) => {
      const {
        postBit: { id },
      } = data;
      console.log(id);
    },
  });

  const postBitHandler = (e: React.KeyboardEvent | React.MouseEvent) => {
    const { currentTarget } = e;
    const textArea = currentTarget.parentElement?.parentElement?.querySelector('textarea') as HTMLTextAreaElement;
    const text = textArea.value;
    if (text.length > 0) {
      postBit({ variables: { content: text } });
    }
  };

  return (
    <div className="write-bit-box bit-box-container">
      <img className="bit-box-icon" src={userIcon} alt="profile" />
      <div className="write-bit-box-content">
        <textarea className="write-bit-box-content-text" placeholder="Write something..." />
        <div className="write-bit-box-options">
          <div className="write-bit-box-options-attachment">
            <BsImage className="write-bit-box-options-icon" />
            <FiVideo className="write-bit-box-options-icon" />
            <BsSoundwave className="write-bit-box-options-icon" />
          </div>
          <div
            className="write-bit-box-options-submit"
            onClick={postBitHandler}
            onKeyDown={postBitHandler}
            role="button"
            tabIndex={0}
          >
            <TbSend className="write-bit-box-options-submit-icon" />
            <input type="submit" value="Send Bit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const BitBox = (data: any) => (
  <div className="bit-box bit-box-container">
    {/* {isRepost && (
      <div className="bit-box-repost-statement">
        <BiRepost className="bit-box-repost-statement-icon" />
        <p>Rebit by Username</p>
      </div>
    )} */}
    <div className="bit-box-content-header">
      <img className="bit-box-icon" src={userIcon} alt="profile" />
      <div className="bit-box-content-header-name">John Doe</div>
      <div className="bit-box-content-header-userID">@johndoe</div>
      <div className="bit-box-content-header-time">
        {formatDistance(new Date(data?.createAt), new Date(), { addSuffix: true })}
      </div>
    </div>
    <div className="bit-box-content">
      <div className="bit-box-content-text">{data?.content}</div>
    </div>
    {/* {haveCaption && (
      <div className="bit-box-rebit-with-caption">
        <div className="bit-box-content-header">
          <img className="bit-box-icon" src={userIcon} alt="profile" />
          <div className="bit-box-content-header-name">John Doe</div>
          <div className="bit-box-content-header-userID">@johndoe</div>
          <div className="bit-box-content-header-time">{formatDistance(data.creatAt, new Date(), { addSuffix: true })}</div>
        </div>
        <div className="bit-box-content">
          <div className="bit-box-content-text">
            {data.content}
          </div>
        </div>
      </div>
    )} */}
    <div className="bit-box-content-footer">
      <div className="bit-box-content-footer-likes bit-box-content-footer-icons">
        <AiOutlineHeart />
        <p>{data?.totalLike}</p>
      </div>
      <div className="bit-box-content-footer-comments bit-box-content-footer-icons">
        <BiComment />
        <p>5 comments</p>
      </div>
      <div className="bit-box-content-footer-repost bit-box-content-footer-icons">
        <BiRepost />
      </div>
    </div>
    <div className="bit-box-content-footer-comment">
      <div className="bit-box-content-footer-comment-input">
        <input type="text" placeholder="Write a comment..." />
      </div>
      <div className="bit-box-content-footer-comment-submit">
        <TbSend />
      </div>
    </div>
  </div>
);

BitBox.defaultProps = {
  haveCaption: false,
  isRepost: false,
};
