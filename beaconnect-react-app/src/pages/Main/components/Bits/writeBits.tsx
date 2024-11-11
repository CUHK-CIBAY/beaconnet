import React, { useState } from 'react';
import { BsImage } from 'react-icons/bs';
import { FiVideo } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { useMutation } from '@apollo/client';
import { TbSend } from 'react-icons/tb';
import {
  postBitQuery,
  postBitMutationVariables,
  postBitMutationResult,
  postBitWithAttachmentMutationResult,
  postBitWithAttachmentMutationVariables,
  postBitWithAttachmentQuery,
  reBitMutationVariables,
  reBitQuery,
  reBitMutationResult,
} from '../Query/bit.query';
import { toBase64 } from '../../../../config/tools';
import AUTH from '../../../../config/constants';
import userIcon from '../../pages/Home/components/icon.png';
import Loading from '../../../../components/Loading/loading';

function WriteBitBox({
  reBit,
  setReBit,
  bitAttachment,
  setBitAttachment,
  showBits,
}: {
  reBit: [string, string] | string | null;
  setReBit: (_reBit: string | null) => void;
  bitAttachment: File | null;
  setBitAttachment: (_bitAttachment: File | null) => void;
  showBits: (_variables: {
    variables: {
      following: boolean;
    };
  }) => void;
}) {
  const [draggingState, setDraggingState] = useState(false);
  const [writeBitBoxState, setWriteBitBoxState] = useState('');
  const [writeBitBoxValue, setWriteBitBoxValue] = useState('');

  const sendBitSuccess = () => {
    setWriteBitBoxValue('');
    setWriteBitBoxState('success');
    setTimeout(() => {
      setWriteBitBoxState('');
      showBits({
        variables: {
          following: true,
        },
      });
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

  const [postReBit] = useMutation<reBitMutationResult, reBitMutationVariables>(reBitQuery, {
    onCompleted: (data) => {
      const {
        reBit: { id },
      } = data;
      if (id) {
        setTimeout(() => {
          sendBitSuccess();
          setReBit(null);
        }, 2000);
      }
    },
  });

  const [postBitWithAttachment] = useMutation<
    postBitWithAttachmentMutationResult,
    postBitWithAttachmentMutationVariables
  >(postBitWithAttachmentQuery, {
    onCompleted: (data) => {
      const {
        postBit: { id },
      } = data;
      if (id) {
        setTimeout(() => {
          setBitAttachment(null);
          sendBitSuccess();
        }, 2000);
      }
    },
  });

  const uploadAttachment = (file: File, content: string) => {
    if (file.size > 6_000_000) {
      // !AWS lambda function max size is 6MB
      alert('File size exceed 6MB');
    } else {
      toBase64(file).then((data) => {
        const base64 = data as string;
        base64.indexOf(',');
        const base64Data = base64.substring(base64.indexOf(',') + 1);
        fetch(
          process.env.REACT_APP_IMAGE_SERVER_URL ||
            'https://iayeuuhkq5.execute-api.ap-southeast-1.amazonaws.com/Prod/image',
          {
            method: 'post',
            body: base64Data,
          },
        )
          .then((res) => res.json())
          .then((returnData) => {
            const { key } = returnData;
            postBitWithAttachment({ variables: { image: key as string, content } });
          });
      });
    }
  };

  const postBitHandler = () => {
    const text = writeBitBoxValue;
    if (text.length > 0) {
      if (reBit) {
        postReBit({ variables: { content: text, id: reBit[0] } });
      } else if (bitAttachment) {
        uploadAttachment(bitAttachment, text);
      } else {
        postBit({ variables: { content: text } });
      }
      // add loading status
      setWriteBitBoxState('loading');
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
    if (e.dataTransfer?.files[0].type.includes('image') || e.dataTransfer?.files[0].type.includes('video')) {
      if (!reBit) setBitAttachment(e.dataTransfer?.files[0]);
    } else {
      alert('Only image or video file is allowed');
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragging');
    setDraggingState(false);
  };

  const FileUpload = (type: string) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = type;
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setBitAttachment(file);
      }
    };
    fileInput.click();
  };

  return (
    <div
      className={`write-bit-box bit-box-container ${writeBitBoxState}`}
      onDragOver={handleDragFile}
      onDrop={handleDropFile}
      onDragLeave={handleDragLeave}
    >
      <div className="write-bit-box-container">
        <img
          className="bit-box-icon"
          src={
            JSON.parse(localStorage.getItem(AUTH.userInfo)!)?.image
              ? `${
                  process.env.REACT_APP_IMAGE_VIEW_URL ||
                  'https://beaconnect-image-imagebucket-ft90dpqhkbr1.s3.ap-southeast-1.amazonaws.com'
                }/${JSON.parse(localStorage.getItem(AUTH.userInfo)!).image}`
              : userIcon
          }
          alt="profile"
        />
        <div className="write-bit-box-content">
          <textarea
            className="write-bit-box-content-text"
            placeholder="Write something..."
            value={writeBitBoxValue}
            onChange={(e) => setWriteBitBoxValue(e.target.value)}
          />
          {bitAttachment && (
            <div className="write-bit-box-added-attachment">
              <div className="write-bit-box-added-attachment-item">
                <div className="write-bit-box-added-attachment-item-icon">
                  {bitAttachment.type.includes('image') ? <BsImage /> : <FiVideo />}
                </div>
                <div className="write-bit-box-added-attachment-item-name">{bitAttachment.name}</div>
                <div
                  className="write-bit-box-added-attachment-item-remove"
                  onClick={() => setBitAttachment(null)}
                  onKeyDown={() => setBitAttachment(null)}
                  role="button"
                  tabIndex={0}
                >
                  <RxCross2 />
                </div>
              </div>
            </div>
          )}
          {reBit && (
            <div className="write-bit-box-reBit">
              <div className="write-bit-box-reBit-content">{reBit[1]}</div>
              <div
                className="write-bit-box-reBit-remove"
                onClick={() => setReBit(null)}
                onKeyDown={() => setReBit(null)}
                role="button"
                tabIndex={0}
              >
                <RxCross2 />
              </div>
            </div>
          )}
          <div className="write-bit-box-options">
            {!reBit && (
              <div className="write-bit-box-options-attachment">
                <BsImage
                  className="write-bit-box-options-icon"
                  onClick={() => {
                    FileUpload('image/*');
                  }}
                />
                <FiVideo
                  className="write-bit-box-options-icon"
                  onClick={() => {
                    FileUpload('video/*');
                  }}
                />
              </div>
            )}
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
      <Loading done={writeBitBoxState === 'success'} showLoading={!!writeBitBoxState} fade />
      {draggingState && (
        <div className="write-bit-box-upload">
          <div className="write-bit-box-upload-text">Drop your files here</div>
        </div>
      )}
    </div>
  );
}

export default WriteBitBox;
