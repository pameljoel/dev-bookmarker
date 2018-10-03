import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Part from './Part';


function checkProp(prop, type) {
  if (typeof prop === type) {
    if (type === 'object') {
      return `&${prop}`;
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
    this.addUrl = this.addUrl.bind(this);
  }

  componentWillReceiveProps() {
    this.addUrl();
  }

  addUrl() {
    let url = '';
    const { parts, value, partType } = this.props;

    url = parts.map((part, i) => checkProp(value, partType));

    if (url) {
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
  })),
};

UrlComponent.defaultProps = {
};
