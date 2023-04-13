/* eslint-disable react/function-component-definition */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React from 'react';

export default function ViewBit({
  viewBitID,
  setViewBitId,
}: {
  viewBitID: String | null;
  setViewBitId: (viewBitID: String | null) => void;
}) {
  return <div className="view-bit-container">{viewBitID}</div>;
}
