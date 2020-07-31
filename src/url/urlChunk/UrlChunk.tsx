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

type HeaderProps = {
  name: string,
  onClick: () => void,
  onKeyDown: (e: any) => void
}

function Header({ name, onClick, onKeyDown }: HeaderProps) {
  return <div className="url-chunk__header">
    <div className="url-chunk__header-name">
      {name}
    </div>
    <div className="url-chunk__header-button">
      <AddButton
        onClick={onClick}
        onKeyDown={onKeyDown}
      />
    </div>
  </div>;
}

const UrlChunk: React.FC<Props> = (
  {
    chunkClass,
    name,
    chunkType,
    values = [],
    chunkId,
    addAdditionalValue,
    removeAdditionalValue,
    updateAdditionalValue
  }
) => {
  const handleOnKeyDown = ({ key, chunkId, valueId }: OnKeyDown) => {
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
        <Header
          name={name}
          onClick={() => addAdditionalValue(chunkId)}
          onKeyDown={e => handleOnKeyDown({ key: e.keyCode, chunkId: chunkId })}
        />
        <div className="url-chunk__value-container">
          {chunkType && values.map(value => (
              <AdditionalChunkRow
                key={value.valueId}
                value={value}
                chunkId={chunkId}
                updateAdditionalValue={updateAdditionalValue}
                onClick={() => removeAdditionalValue(chunkId, value.valueId)}
                onKeyDown={
                  e => handleOnKeyDown({
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
