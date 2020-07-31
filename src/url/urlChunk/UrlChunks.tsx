import UrlChunk from "./UrlChunk";
import React from "react";

type Props = {
  parts: Chunks,
  addAdditionalValue: (chunkId: ChunkId) => void;
  removeAdditionalValue: (chunkId: ChunkId, valueId: number) => void;
  updateAdditionalValue: (chunkId: ChunkId) => void;
}

const UrlChunks: React.FC<Props> = ({ parts, addAdditionalValue, removeAdditionalValue, updateAdditionalValue }) => {
  return <div className="url">
    {parts.map((part) => {
      const {
        name,
        cssClass,
        partId,
        values,
        partType,
        isAdditionalValue
      } = part;

       return <UrlChunk
          key={partId}
          name={name}
          cssClass={cssClass}
          values={values}
          partType={partType}
          partId={partId}
          addAdditionalValue={addAdditionalValue}
          removeAdditionalValue={removeAdditionalValue}
          updateAdditionalValue={updateAdditionalValue}
        />
    }
    )}
  </div>
}

export default UrlChunks;
