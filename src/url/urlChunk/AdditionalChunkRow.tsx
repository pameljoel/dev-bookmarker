import ChunkValue from "../chunkValue/ChunkValue";
import RemoveButton from "../buttons/RemoveButton";
import React from "react";

type Props = {
  value: ChunkValue,
  chunkId: number,
  valueId: number,
  updateAdditionalValue: (chunkId: ChunkId) => void,
  onClick: () => void,
  handleOnKeyDown: (e: any) => void
}

const AdditionalChunkRow: React.FC<Props> = ({ value, chunkId, updateAdditionalValue, onClick, handleOnKeyDown }) => {
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
        chunkId={chunkId}
        valueId={value.valueId}
        handleOnKeyDown={handleOnKeyDown}
      />
    )}
  </div>;
};

export default AdditionalChunkRow;
