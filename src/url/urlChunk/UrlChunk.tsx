import React from "react";
import AddButton from "../buttons/AddButton";
import AdditionalChunkRow from "./AdditionalChunkRow";

type Props = {
  chunkClass: string;
  name: string;
  chunkId: number;
  chunkType: string;
  values: ChunkValues;
  addAdditionalValue: (chunkId: ChunkId) => void;
  removeAdditionalValue: (chunkId: ChunkId, valueId: number) => void;
  updateAdditionalValue: (chunkId: ChunkId) => void;
}

type OnKeyDown = {
  key: number,
  chunkId: number,
  valueId?: number
}

const UrlChunk: React.FC<Props> = (
  {
    chunkClass,
    name,
    chunkType,
    values= [],
    chunkId,
    addAdditionalValue,
    removeAdditionalValue,
    updateAdditionalValue
  }
) => {
  const onKeyDown = ({ key, chunkId, valueId } : OnKeyDown) => {
    if (key === 13) {
      if (valueId) {
        removeAdditionalValue(chunkId, valueId);
      } else {
        addAdditionalValue(chunkId);
      }
    }
  };

  return (
    <div className={`url-chunk ${chunkClass}`}>
      <div className="url-chunk__main">
        <div className="url-chunk__header">
          <div className="url-chunk__header-name">
            {name}
          </div>
          <div className="url-chunk__header-button">
            <AddButton
              onClick={() => addAdditionalValue(chunkId)}
              onKeyDown={e => onKeyDown({ key: e.keyCode, chunkId: chunkId })}
            />
          </div>
        </div>
        <div className="url-chunk__value-container">
          {chunkType && values.map(value => (
            <AdditionalChunkRow
              key={value.valueId} value={value} chunkId={chunkId}
              updateAdditionalValue={updateAdditionalValue}
              onClick={() => removeAdditionalValue(chunkId, value.valueId)}
              onKeyDown={e => onKeyDown({
                key: e.keyCode,
                chunkId: chunkId,
                valueId: value.valueId
              })}
            />
          )
          )}
        </div>
      </div>
    </div>
  );
};

export default UrlChunk;
