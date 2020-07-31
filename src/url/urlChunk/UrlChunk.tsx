import React from 'react';
import PropTypes from 'prop-types';
import Value from '../partials/ChunkValue';

type Props = {
  cssClass: string;
  name: string;
  partId: number;
  partType: string;
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
    cssClass,
    name,
    partType,
    values= [],
    partId,
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
    <div className={`url-part ${cssClass}`}>
      <div className="url-part__main">
        <div className="url-part__header">
          <div className="url-part__header-name">
            {name}
          </div>
          <div className="url-part__header-button">
            <button
              role="button"
              className="add-value"
              onClick={() => addAdditionalValue(partId)}
              onKeyDown={e => onKeyDown({ key: e.keyCode, chunkId: partId })}
            >
              Add value
            </button>
          </div>
        </div>
        <div className="url-part__value-container">
          {partType === 'string'
              && values.map(value => (
                <div
                  key={value.valueId}
                  className={`${
                    value.isAdditionalValue ? 'url-part__additional-value' : ''
                  }`}
                >
                  <Value
                    partValue={value.value}
                    partId={partId}
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
                    onClick={() => removeAdditionalValue(partId, value.valueId)}
                    onKeyDown={e => onKeyDown({ key: e.keyCode, chunkId: partId, valueId: value.valueId })}
                  >
                    Delete
                  </button>
                  )}
                </div>
              ))}

          {partType
              && partType === 'object'
              && values.map(value => (
                <div
                  key={value.valueId}
                  className={`${
                    value.isAdditionalValue ? 'url-part__additional-value' : ''
                  }`}
                >
                  <Value
                    partValue={value.value}
                    partId={partId}
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
                      onClick={() => removeAdditionalValue(partId, value.valueId)}
                      onKeyDown={e => onKeyDown({ key: e.keyCode, chunkId: partId, valueId: value.valueId })}
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
