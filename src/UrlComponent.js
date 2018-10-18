import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Part from './Part';


function extractValue(prop, type) {
  if (typeof prop === type) {
    if (type === 'object') {
      const stringValueFromArray = prop.map((item) => {
        const { paramName, paramValue } = item;
        let string = '';
        if (paramName) {
          string += `&${paramName}`;
        }
        if (paramValue) {
          string += `=${paramValue}`;
        }
        return string;
      });
      return stringValueFromArray;
    }
    return prop;
  }
  return '';
}

export default class UrlComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
    this.addToUrl = this.addToUrl.bind(this);
  }

  componentWillReceiveProps() {
    this.addToUrl();
  }

  addToUrl() {
    let url = '';
    const { parts } = this.props;

    console.log(parts);

    url = parts.map(part => extractValue(part.value, part.partType));

    if (url.length > 0) {
      this.setState({ url });
    }
  }


  render() {
    const { parts, saveUrlCallback } = this.props;
    const { url } = this.state;
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
                partValue={part.value}
                partType={part.partType}
                additionalValues={part.additionalValues}
              />
            ))}
        </div>

        <button onClick={() => saveUrlCallback(url)}>
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
  parts: PropTypes.arrayOf(PropTypes.shape({
    additionalvalues: PropTypes.array,
    cssClass: PropTypes.string,
    name: PropTypes.string,
    partType: PropTypes.string,
    value: PropTypes.oneOfType(
      [PropTypes.string, PropTypes.arrayOf(PropTypes.shape(
        {
          paramName: PropTypes.string,
          paramValue: PropTypes.string,
        },
      )),
      ],
    ),
  })).isRequired,
  saveUrlCallback: PropTypes.func.isRequired,
};

UrlComponent.defaultProps = {
};
