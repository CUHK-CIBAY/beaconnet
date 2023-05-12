import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { RxCrossCircled } from 'react-icons/rx';
import BitBox from '../../components/Bits/bits';
import WriteBitBox from '../../components/Bits/writeBits';
import { showBitsQuery, showBitsQueryVariables, showBitsQueryResult } from '../../components/Query/bit.query';
import seasonalContent from '../../components/Seasonal/seasonal';
import Loading from '../../../../components/Loading/loading';

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

      {result?.showBits[0] && result?.showBits[0].id !== 'ERROR' ? (
        result?.showBits
          .sort(() => Math.random() - 0.5)
          .map(
            (item: showBitsQueryResult['showBits'][0]) =>
              item?.id && (
                <BitBox
                  setReBit={setReBit}
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
          {result !== null && <RxCrossCircled />}
          <div className="main-no-bit-warning-text">
            <Loading boxWidth="20px" showLoading={result == null} />
            {result && (result?.showBits[0] ? 'No Bits Yet!' : 'Try to follow someone to see their bits!')}
          </div>
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
