import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { RxCrossCircled } from 'react-icons/rx';
import BitBox from '../../components/Bits/bits';
import WriteBitBox from '../../components/Bits/writeBits';
import { showBitsQuery, showBitsQueryVariables, showBitsQueryResult } from '../../components/Query/bit.query';
import seasonalContent from '../../components/Seasonal/seasonal';
import Loading from '../../../../components/Loading/loading';

function ListBits(
  isLoggedIn: boolean,
  result: showBitsQueryResult['showBits'] | null | undefined,
  setResult: any,
  resultShowing: any,
  setResultShowing: any,
) {
  const [reBit, setReBit] = useState<[string, string] | string | null>(null);
  const [bitAttachment, setBitAttachment] = useState<File | null>(null);
  const [showBits] = useLazyQuery<showBitsQueryResult, showBitsQueryVariables>(showBitsQuery, {
    onCompleted: (data: showBitsQueryResult) => {
      const showBitsData = data.showBits
        // TODO: Impl Recommendation system / better random algo
        .sort(() => Math.random() - 0.5);
      setResult(showBitsData);
      setResultShowing(showBitsData.slice(0, 5));
    },
    onError: () => {
      setResult(undefined);
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

      {resultShowing && resultShowing.length > 0 ? (
        resultShowing.map(
          (item: showBitsQueryResult['showBits'][0]) =>
            item?.id && (
              <BitBox
                setReBit={setReBit}
                setBitAttachment={setBitAttachment}
                isLoggedIn={isLoggedIn}
                showInHomepage
                key={item?.id}
                data={item}
              />
            ),
        )
      ) : (
        <div className="main-no-bit-warning">
          {result && <RxCrossCircled />}
          <div className="main-no-bit-warning-text">
            <Loading boxWidth="20px" showLoading={result == null} />
            {result && (result === null ? 'No Bits Yet!' : 'Try to follow someone to see their bits!')}
          </div>
        </div>
      )}
    </div>
  );
}

function Home({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [result, setResult] = useState<showBitsQueryResult['showBits'] | null | undefined>(null);
  const [resultShowing, setResultShowing] = useState<any | null>(null);

  const loadBits = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.target as HTMLDivElement;
    if (Math.floor(target.scrollHeight - target.scrollTop) <= target.clientHeight) {
      setResultShowing((prev: any) => {
        console.log(prev, result);
        if (!result) return prev;
        const newResult = result?.slice(prev.length, prev.length + 5);
        return newResult?.length > 0 ? [...prev, ...newResult] : prev;
      });
    }
  };

  useEffect(() => {
    loadBits({ target: document.querySelector('.page-center-content') as HTMLDivElement } as unknown as React.UIEvent<
      HTMLDivElement,
      UIEvent
    >);
  }, [result]);

  const listBits = (
    <div className="page-content">
      <div className="page-center-content" onScroll={loadBits}>
        {ListBits(isLoggedIn, result, setResult, resultShowing, setResultShowing)}
      </div>
      <div className="page-right-content">{seasonalContent}</div>
    </div>
  );

  return <div className="home-page-container">{listBits}</div>;
}
export default Home;
