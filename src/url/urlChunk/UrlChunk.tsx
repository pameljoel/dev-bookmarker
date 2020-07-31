import React from 'react';
import Value from '../partials/ChunkValue';

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
    <div className={`url-part ${chunkClass}`}>
      <div className="url-part__main">
        <div className="url-part__header">
          <div className="url-part__header-name">
            {name}
          </div>
          <div className="url-part__header-button">
            <button
              type="button"
              className="add-value"
              onClick={() => addAdditionalValue(chunkId)}
              onKeyDown={e => onKeyDown({ key: e.keyCode, chunkId: chunkId })}
            >
              Add value
            </button>
          </div>
        </div>
        <div className="url-part__value-container">
          {chunkType === 'string'
              && values.map(value => (
                <div
                  key={value.valueId}
                  className={`${
                    value.isAdditionalValue ? 'url-part__additional-value' : ''
                  }`}
                >
                  <Value
                    partValue={value.value}
                    chunkId={chunkId}
                    valueId={value.valueId}
                    isAdditionalValue={value.isAdditionalValue}
                    updateAdditionalValue={
                      updateAdditionalValue
                    }
                  />
                  {value.isAdditionalValue && (
                  <button
                    type="button"
                    className="remove-value"
                    onClick={() => removeAdditionalValue(chunkId, value.valueId)}
                    onKeyDown={e => onKeyDown({ key: e.keyCode, chunkId: chunkId, valueId: value.valueId })}
                  >
                    Delete
                  </button>
                  )}
                </div>
              ))}

          {chunkType
              && chunkType === 'object'
              && values.map(value => (
                <div
                  key={value.valueId}
                  className={`${
                    value.isAdditionalValue ? 'url-part__additional-value' : ''
                  }`}
                >
                  <Value
                    partValue={value.value}
                    chunkId={chunkId}
                    valueId={value.valueId}
                    updateAdditionalValue={
                      updateAdditionalValue
                    }
                    isAdditionalValue={value.isAdditionalValue}
                  />
                  {value.isAdditionalValue && (
                    <button
                      type="button"
                      className="remove-value"
                      onClick={() => removeAdditionalValue(chunkId, value.valueId)}
                      onKeyDown={e => onKeyDown({ key: e.keyCode, chunkId: chunkId, valueId: value.valueId })}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default UrlChunk;
