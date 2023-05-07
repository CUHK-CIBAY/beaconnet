import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { AiOutlineLoading } from 'react-icons/ai';
import { RxCrossCircled } from 'react-icons/rx';
import BitBox from '../../components/Bits/bits';
import WriteBitBox from '../../components/Bits/writeBits';
import { showBitsQuery, showBitsQueryVariables, showBitsQueryResult } from '../../components/Query/bit.query';
import seasonalContent from '../../components/Seasonal/seasonal';

function ListBits(isLoggedIn: boolean) {
  const [reBit, setReBit] = useState<[string, string] | string | null>(null);
  const [bitAttachment, setBitAttachment] = useState<File | null>(null);
  const [result, setResult] = useState<showBitsQueryResult | null>(null);
  const [showBits] = useLazyQuery<showBitsQueryResult, showBitsQueryVariables>(showBitsQuery, {
    onCompleted: (data: showBitsQueryResult) => {
      setResult(data);
    },
    onError: () => {
      setResult({
        showBits: [
          {
            id: 'ERROR',
          },
        ],
      });
    },
    fetchPolicy: 'network-only',
  });
  useEffect(() => {
    showBits({ variables: { following: !!isLoggedIn } });
  }, []);

  return (
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

      {result && result?.showBits[0]?.id !== 'ERROR' ? (
        result?.showBits.map(
          (item: showBitsQueryResult['showBits'][0]) =>
            item?.id && (
              <BitBox
                setReBit={setReBit}
                showBits={showBits}
                setBitAttachment={setBitAttachment}
                isLoggedIn={isLoggedIn}
                showInHomepage
                key={item.id}
                data={item}
              />
            ),
        )
      ) : (
        <div className="main-no-bit-warning">
          {result == null ? <AiOutlineLoading className="reactLoadingCircle" /> : <RxCrossCircled />}
          <p className="main-no-bit-warning-text">
            {result == null && 'Loading'}
            {result?.showBits[0].id === 'ERROR' &&
              (isLoggedIn ? 'Try to follow someone to see their bits!' : 'No Bits Yet!')}
          </p>
        </div>
      )}
    </div>
  );
}

function Home({ isLoggedIn }: { isLoggedIn: boolean }) {
  const listBits = (
    <div className="page-content">
      <div className="page-center-content">{ListBits(isLoggedIn)}</div>
      <div className="page-right-content">{seasonalContent}</div>
    </div>
  );

  return <div className="home-page-container">{listBits}</div>;
}
export default Home;
