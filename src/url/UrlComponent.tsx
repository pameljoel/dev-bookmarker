import React, { useEffect } from 'react';
import UrlChunks from './urlChunk/UrlChunks';
import SaveUrlButton from './partials/SaveUrlButton';

type Props = {
  chunks: Chunks,
  saveUrls: any,
  addAdditionalValue: any,
  removeAdditionalValue: any,
  updateAdditionalValue: any
}

function makeArrayOfChunkValues(chunks: Chunks): ArrayOfChunkValues {
  return chunks.map((part: Chunk) => part.values[0].value);
}

const addToUrl = (urlChunks: Chunks) => makeArrayOfChunkValues(urlChunks);

const makeArrayOfValues = (chunks: Chunks) => {
  const arrayOfParts = [];

  for (let i = 0; i < chunks.length; i += 1) {
    const part = chunks[i];
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
  chunks,
  saveUrls,
  addAdditionalValue,
  removeAdditionalValue,
  updateAdditionalValue,
}) => {
  useEffect(() => {
    addToUrl(chunks);
  }, [chunks]);

  return (
    <div>
      <UrlChunks
        chunks={chunks}
        addAdditionalValue={addAdditionalValue}
        removeAdditionalValue={removeAdditionalValue}
        updateAdditionalValue={updateAdditionalValue}
      />

      <SaveUrlButton onClick={() => saveUrls(makeArrayOfValues(chunks))} />
    </div>
  );
};

export default UrlComponent;
