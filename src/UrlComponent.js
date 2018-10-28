import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Part from './Part';

function makeUrlString(urlArray) {
  const string = urlArray.join('');
  return string;
}

function extractValue(props, type) {
  props.map((prop) => {
    if (typeof prop === type) {
      if (type === 'object') {
        const { paramName, paramValue } = prop;
        let string = '';
        if (paramName) {
          string += `&${paramName}`;
        }
        if (paramValue) {
          string += `=${paramValue}`;
        }
        return string;
      }
      return prop;
    }
    return '';
  });
}

export default class UrlComponent extends Component {
  constructor(props) {
    super(props);
    this.addToUrl = this.addToUrl.bind(this);
  }

  componentWillReceiveProps() {
    this.addToUrl();
  }

  addToUrl() {
    let url = '';
    const { parts } = this.props;

    url = parts.map(part => extractValue(part.values, part.partType));

    return url;
  }

  render() {
    const { parts, saveUrlCallback } = this.props;
    return (
      <div>
        <div className="url">
          {parts
            && parts.length > 0
            && parts.map((part, i) => (
              <Part
                key={`${part.name}-${i}`}
                partName={part.name}
                cssClass={part.cssClass}
                partValues={part.values}
                partType={part.partType}
                additionalValues={part.additionalValues}
              />
            ))}
        </div>

        <button onClick={() => saveUrlCallback(makeUrlString(this.addToUrl()))}>
          salva questa url
        </button>
      </div>
    );
  }
}

UrlComponent.propTypes = {
  parts: PropTypes.arrayOf(
    PropTypes.shape({
      additionalvalues: PropTypes.array,
      cssClass: PropTypes.string,
      name: PropTypes.string,
      partType: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(
          PropTypes.shape({
            paramName: PropTypes.string,
            paramValue: PropTypes.string,
          }),
        ),
      ]),
    }),
  ).isRequired,
  saveUrlCallback: PropTypes.func.isRequired,
};

UrlComponent.defaultProps = {};
