import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const focusChunk = (ref) => {
  if (ref && ref.current) ref.current.focus();
};

const ChunkValue = ({
  chunkValue,
  isAdditionalValue,
  chunkId,
  valueId,
  updateAdditionalValue,
}) => {
  const chunkInputRef = useRef(null);

  useEffect(() => {
    focusChunk(chunkInputRef);
  }, []);

  if (!isAdditionalValue && !chunkValue) return null;

  return (
    isAdditionalValue ? (
      <input
        type="text"
        value={chunkValue}
        placeholder="Add value"
        onChange={e => updateAdditionalValue(e.target.value, chunkId, valueId)}
        ref={chunkInputRef}
      />
    ) : (
      <div className="url-chunk__value">
        {chunkValue}
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
  chunkValue: PropTypes.string,
};

ChunkValue.defaultProps = {
  isAdditionalValue: false,
  chunkValue: '',
};
