import ChunkValue from "../chunkValue/ChunkValue";
import RemoveButton from "../buttons/RemoveButton";
import React from "react";
import {ChunkType, ChunkValueType} from "../../type";

type Props = {
  value: ChunkValueType,
  chunkId: number,
  valueId: number,
  updateAdditionalValue: (chunkId: number) => void,
  onClick: () => void,
  handleOnKeyDown: (e: any) => void,
  chunkType: ChunkType,
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
