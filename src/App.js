import React, { Component } from 'react';

import UrlComponent from './UrlComponent';

import './App.css';

function createPart(name, value, type) {
  const object = {
    name,
    value: null,
    cssClass: `url-part--${name}`,
    partType: type,
    id: Math.round(Math.random() * 1000000),
    additionalValues: [
      {
        value: 'additional value 1',
      },
      {
        value: 'additional value 2',
      },
      {
        value: 'additional value 3',
      },
    ],
  };

  if (type === 'string') {
    object.value = value;
  } else {
    object.value = [];
    for (const p of value) {
      const tempObject = {
        paramName: null,
        paramValue: null,
      };
      tempObject.paramName = p[0];
      tempObject.paramValue = p[1];
      object.value.push(tempObject);
    }
  }

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

function replaceOldArrayValues(newValues) {
  const newArray = [];
  for (const v of newValues) {
    const tempObject = {
      paramName: null,
      paramValue: null,
    };
    tempObject.paramName = v[0];
    tempObject.paramValue = v[1];

    newArray.push(tempObject);
  }
  return newArray;
}

function updatePart(parts, name, value, type) {
  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (part.name === name) {
      if (type === 'string') {
        part.value = value;
      } else if (typeof value === 'object') {
        const oldValues = part.value;
        const newValues = value;

        part.value = replaceOldArrayValues(newValues, oldValues);
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

function addPart(array, name, value, regExp, type) {
  if (isPartCreated(array, name)) {
    updatePart(array, name, regExp ? matchRegExp(value, regExp) : value, type);
  } else {
    addPartToArray(
      array,
      createPart(name, regExp ? matchRegExp(value, regExp) : value, type),
    );
  }
}

class App extends Component {
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
    this.saveUrl = this.saveUrl.bind(this);
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

  updateInput(value) {
    this.generateUrl(value);
    this.setState({ input: value });
  }

  saveUrl(url) {
    const { savedUrls } = this.state;
    const savedUrlsCopy = savedUrls;
    savedUrlsCopy.push(url);

    this.setState({ savedUrls: savedUrlsCopy });
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
    const { input, parts, url } = this.state;
    return (
      <div>
        <div className="url-hero">
          <div className="container">
            <h1>Dev Marker</h1>
            <h2>The bookmarker for devs</h2>
            <div className="url-hero__description">
              Want to bookmark your pages on multiple
              {' '}
              <strong>sub-domains</strong>
,
              {' '}
              <strong>domains</strong>
,
              {' '}
              <strong>ports</strong>
? MAybe with different parameters every
              time?
              <br />
              This is your lucky day.
              {' '}
              <strong>Try it out.</strong>
            </div>
            <label
              htmlFor="bookmarkInput"
              id="labelForInput"
              className="url-hero__label"
            >
              Bookmark an url
              <div className="url-hero__url">
                <input
                  type="text"
                  value={input}
                  name="bookmarkInput"
                  id="bookmarkInput"
                  className="url-hero__input"
                  onChange={(e) => {
                    this.updateInput(e.target.value);
                    this.onKeypress(e.keyCode);
                  }}
                />
                <button
                  className="url-hero__save"
                  type="button"
                  onClick={() => this.prepareUrl(input)}
                >
                  save
                </button>
              </div>
            </label>
          </div>
        </div>
        {url}
        <div className="main-url">
          <div className="container">
            <h2 className="main-url__title">Examine your url</h2>
            <p className="main-url__subtitle">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis dolore dolor nisi autem officia officiis provident
              sapiente placeat sint aperiam quod, quae amet architecto odio
              similique facilis asperiores unde cupiditate!
            </p>
            {input}
            <UrlComponent saveUrlCallback={this.saveUrl} parts={parts} />
          </div>
        </div>

        {this.state.savedUrls.map((url, i) => <div key={`${url}-${i}`}>{url}</div>)}
      </div>
    );
  }
}

export default App;
