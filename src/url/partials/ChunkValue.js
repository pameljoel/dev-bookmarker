import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const focusChunk = (ref) => {
  if (ref && ref.current) ref.current.focus();
};

const ChunkValue = ({
  partValue, isAdditionalValue, chunkId, valueId, updateAdditionalValue,
}) => {
  const chunkInputRef = useRef(null);

  useEffect(() => {
    focusChunk(chunkInputRef);
  }, []);

  return (
    isAdditionalValue ? (
      <input
        type="text"
        value={partValue}
        placeholder="Add value"
        onChange={e => updateAdditionalValue(e.target.value, chunkId, valueId)}
        ref={chunkInputRef}
      />
    ) : (
      <div className="url-part__value">
        {partValue}
      </div>
    )
  );
};

export default ChunkValue;

ChunkValue.propTypes = {
  updateAdditionalValue: PropTypes.func.isRequired,
  isAdditionalValue: PropTypes.bool,
  chunkId: PropTypes.number.isRequired,
  valueId: PropTypes.number.isRequired,
  partValue: PropTypes.string,
};

ChunkValue.defaultProps = {
  isAdditionalValue: false,
  partValue: '',
};
