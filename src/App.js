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
    this.composeUrl = this.composeUrl.bind(this);
    this.saveUrl = this.saveUrl.bind(this);
  }

  updateInput(value) {
    this.setState({ input: value });
    this.generateUrl(this.state.input);
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

      let partsCopy = [];

      function createPart(name, value, type) {
        return {
          name: name,
          value: value,
          cssClass: `url-part--${name}`,
          partType: type
        };
      }

      if (url.protocol) {
        partsCopy.push(createPart("protocol", url.protocol, "string"));
      }

      if (url.host) {
        let regExp = /^([a-zA-Z0-9][a-zA-Z0-9-_]*[^.])/;
        partsCopy.push(
          createPart("host", this.matchRegExp(url.host, regExp), "string")
        );
      }

      if (url.hostname) {
        let regExp = /\.{1}(([\S][^\]])*)/;
        partsCopy.push(
          createPart(
            "hostname",
            this.matchRegExp(url.hostname, regExp),
            "string"
          )
        );
      }

      if (url.port) {
        partsCopy.push(createPart("port", url.port, "string"));
      }

      if (url.pathname) {
        partsCopy.push(createPart("pathname", url.pathname, "string"));
      }

      if (url.searchParams) {
        partsCopy.push(createPart("searchParams", url.searchParams, "object"));
      }

      if (url.hash) {
        partsCopy.push(createPart("hash", url.hash, "string"));
      }

      this.setState({
        parts: partsCopy
      });

    } catch (error) {
      url = null;
    }
  }

  composeUrl(
    protocol,
    subDomain,
    domain,
    port,
    pageOrFile,
    parameters,
    anchor
  ) {
    let url = new URL();

    try {
      if (protocol) {
        url.protocol = protocol;
      }

      if (subDomain) {
        url.host = subDomain;
      }

      if (domain) {
        url.hostname = domain;
      }

      if (port) {
        url.port = ":" + port;
      }

      if (pageOrFile) {
        url.pathname = pageOrFile;
      }

      if (parameters) {
        url.searchParams = parameters;
      }

      if (anchor) {
        url.hash = anchor;
      }

      this.setState({
        generatedUrl: url
      });
    } catch (error) {
      console.log(error);
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
