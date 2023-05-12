import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  resetProfileMutation,
  resetProfileMutationResult,
  showProfileQuery,
  showProfileQueryResult,
  showUserProfileQueryEmail,
  showUserProfileQueryResult,
  showUserProfileQueryUsername,
  showUserProfileQueryVariables,
} from './components/profile.query';
import Banner1 from './components/borzoi.jpeg';
import Banner2 from './components/images.jpeg';
import BitBox from '../../components/Bits/bits';
import Loading from '../../../../components/Loading/loading';
import './profile.css';

function Profile({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [profileDetails, setProfileDetails] = useState<
    showProfileQueryResult['me'] | showUserProfileQueryResult['findUser'] | null
  >(null);
  const [showProfileDetails, setShowProfileDetails] = useState<any>(null);
  const [showMoreButton, setShowMoreButton] = useState<boolean>(false);

  const [profileMode, setProfileMode] = useState<boolean>(false);

  const [queryProfile] = useLazyQuery<showProfileQueryResult>(showProfileQuery, {
    onCompleted: (data: showProfileQueryResult) => {
      setProfileDetails(data.me);
      setShowProfileDetails(data.me.bits.slice(0, 1));
    },
    fetchPolicy: 'network-only',
  });

  const [resetProfileQuery] = useMutation<resetProfileMutationResult>(resetProfileMutation, {
    onCompleted: (data: resetProfileMutationResult) => {
      if (data.updateInfo) {
        window.location.reload();
      }
    },
  });

  const [queryOtherProfileUsername] = useLazyQuery<showUserProfileQueryResult, showUserProfileQueryVariables>(
    showUserProfileQueryUsername,
    {
      onCompleted: (data: showUserProfileQueryResult) => {
        if (data.findUser) setProfileDetails(data.findUser);
        else {
          window.alert('User not found');
          setTimeout(() => {
            window.location.href = '/search';
          }, 1000);
        }
      },
      fetchPolicy: 'network-only',
    },
  );

  const [queryOtherProfileEmail] = useLazyQuery<showUserProfileQueryResult, showUserProfileQueryVariables>(
    showUserProfileQueryEmail,
    {
      onCompleted: (data: showUserProfileQueryResult) => {
        if (data.findUser) setProfileDetails(data.findUser);
        else {
          window.alert('User not found');
          setTimeout(() => {
            window.location.href = '/search';
          }, 1000);
        }
      },
      fetchPolicy: 'network-only',
    },
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const email = urlParams.get('email');
    if (username) {
      queryOtherProfileUsername({
        variables: {
          username,
        },
      });
    } else if (email) {
      queryOtherProfileEmail({
        variables: {
          email,
        },
      });
    } else {
      queryProfile();
      setProfileMode(true);
    }
  }, []);

  const resetProfile = () => {
    resetProfileQuery();
    setProfileMode(true);
  };

  const loadBits = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (!e.target) return;
    const target = e.target as HTMLDivElement;
    if (Math.floor(target.scrollHeight - target.scrollTop) <= target.clientHeight) {
      setShowProfileDetails((prev: any) => {
        if (!profileDetails?.bits) return prev;
        if (prev.length === profileDetails.bits.length) {
          setShowMoreButton(false);
          return prev;
        }
        const newResult = profileDetails.bits.slice(prev.length, prev.length + 1);
        setTimeout(() => {
          loadBits(e);
        }, 100);
        return newResult?.length > 0 ? [...prev, ...newResult] : prev;
      });
    } else {
      setShowMoreButton(true);
    }
  };

  useEffect(() => {
    loadBits({ target: document.querySelector('.user-bits-show') as HTMLDivElement } as unknown as React.UIEvent<
      HTMLDivElement,
      UIEvent
    >);
  }, [profileDetails]);

  return (
    <div className="page-content">
      {profileDetails ? (
        <div className="info-container">
          <div className="profile-banner-container">
            <img className="profile-banner-image" src={Banner2} alt={Banner1} />
          </div>
          <div className="user-info-container">
            <div className="user-icon-container">
              <img
                className="profile-icon-image"
                src={
                  profileDetails?.info?.image
                    ? `https://beaconnect-image-imagebucket-ft90dpqhkbr1.s3.ap-southeast-1.amazonaws.com/${profileDetails?.info?.image}`
                    : Banner1
                }
                alt={Banner2}
              />
              {profileMode && (
                <button
                  type="button"
                  className="profile-edit-button"
                  onClick={resetProfile}
                  onKeyDown={resetProfile}
                  tabIndex={0}
                >
                  Reset Profile
                </button>
              )}
            </div>
            <div className="user-info-detail">
              <div className="user-info-usernameUserID">
                <p className="user-info-username">{profileDetails?.info?.nickname}</p>
                <p className="user-info-userID">{`@${profileDetails?.username}`}</p>
              </div>
              <div className="user-info-descriptionBox">{profileDetails?.info?.bio}</div>
            </div>
            <div className="horizontal-line">
              <hr />
            </div>
            <div className="user-profile-button">
              <button type="button" className="profile-Bit-button profile-buttons">
                Bits
              </button>
            </div>
            <div className="user-bits-show" onScroll={loadBits}>
              {showProfileDetails?.map(
                (item: showUserProfileQueryResult['findUser']['bits'][0] | showProfileQueryResult['me']['bits'][0]) => (
                  <BitBox key={item.id} isLoggedIn={isLoggedIn} data={item} />
                ),
              )}
              {showMoreButton && (
                <div
                  className="page-center-listBits-loadMore"
                  onClick={loadBits}
                  onKeyDown={loadBits}
                  role="button"
                  tabIndex={0}
                >
                  Load More
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Profile;
