import React, { useEffect, useState } from 'react';
import createPersistedState from 'use-persisted-state';
import Header from './Header';
import UrlAnalyzer from '../url/UrlAnalyzer';
import { createRandomId, makeUrlString } from '../url/partials/utils';
import { generateUrl } from '../url/partials/generateUrl';


const useBookMakerState = createPersistedState('bookmaker');
const useUrlState = createPersistedState('bookmakerSavedUrls');

const DEFAULT_URL = 'http://www.google.com/my-section/my-page.html?id="1"&queryStringKey="queryStringValue"#myID';

const generateUrlsToSave = (...chunks) => {
  const newUrls = [];
  const newArray = [];
  const chunk = chunks[0];
  const max = chunk.length - 1;

  const saveChunks = (startArray, index) => {
    const actualChunk = chunk[index];

    actualChunk.forEach((urlChunkString) => {
      const startArrayCopy = startArray.slice();
      startArrayCopy.push(urlChunkString);

      if (index === max) newArray.push(startArrayCopy);
      else { saveChunks(startArrayCopy, index + 1); }
    });
  };

  saveChunks([], 0);

  newArray.map(i => newUrls.push(makeUrlString(i)));
  return newArray;
};

export const Home = () => {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [chunks, setParts] = useBookMakerState([]);
  const [savedUrls, setSavedUrls] = useUrlState([]);

  const updateInput = (value) => {
    const newParts = generateUrl(value, chunks);
    setParts(newParts);
    setUrl(value);
  };

  useEffect(() => {
    if (url) updateInput(url);
  }, [url]);

  const onKeypress = (key) => {
    if (key === 13) {
      setUrl(url);
    }
  };

  const addAdditionalValue = (chunkId) => {
    const object = {
      valueId: createRandomId(),
      value: '',
      isAdditionalValue: true,
    };

    const copy = chunks.slice();
    copy.map(chunk => chunk.chunkId === chunkId && chunk.values.push(object));
    setParts(copy);
  };

  const updateAdditionalValue = (input, chunkId, valueId) => {
    const chunksCopy = chunks.slice();
    chunksCopy.map(chunk => chunk.chunkId === chunkId && chunk.values.map(value => (value.valueId === valueId ? value.value = input : null)));
    setParts(chunksCopy);
  };

  const removeAdditionalValue = (chunkId, valueId) => {
    const chunksCopy = chunks.slice();
    chunksCopy.map(chunk => chunk.chunkId === chunkId && chunk.values.map((value, i) => value.valueId === valueId && chunk.values.splice(i, 1)));
    setParts(chunksCopy);
  };

  const saveUrls = (chunks) => {
    const urls = generateUrlsToSave(chunks);
    setSavedUrls(urls);
  };

  return (
    <div>
      <Header
        url={url}
        onKeypress={onKeypress}
        updateInput={updateInput}
        setUrl={setUrl}
      />
      <UrlAnalyzer
        chunks={chunks}
        savedUrls={savedUrls}
        addAdditionalValue={addAdditionalValue}
        removeAdditionalValue={removeAdditionalValue}
        updateAdditionalValue={updateAdditionalValue}
        saveUrls={saveUrls}
      />
    </div>
  );
};

export default Home;
