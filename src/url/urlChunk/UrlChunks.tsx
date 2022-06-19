import UrlChunk from "./UrlChunk";
import React from "react";

type Props = {
  chunks: Chunks,
  addAdditionalValue: (chunkId: ChunkId) => void;
  removeAdditionalValue: (chunkId: ChunkId, valueId: number) => void;
  updateAdditionalValue: (chunkId: ChunkId) => void;
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
