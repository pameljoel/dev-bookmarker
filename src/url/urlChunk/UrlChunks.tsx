import UrlChunk from "./UrlChunk";
import React from "react";
import {AddAdditionaValue, Chunks, RemoveAdditionalValue, UpdateAdditionalValue} from "../../type";

type Props = {
  chunks: Chunks,
  addAdditionalValue: AddAdditionaValue;
  removeAdditionalValue: RemoveAdditionalValue;
  updateAdditionalValue: UpdateAdditionalValue;
}

const UrlChunks: React.FC<Props> = ({ chunks, addAdditionalValue, removeAdditionalValue, updateAdditionalValue }) => {
  const hasChunks = chunks && chunks.length > 0;
  return <div className="url">
    {hasChunks && chunks.map((chunk) => {
      const {
        name,
        chunkClass,
        chunkId,
        values,
        chunkType,
      } = chunk;

       return <UrlChunk
          key={chunkId}
          name={name}
          chunkClass={chunkClass}
          values={values}
          chunkType={chunkType}
          chunkId={chunkId}
          addAdditionalValue={addAdditionalValue}
          removeAdditionalValue={removeAdditionalValue}
          updateAdditionalValue={updateAdditionalValue}
        />
    }
    )}
  </div>
}

export default UrlChunks;
