import React, { useEffect, useState } from 'react';
import Header from './Header';
import UrlAnalyzer from '../url/UrlAnalyzer';
import { createRandomId, makeUrlString } from '../url/partials/utils';
import { generateUrl } from '../url/partials/generateUrl';
import './Home.css';

export const Home = () => {
  const defaultUrl = 'http://www.quotidiano.net:5000/my-section/my-page.html?id="1"&omg="omggoog"#myID';
  const [url, setUrl] = useState(defaultUrl);
  const [parts, setParts] = useState([]);
  const [savedUrls, setSavedUrls] = useState([]);


  const updateInput = (value) => {
    const newParts = generateUrl(value, parts);
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

  const addAdditionalValue = (partId) => {
    const object = {
      valueId: createRandomId(),
      value: '',
      isAdditionalValue: true,
    };

    const copy = parts.slice();
    copy.map(part => part.partId === partId && part.values.push(object));
    setParts(copy);
  };

  const updateAdditionalValue = (input, partId, valueId) => {
    const partsCopy = parts.slice();
    partsCopy.map(part => part.partId === partId && part.values.map(value => (value.valueId === valueId ? value.value = input : null)));
    setParts(partsCopy);
  };

  const removeAdditionalValue = (partId, valueId) => {
    const partsCopy = parts.slice();
    partsCopy.map(part => part.partId === partId && part.values.map((value, i) => value.valueId === valueId && part.values.splice(i, 1)));
    setParts(partsCopy);
  };

  const saveUrls = (...args) => {
    const newUrls = [];
    const array = [];
    const arg = args[0];
    const max = arg.length - 1;

    function helper(arr, i) {
      for (let j = 0, l = arg[i].length; j < l; j += 1) {
        const a = arr.slice(0);
        // clone arr
        a.push(arg[i][j]);
        if (i === max) {
          array.push(a);
        } else {
          helper(a, i + 1);
        }
      }
    }

    helper([], 0);
    array.map(i => newUrls.push(makeUrlString(i)));

    setSavedUrls(newUrls);
    return array;
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
        parts={parts}
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
