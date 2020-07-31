import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import UrlParts from './partials/UrlParts';
import SaveUrlButton from './partials/SaveUrlButton';

type Props = {
  parts: Chunks,
  saveUrls: any,
  addAdditionalValue: any,
  removeAdditionalValue: any,
  updateAdditionalValue: any
}

function makeArrayOfChunkValues(parts: Chunks): ArrayOfChunkValues {
  return parts.map((part: Chunk) => part.values[0].value);
}

const addToUrl = (urlChunks: Chunks) => makeArrayOfChunkValues(urlChunks);

const makeArrayOfValues = (parts: Chunks) => {
  const arrayOfParts = [];

  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    const valuesArray = [];

    for (let j = 0; j < part.values.length; j++) {
      const { value } = part.values[j];
      valuesArray.push(value);
    }

    arrayOfParts.push(valuesArray);
  }
  return arrayOfParts;
};

const UrlComponent: React.FC<Props> = ({
  parts, saveUrls,
  addAdditionalValue,
  removeAdditionalValue,
  updateAdditionalValue,
}) => {
  useEffect(() => {
    addToUrl(parts);
  }, [parts]);

  return (
    <div>
      <UrlParts
        parts={parts}
        addAdditionalValue={addAdditionalValue}
        removeAdditionalValue={removeAdditionalValue}
        updateAdditionalValue={updateAdditionalValue}
      />

      <SaveUrlButton onClick={() => saveUrls(makeArrayOfValues(parts))} />
    </div>
  );
};

export default UrlComponent;
