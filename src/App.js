import React, { Component } from "react";

import UrlComponent from "./UrlComponent";

import "./App.css";

/*

TODO:
  creare un array di parts.
  questo array di parts dev'essere dato a url component
  url component manda a part, part si occupa di gestire la validazione delle singole parti
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input:
        'http://www.quotidiano.net:5000/my-section/my-page.html?id="1"&omg="omggoog"#myID',
      parts: [],
      dirtyInput: "",
      generatedUrl: "",
      urlVariants: [],
      savedUrls: []
    };
    this.updateInput = this.updateInput.bind(this);
    this.prepareUrl = this.prepareUrl.bind(this);
    this.saveUrl = this.saveUrl.bind(this);
  }

  updateInput(value) {
    this.generateUrl(value);
    this.setState({ input: value });
    ;
  }

  onKeypress(key) {
    if (key === 13) {
      this.prepareUrl(this.state.input);
    }
  }

  matchRegExp(input, regex) {
    if (!input) {
      return false;
    }
    if (!regex) {
      return false;
    }

    let result = input.match(regex);

    if (typeof result === "object" && result !== null) {
      return result[0];
    }
  }

  createUrlVariant(variant) {}

  saveUrl(url) {
    let savedUrlsCopy = this.state.savedUrls;
    savedUrlsCopy.push(url);

    this.setState({ savedUrls: savedUrlsCopy });
  }

  createPart(name, value, type) {
    return {
      name: name,
      value: value,
      cssClass: `url-part--${name}`,
      partType: type,
      additionalvalues: [
        {
          value: "additional value 1"
        },
        {
          value: "additional value 2"
        },
        {
          value: "additional value 3"
        }
      ]
    };
  }

  updatePart(parts, name, value) {
    for (var i = 0; i < parts.length; i++) {
      let part = parts[i];
      if (part.name === name) {
        part.value = value;
      }
    }
    return parts;
  }

  addPartToArray(parts, newObject) {
    parts.push(newObject);
    return parts;
  }

  isPartCreated(parts, name) {
    for (var i = 0; i < parts.length; i++) {
      let part = parts[i];
      if (part.name === name) {
        return true;
      }
    }
    return false;
  }

  addPart(array, name, value, regExp, type) {
    if (this.isPartCreated(array, name)) {
      this.updatePart(
        array,
        name,
        regExp ? this.matchRegExp(value, regExp) : value
      );
    } else {
      this.addPartToArray(
        array,
        this.createPart(
          name,
          regExp ? this.matchRegExp(value, regExp) : value,
          type
        )
      );
    }
  }

  addValueInArray(array, name, value) {
    for (var i = 0; i < array.length; i++) {
      let element = array[i];
      if (element.name === name) {
        element.value.push(value);
      }
    }
    return array;
  }

  generateUrl(input) {
    let url;

    try {
      url = new URL(input);

      // esempio con url: https://www.quotidiano.net/my-section/my-page.html#myId?someparamete
      // hash : "#myId?someparamete"
      // host : "www.quotidiano.net"
      // hostname : "www.quotidiano.net"
      // href : "https://www.quotidiano.net/my-section/my-page.html#myId?someparamete"
      // origin : "https://www.quotidiano.net"
      // password : ""
      // pathname : "/my-section/my-page.html"
      // port : ""
      // protocol : "https:"
      // search : ""
      // searchParams : URLSearchParams {}
      // username : ""

      let partsCopy = this.state.parts;
      let hostRegExp = /^([a-zA-Z0-9][a-zA-Z0-9-_]*[^.])/;
      let hostnameRegExp = /\.{1}(([\S][^\]])*)/;

      if (url.protocol) {
        this.addPart(partsCopy, "protocol", url.protocol, null, "string");
      }

      if (url.host) {
        this.addPart(partsCopy, "host", url.host, hostRegExp, "string");
      }

      if (url.hostname) {
        this.addPart(
          partsCopy,
          "hostname",
          url.hostname,
          hostnameRegExp,
          "string"
        );
      }

      if (url.port) {
        this.addPart(partsCopy, "port", url.port, null, "string");
      }

      if (url.pathname) {
        this.addPart(partsCopy, "pathname", url.pathname, null, "string");
      }

      if (url.searchParams) {
        this.addPart(
          partsCopy,
          "searchParams",
          url.searchParams,
          null,
          "object"
        );
      }

      if (url.hash) {
        this.addPart(partsCopy, "hash", url.hash, null, "string");
      }

      this.setState({
        parts: partsCopy
      });
    } catch (error) {
      url = null;
    }
  }

  componentDidMount() {
    if (this.state.url) {
      this.generateUrl(this.state.url);
    }
  }

  prepareUrl(url) {
    this.setState({ url: url });
  }

  render() {
    return (
      <div>
        <div className="url-hero">
          <div className="container">
            <h1>lorem ipsum dolor</h1>
            <div className="url-hero__description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt eum
              illum doloremque impedit possimus minus dolore. Expedita totam
              officia quos molestias quaerat saepe velit reprehenderit quisquam!
              Veniam nam earum quaerat?
            </div>
            <label htmlFor="bookmarkInput" className="url-hero__label">
              Bookmark an url
            </label>
            <div className="url-hero__url">
              <input
                type="text"
                value={this.state.input}
                name="bookmarkInput"
                id="bookmarkInput"
                className="url-hero__input"
                onChange={e => {
                  this.updateInput(e.target.value);
                  this.onKeypress(e.keyCode);
                }}
              />
              <button
                className="url-hero__save"
                onClick={() => this.prepareUrl(this.state.input)}
              >
                save
              </button>
            </div>
          </div>
        </div>
        {this.state.url}
        <div className="main-url">
          <div className="container">
            <h2 className="main-url__title">Examine your url</h2>
            <p className="main-url__subtitle">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis dolore dolor nisi autem officia officiis provident
              sapiente placeat sint aperiam quod, quae amet architecto odio
              similique facilis asperiores unde cupiditate!
            </p>
            {this.state.input}
            <UrlComponent
              saveUrlCallback={this.saveUrl}
              parts={this.state.parts}
            />
          </div>
        </div>
        <h2>saved urls:</h2>
        {this.state.savedUrls.length > 0 &&
          this.state.savedUrls.map((url, i) => {
            return <div key={i}>{url}</div>;
          })}
        <h2>the url: </h2>
        <h1>{this.state.generatedUrl}</h1>
        <h1>create custom url map</h1>
        caso d'uso dell'utente: + protocol + subdomain and port + domain (ad
        esempio qn, il carlino e ilgiorno) + page or file (ad esempio
        gallery/id, article/id, video/id) + page aggiuntiva (ad esempio: /amp
        per tutte le altre page che abbiamo indicato) + parameters +
        FACOLTATIVO: anchor
      </div>
    );
  }
}

export default App;
