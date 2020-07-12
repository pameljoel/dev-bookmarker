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
      saveUrls,
      addAdditionalValue,
      removeAdditionalValue,
      updateAdditionalValue,
    } = this.props;
    return (
      <div>

        <UrlParts
          parts={parts}
          addAdditionalValue={addAdditionalValue}
          removeAdditionalValue={removeAdditionalValue}
          updateAdditionalValue={updateAdditionalValue}
        />

        <div className="container">
          <button
            type="button"
            className="big-button"
            onClick={() => saveUrls(this.makeArrayOfValues(parts))}
          >
            save this url
          </button>
        </div>
      </div>
    );
  }
}

UrlComponent.propTypes = {
  addAdditionalValue: PropTypes.func.isRequired,
  updateAdditionalValue: PropTypes.func.isRequired,
  removeAdditionalValue: PropTypes.func.isRequired,
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
  saveUrls: PropTypes.func.isRequired,
};
