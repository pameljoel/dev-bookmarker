import React, { useEffect, useState } from 'react';
import Header from './Header';
import UrlAnalyzer from '../url/UrlAnalyzer';
import { addPart, createRandomId, makeUrlString } from '../url/utils';
import './Home.css';

export const Home = () => {
  const defaultUrl = 'http://www.quotidiano.net:5000/my-section/my-page.html?id="1"&omg="omggoog"#myID';
  const [url, setUrl] = useState(defaultUrl);
  const [parts, setParts] = useState([]);
  const [savedUrls, setSavedUrls] = useState([]);

  const generateUrl = (input) => {
    let newUrl;

    try {
      newUrl = new URL(input);

      const copy = parts.slice();
      const hostRegExp = /^([a-zA-Z0-9][a-zA-Z0-9-_]*[^.])/;
      const hostnameRegExp = /\.{1}(([\S][^\]])*)/;

      if (newUrl.protocol) {
        addPart(copy, 'protocol', newUrl.protocol, null, 'string');
      }

      if (newUrl.host) {
        addPart(copy, 'host', newUrl.host, hostRegExp, 'string');
      }

      if (newUrl.hostname) {
        addPart(copy, 'hostname', newUrl.hostname, hostnameRegExp, 'string');
      }

      if (newUrl.port) {
        addPart(copy, 'port', newUrl.port, null, 'string');
      }

      if (newUrl.pathname) {
        addPart(copy, 'pathname', newUrl.pathname, null, 'string');
      }

      if (newUrl.searchParams) {
        addPart(copy, 'searchParams', newUrl.searchParams, null, 'object');
      }

      if (newUrl.hash) {
        addPart(copy, 'hash', newUrl.hash, null, 'string');
      }

      setParts(copy);
    } catch (error) {
      newUrl = null;
    }
  };

  const updateInput = (value) => {
    generateUrl(value);
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
        addAdditionalValueCallback={addAdditionalValue}
        removeAdditionalValueCallback={removeAdditionalValue}
        updateAdditionalValueCallback={updateAdditionalValue}
        saveUrlsCallback={saveUrls}
      />
    </div>
  );
};

export default Home;
