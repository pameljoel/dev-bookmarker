import ChunkValue from "../chunkValue/ChunkValue";
import RemoveButton from "../buttons/RemoveButton";
import React from "react";

type Props = {
  value: ChunkValue,
  chunkId: number,
  updateAdditionalValue: (chunkId: ChunkId) => void,
  onClick: () => void,
  onKeyDown: (e: any) => void
}

const AdditionalChunkRow: React.FC<Props> = ({ value, chunkId , updateAdditionalValue, onClick, onKeyDown }) => {
  return <div
    className={`${
      value.isAdditionalValue ? "url-chunk__additional-value" : ""
    }`}
  >
    <ChunkValue
      chunkValue={value.value}
      chunkId={chunkId}
      valueId={value.valueId}
      isAdditionalValue={value.isAdditionalValue}
      updateAdditionalValue={
        updateAdditionalValue
      }
    />
    {value.isAdditionalValue && (
      <RemoveButton
        onClick={onClick}
        onKeyDown={onKeyDown}
      />
    )}
  </div>;
}

export default AdditionalChunkRow;
