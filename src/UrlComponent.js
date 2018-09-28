import React, { Component } from "react";
import PropTypes from "prop-types";

import Part from "./Part";

export default class UrlComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };
    this.addUrl = this.addUrl.bind(this);
  }

  checkProp(prop, type) {
    if (typeof prop === type) {
      if (type === "object") {
        return "&" + prop;
      } else {
        return prop;
      }
    } else {
      return "";
    }
  }
  addUrl() {
    let url = "";

    url = this.props.parts.map((part, i) => {
      return this.checkProp(this.props.value, this.props.partType);
    });

    if (url) {
      this.setState({ url: url });
    }
  }

  componentWillReceiveProps() {
    this.addUrl();
  }

  iterateParameters(object) {
    let array = [];
    for (let value of object) {
      for (let i = 0; i < value.length; i++) {
        let element = value[i];
        array.push(element);
      }
    }
    return array;
  }

  render() {
    return (
      <div>
        <div className="url">
          {this.props.parts &&
            this.props.parts.length > 0 &&
            this.props.parts.map((part, i) => {
              return (
                <Part
                  key={i}
                  partName={part.name}
                  cssClass={part.cssClass}
                  partValue={part.value}
                  partType={part.partType}
                />
              );
            })}
        </div>

        <button onClick={() => this.props.saveUrlCallback(this.state.url)}>
          salva questa url
        </button>
        <br />
        <br />
        <br />
        <p>{this.state.url}</p>
      </div>
    );
  }
}

UrlComponent.propTypes = {
  parameters: PropTypes.string || PropTypes.objectOf(PropTypes.string)
};

UrlComponent.defaultProps = {
  parameters: {}
};
