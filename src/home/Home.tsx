import React, { useEffect, useState } from 'react';
import Header from './Header';
import UrlAnalyzer from '../url/UrlAnalyzer';
import { createRandomId, makeUrlString } from '../url/partials/utils';
import { createChunks } from '../url/partials/createChunks';
import {Chunks, SavedUrlWithParts} from "../type";

const DEFAULT_URL = 'https://globalhotels.lastminute.com:3000/global-location-svc-autocomplete-1.0/services/json/autocomplete?isGeoSearch=true&numRequested=30&radius=300km&isInternalCityId=true&isOpenSearch=true&locale=EN&airportDetails=true&resolveTo=AIR#abc';

export const generateUrlsToSave = (chunks: SavedUrlWithParts[])  => {
  // TODO: remove function
  const newUrls = [];
  // @ts-ignore
  const newArray = [];
  const firstChunk = chunks;
  const max = firstChunk.length - 1;

  const saveChunks = (startArray: SavedUrlWithParts, index: number) => {
    const savedUrlPart = firstChunk[index];

    savedUrlPart.forEach((urlPartString: string) => {
      const startArrayCopy = startArray.slice();
      startArrayCopy.push(urlPartString);

      if (index === max) newArray.push(startArrayCopy);
      else { saveChunks(startArrayCopy, index + 1); }
    });
  };

  saveChunks([], 0);

  // @ts-ignore
  newArray.map(i => newUrls.push(makeUrlString(i)));
  // @ts-ignore
  return newArray;
};


export const generateUrlStrings = (chunks: SavedUrlWithParts[]) => {
  return chunks.map(el => el[0]).join('');
}

export const Home = () => {
  const [url, setUrl] = useState<string>(DEFAULT_URL);
  const [chunks, setChunks] = useState<Chunks>([]);
  const [savedUrls, setSavedUrls] = useState<string[]>([]);

  const updateUrl = (url: string) => {
    const newParts = createChunks(url, chunks);
    setChunks(newParts);
    setUrl(url);
  };

  useEffect(() => {
    updateUrl(url || '');
  }, [url]);

  const handleOnKeyPress = (key: number) => {
    if (key === 13) {
      setUrl(url);
    }
  };

  const addAdditionalValue = (chunkId: number) => {
    const object = {
      valueId: createRandomId(),
      value: '',
      isAdditionalValue: true,
    };

    const copy = chunks.slice();
    copy.map(chunk => chunk.chunkId === chunkId && chunk.values.push(object));
    setChunks(copy);
  };

  const updateAdditionalValue = (input: string, chunkId: number, valueId: number) => {
    const chunksCopy = chunks.slice();
    chunksCopy.map(chunk => chunk.chunkId === chunkId && chunk.values.map(value => (value.valueId === valueId ? value.value = input : null)));
    setChunks(chunksCopy);
  };

  const removeAdditionalValue = (chunkId: number, valueId: number) => {
    const chunksCopy = chunks.slice();
    chunksCopy.map(chunk => chunk.chunkId === chunkId && chunk.values.map((value, i) => value.valueId === valueId && chunk.values.splice(i, 1)));
    setChunks(chunksCopy);
  };

  const saveUrls = (chunks: [SavedUrlWithParts]) => {
    const urls = generateUrlsToSave(chunks);
    // TODO: use urls2
    // const urls2 = generateUrlStrings(chunks);
    // console.log('aaaa saveUrls', { chunks, urls, urls2 });
    setSavedUrls(urls);
  };

  return (
    <div>
      <Header
        url={url}
        handleOnKeyPress={handleOnKeyPress}
        updateInput={updateUrl}
        setUrl={setUrl}
      />
      <UrlAnalyzer
        chunks={chunks}
        savedUrls={savedUrls}
        addAdditionalValue={addAdditionalValue}
        removeAdditionalValue={removeAdditionalValue}
        updateAdditionalValue={updateAdditionalValue}
        saveUrls={saveUrls}
        originalUrl={url}
      />
    </div>
  );
};

export default Home;
