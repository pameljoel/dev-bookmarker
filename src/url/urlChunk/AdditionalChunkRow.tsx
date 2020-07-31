import ChunkValue from "../chunkValue/ChunkValue";
import RemoveButton from "../buttons/RemoveButton";
import React from "react";

function AdditionalChunkRow(props: { value: ChunkValue, chunkId: number, updateAdditionalValue: (chunkId: ChunkId) => void, onClick: () => void, onKeyDown: (e: any) => void }) {
  return <div
    className={`${
      props.value.isAdditionalValue ? "url-chunk__additional-value" : ""
    }`}
  >
    <ChunkValue
      chunkValue={props.value.value}
      chunkId={props.chunkId}
      valueId={props.value.valueId}
      isAdditionalValue={props.value.isAdditionalValue}
      updateAdditionalValue={
        props.updateAdditionalValue
      }
    />
    {props.value.isAdditionalValue && (
      <RemoveButton
        onClick={props.onClick}
        onKeyDown={
          props.onKeyDown
        }
      />
    )}
  </div>;
}

export default AdditionalChunkRow;
