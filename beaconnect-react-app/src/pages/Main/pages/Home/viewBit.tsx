import React from 'react';

export default function ViewBit({ viewBitID }: { viewBitID: String | null }) {
  return <div className="view-bit-container">{viewBitID}</div>;
}
