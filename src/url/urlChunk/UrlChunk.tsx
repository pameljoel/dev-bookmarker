import React from "react";
import AddButton from "../buttons/AddButton";
import AdditionalChunkRow from "./AdditionalChunkRow";
import './UrlChunk.scss';

type Props = {
  chunkClass: string;
  name: string;
  chunkId: number;
  chunkType: ChunkType;
  values: ChunkValues;
  addAdditionalValue: AddAdditionaValue;
  removeAdditionalValue: RemoveAdditionalValue;
  updateAdditionalValue: UpdateAdditionalValue;
}

type OnKeyDown = {
  key: number,
  chunkId: number,
  valueId?: number
}

type HeaderProps = {
  name: string,
  chunkId: ChunkId,
  onClick: () => void,
  handleOnKeyDown: (e: any) => void
}

function Header({ name, onClick, handleOnKeyDown, chunkId }: HeaderProps) {
  return <div className="url-chunk__header">
    <div className="url-chunk__header-name">
      {name}
    </div>
    <div className="url-chunk__header-button">
      <AddButton
        onClick={onClick}
        chunkId={chunkId}
        handleOnKeyDown={handleOnKeyDown}
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
          chunkId={chunkId}
          handleOnKeyDown={handleOnKeyDown}
        />
        <div className="url-chunk__value-container">
          {chunkType && values.map(value => (
              <AdditionalChunkRow
                key={value.valueId}
                chunkType={chunkType}
                value={value}
                updateAdditionalValue={updateAdditionalValue}
                onClick={() => removeAdditionalValue(chunkId, value.valueId)}
                chunkId={chunkId}
                valueId={value.valueId}
                handleOnKeyDown={handleOnKeyDown}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UrlChunk;
