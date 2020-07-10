import React, { Component } from 'react';
import { Header } from './Header';
import { UrlAnalizer } from '../url/UrlAnalizer';
import './Home.css';


function createRandomId() {
  return Math.round(Math.random() * 10000000000);
}

function makeParamsString(params) {
  let string = '';
  for (const p of params) {
    const paramName = p[0];
    const paramValue = p[1];
    if (paramName) {
      string += `&${paramName}`;
    }
    if (paramValue) {
      string += `=${paramValue}`;
    }
  }
  return string;
}

function makeUrlString(urlArray) {
  const string = urlArray.join('');
  return string;
}

function createPart(name, newValue, type) {
  const object = {
    name,
    values: [],
    cssClass: `url-part--${name}`,
    partType: type,
    partId: createRandomId(),
  };

  const valueObject = {
    valueId: createRandomId(),
    value: '',
    isAdditionalValue: false,
  };

  if (type === 'string') {
    if (name === 'port') valueObject.value += ':';
    valueObject.value += newValue;
    if (name === 'protocol') valueObject.value += '//';
  } else {
    valueObject.value = makeParamsString(newValue);
  }

  object.values.push(valueObject);

  return object;
}

function matchRegExp(input, regex) {
  if (!input) {
    return false;
  }
  if (!regex) {
    return false;
  }

  const result = input.match(regex);

  if (typeof result === 'object' && result !== null) {
    return result[0];
  }
  return result;
}

function updatePart(parts, name, newValue, type) {
  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (part.name === name) {
      if (type === 'string') {
        part.values[0].value = newValue;
      } else if (typeof newValue === 'object') {
        part.values[0].value = makeParamsString(newValue);
      }
    }
  }
}

function addPartToArray(parts, newObject) {
  parts.push(newObject);
  return parts;
}

function isPartCreated(parts, name) {
  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (part.name === name) {
      return true;
    }
  }
  return false;
}

function addPart(array, name, newValue, regExp, type) {
  if (isPartCreated(array, name)) {
    updatePart(
      array,
      name,
      regExp ? matchRegExp(newValue, regExp) : newValue,
      type,
    );
  } else {
    addPartToArray(
      array,
      createPart(name, regExp ? matchRegExp(newValue, regExp) : newValue, type),
    );
  }
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input:
        'http://www.quotidiano.net:5000/my-section/my-page.html?id="1"&omg="omggoog"#myID',
      parts: [],
      savedUrls: [],
    };
    this.updateInput = this.updateInput.bind(this);
    this.prepareUrl = this.prepareUrl.bind(this);
    this.saveUrls = this.saveUrls.bind(this);
    this.addAdditionalValue = this.addAdditionalValue.bind(this);
    this.removeAdditionalValue = this.removeAdditionalValue.bind(this);
    this.updateAdditionalValue = this.updateAdditionalValue.bind(this);
  }

  componentDidMount() {
    const { input } = this.state;
    if (input) {
      this.generateUrl(input);
    }
  }

  onKeypress(key) {
    const { input } = this.state;
    if (key === 13) {
      this.prepareUrl(input);
    }
  }

  addAdditionalValue(partId) {
    const object = {
      valueId: createRandomId(),
      value: '',
      isAdditionalValue: true,
    };

    const { parts } = this.state;
    const partsCopy = parts;
    partsCopy.map(part => part.partId === partId && part.values.push(object));
    this.setState({ parts: partsCopy });
  }

  updateAdditionalValue(input, partId, valueId) {
    const { parts } = this.state;
    const partsCopy = parts;
    partsCopy.map(part => part.partId === partId && part.values.map(value => (value.valueId === valueId ? value.value = input : null)));
    this.setState({ parts: partsCopy });
  }

  removeAdditionalValue(partId, valueId) {
    const { parts } = this.state;
    const partsCopy = parts;
    partsCopy.map(part => part.partId === partId && part.values.map((value, i) => value.valueId === valueId && part.values.splice(i, 1)));
    this.setState({ parts: partsCopy });
  }

  updateInput(value) {
    this.generateUrl(value);
    this.setState({ input: value });
  }

  saveUrls(...args) {
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
    array.map(url => newUrls.push(makeUrlString(url)));

    this.setState({ savedUrls: newUrls });
    return array;
  }

  generateUrl(input) {
    let url;

    try {
      url = new URL(input);

      const { parts } = this.state;
      const partsCopy = parts;
      const hostRegExp = /^([a-zA-Z0-9][a-zA-Z0-9-_]*[^.])/;
      const hostnameRegExp = /\.{1}(([\S][^\]])*)/;

      if (url.protocol) {
        addPart(partsCopy, 'protocol', url.protocol, null, 'string');
      }

      if (url.host) {
        addPart(partsCopy, 'host', url.host, hostRegExp, 'string');
      }

      if (url.hostname) {
        addPart(partsCopy, 'hostname', url.hostname, hostnameRegExp, 'string');
      }

      if (url.port) {
        addPart(partsCopy, 'port', url.port, null, 'string');
      }

      if (url.pathname) {
        addPart(partsCopy, 'pathname', url.pathname, null, 'string');
      }

      if (url.searchParams) {
        addPart(partsCopy, 'searchParams', url.searchParams, null, 'object');
      }

      if (url.hash) {
        addPart(partsCopy, 'hash', url.hash, null, 'string');
      }

      this.setState({
        parts: partsCopy,
      });
    } catch (error) {
      url = null;
    }
  }

  prepareUrl(url) {
    this.setState({ url });
  }

  render() {
    const {
      input, parts, savedUrls,
    } = this.state;
    return (
      <div>
        <Header input={input} />
        <UrlAnalizer
          parts={parts}
          savedUrls={savedUrls}
          addAdditionalValueCallback={this.addAdditionalValue}
          removeAdditionalValueCallback={this.removeAdditionalValue}
          updateAdditionalValueCallback={this.updateAdditionalValue}
          saveUrlsCallback={this.saveUrls}
        />
      </div>
    );
  }
}
