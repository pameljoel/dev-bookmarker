import React, { Component } from "react";

import UrlComponent from "./UrlComponent";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input:
        'http://www.quotidiano.net:5000/my-section/my-page.html?id="1"&omg="omggoog"#myID',
      protocol: "",
      subDomain: "",
      port: "",
      page: "",
      parameters: "",
      anchor: "",
      dirtyInput: ""
    };
    this.updateInput = this.updateInput.bind(this);
    this.saveUrl = this.saveUrl.bind(this);
  }

  updateInput(value) {
    this.setState({ input: value });
    this.generateUrl(this.state.input);
  }

  onKeypress(key) {
    if (key === 13) {
      this.saveUrl(this.state.input);
    }
  }

  matchPart(part, input, regExp) {
    let result = "";

    // get result
    result = this.matchRegExp(input, regExp);

    // remove from string
    this.removeMatching(input, regExp);

    // return result
    return result;
  }

  generateUrl(input) {
    let url;
    let protocol;
    let subDomain;
    let domain;
    let port;
    let pageOrFile;
    let parameters;
    let anchor;

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

      if (url.protocol) {
        protocol = url.protocol;
      }

      if (url.host) {
        subDomain = url.host;
      }

      if (url.hostname) {
        domain = url.hostname;
      }

      if (url.port) {
        port = url.port;
      }

      if (url.pathname) {
        pageOrFile = url.pathname;
      }

      if (url.searchParams) {
        parameters = url.searchParams;
      }

      if (url.hash) {
        anchor = url.hash;
      }

      this.setState({
        protocol: protocol,
        subDomain: subDomain,
        domain: domain,
        port: port,
        page: pageOrFile,
        parameters: parameters,
        anchor: anchor
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

  saveUrl(url) {
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
                  console.log("changed");
                  this.updateInput(e.target.value);
                  this.onKeypress(e.keyCode);
                }}
              />
              <button
                className="url-hero__save"
                onClick={() => this.saveUrl(this.state.input)}
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
              protocol={this.state.protocol}
              subDomain={this.state.subDomain}
              domain={this.state.domain}
              port={this.state.port}
              page={this.state.page}
              parameters={this.state.parameters}
              anchor={this.state.anchor}
            />
          </div>
        </div>
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
