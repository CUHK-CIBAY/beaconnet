import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiComment, BiRepost } from 'react-icons/bi';
import { BsSoundwave, BsImage } from 'react-icons/bs';
import { FiVideo } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { TbSend } from 'react-icons/tb';
import { TiTick } from 'react-icons/ti';
import { formatDistance } from 'date-fns';
import { postBitQuery, postBitMutationVariables, postBitMutationResult } from '../Query/bit.query';
import userIcon from '../../pages/Home/components/icon.png';

export const WriteBitBox = () => {
  const [draggingState, setDraggingState] = useState(false);

  const sendBitSuccess = () => {
    const writeBitBox = document.querySelector('.write-bit-box') as HTMLDivElement;
    const textArea = writeBitBox.querySelector('textarea') as HTMLTextAreaElement;
    textArea.value = '';
    writeBitBox.classList.add('success');
    setTimeout(() => {
      writeBitBox.classList.remove('loading');
      writeBitBox.classList.remove('success');
    }, 2000);
  };

  const [postBit] = useMutation<postBitMutationResult, postBitMutationVariables>(postBitQuery, {
    onCompleted: (data) => {
      const {
        postBit: { id },
      } = data;
      if (id) {
        setTimeout(() => {
          sendBitSuccess();
        }, 2000);
      }
    },
  });

  const postBitHandler = (e: React.KeyboardEvent | React.MouseEvent) => {
    const { currentTarget } = e;
    const textArea = currentTarget.parentElement?.parentElement?.querySelector('textarea') as HTMLTextAreaElement;
    const text = textArea.value;
    if (text.length > 0) {
      postBit({ variables: { content: text } });
      // add loading status
      const writeBitBox = document.querySelector('.write-bit-box') as HTMLDivElement;
      writeBitBox.classList.add('loading');
    }
  };

  const handleDragFile = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('dragging');
    setDraggingState(true);
  };

  const handleDropFile = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragging');
    setDraggingState(false);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragging');
    setDraggingState(false);
  };

  return (
    <div
      className="write-bit-box bit-box-container"
      onDragOver={handleDragFile}
      onDrop={handleDropFile}
      onDragLeave={handleDragLeave}
    >
      <div className="write-bit-box-container">
        <img className="bit-box-icon" src={userIcon} alt="profile" />
        <div className="write-bit-box-content">
          <textarea className="write-bit-box-content-text" placeholder="Write something..." />
          <div className="write-bit-box-added-attachment">
            <div className="write-bit-box-added-attachment-item">
              <div className="write-bit-box-added-attachment-item-icon">
                <BsImage />
              </div>
              <div className="write-bit-box-added-attachment-item-name">image.png</div>
              <div className="write-bit-box-added-attachment-item-remove">
                <RxCross2 />
              </div>
            </div>
          </div>
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
      <div className="write-bit-box-loading">
        <div className="write-bit-box-loading-spinner" />
        <div className="write-bit-box-tick-icon-container">
          <TiTick className="write-bit-box-tick-icon" />
        </div>
      </div>
      {draggingState && (
        <div className="write-bit-box-upload">
          <div className="write-bit-box-upload-text">Drop your files here</div>
        </div>
      )}
    </div>
  );
};

export const BitBox = (data: any) => {
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

  return (
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
            <div className="bit-box-content-header-time">2 hours ago</div>
          </div>
          <div className="bit-box-content">
            <div className="bit-box-content-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget tincidunt lacinia, nisl
              nisl aliquet nisl, eget aliquet nisl nisl eget nisl. Donec auctor, nisl eget tincidunt lacinia, nisl nisl
              aliquet nisl, eget aliquet nisl nisl eget nisl.
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
          <input type="text" placeholder="Write a comment..." onFocus={addActiveStatus} onBlur={removeActiveStatus} />
        </div>
        <div className="bit-box-content-footer-comment-submit">
          <TbSend />
        </div>
      </div>
    </div>
  );
};
BitBox.defaultProps = {
  haveCaption: false,
  isRepost: false,
  havePhoto: false,
};
