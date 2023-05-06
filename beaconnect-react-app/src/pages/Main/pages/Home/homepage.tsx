/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { AiOutlineLoading } from 'react-icons/ai';
import { RxCrossCircled } from 'react-icons/rx';
import BitBox from '../../components/Bits/bits';
import WriteBitBox from '../../components/Bits/writeBits';
import { showBitsQuery, showBitsQueryVariables, showBitsQueryResult } from '../../components/Query/bit.query';
import seasonalContent from '../../components/Seasonal/seasonal';

const ListBits = (
  isLoggedIn: boolean,
  reBit: null,
  setReBit: React.Dispatch<React.SetStateAction<null>>,
  bitAttachment: any,
  setBitAttachment: React.Dispatch<any>,
  showBits: any,
  result: any,
) => (
  <div className="page-center-listBits">
    {isLoggedIn && (
      <WriteBitBox
        reBit={reBit}
        setReBit={setReBit}
        bitAttachment={bitAttachment}
        setBitAttachment={setBitAttachment}
        showBits={showBits}
      />
    )}

    {result.showBits?.length > 0 ? (
      result?.showBits?.map((item: any) => (
        <BitBox
          setReBit={setReBit}
          showBits={showBits}
          setBitAttachment={setBitAttachment}
          isLoggedIn={isLoggedIn}
          key={item.id}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...item}
        />
      ))
    ) : (
      <div className="main-no-bit-warning">
        {result[0] === 'Loading' ? <AiOutlineLoading className="reactLoadingCircle" /> : <RxCrossCircled />}
        <p className="main-no-bit-warning-text">
          {result[0] === 'Loading'
            ? 'Loading'
            : isLoggedIn
            ? 'Try to follow someone to see their bits!'
            : 'No Bits Yet!'}
        </p>
      </div>
    )}
  </div>
);

const Home = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [result, setResult] = useState<any>(['Loading']);
  const [reBit, setReBit] = useState(null);
  const [bitAttachment, setBitAttachment] = useState<any>(null);

  const [showBits] = useLazyQuery<showBitsQueryResult, showBitsQueryVariables>(showBitsQuery, {
    onCompleted: (data: any) => {
      setResult(data);
    },
    onError: () => {
      window.alert('Failed to communicate with server. Please try again later.');
      setResult([]);
    },
    fetchPolicy: 'network-only',
  });

  /* eslint-disable */
  useEffect(() => {
    showBits({ variables: { following: isLoggedIn ? true : false } });
  }, []);

  const listBits = (
    <div className="page-content">
      <div className="page-center-content">
        {ListBits(isLoggedIn, reBit, setReBit, bitAttachment, setBitAttachment, showBits, result)}
      </div>

      <div className="page-right-content">{seasonalContent}</div>
    </div>
  );
  /* eslint-enable */

  return <div className="home-page-container">{listBits}</div>;
};
export default Home;
