import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UrlParts } from './partials/UrlParts';

function extractValues(parts) {
  let string = '';
  string = parts.map(part => part.values[0].value);
  return string;
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

    url = extractValues(parts);

    return url;
  }

  makeArrayOfValues(parts) {
    const array = [];
    let valuesArray = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      valuesArray = [];
      for (let j = 0; j < part.values.length; j++) {
        const { value } = part.values[j];
        valuesArray.push(value);
      }
      array.push(valuesArray);
    }
    return array;
  }

  render() {
    const {
      parts,
      saveUrlsCallback,
      addAdditionalValueCallback,
      removeAdditionalValueCallback,
      updateAdditionalValueCallback,
    } = this.props;
    return (
      <div>

        <UrlParts
          parts={parts}
          addAdditionalValueCallback={addAdditionalValueCallback}
          removeAdditionalValueCallback={removeAdditionalValueCallback}
          updateAdditionalValueCallback={updateAdditionalValueCallback}
        />

        <div className="container">
          <button
            type="button"
            className="big-button"
            onClick={() => saveUrlsCallback(this.makeArrayOfValues(parts))}
          >
            save this url
          </button>
        </div>
      </div>
    );
  }
}

UrlComponent.propTypes = {
  addAdditionalValueCallback: PropTypes.func.isRequired,
  updateAdditionalValueCallback: PropTypes.func.isRequired,
  removeAdditionalValueCallback: PropTypes.func.isRequired,
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
  saveUrlsCallback: PropTypes.func.isRequired,
};
