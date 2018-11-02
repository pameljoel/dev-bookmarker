import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Part from './Part';

function makeUrlString(urlArray) {
  const string = urlArray.join('');
  return string;
}

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

  render() {
    const {
      parts,
      saveUrlCallback,
      addAdditionalValueCallback,
      removeAdditionalValueCallback,
      updateAdditionalValueCallback,
    } = this.props;
    return (
      <div>
        <div className="url">
          {parts
            && parts.length > 0
            && parts.map(part => (
              <Part
                key={part.partId}
                partName={part.name}
                cssClass={part.cssClass}
                values={part.values}
                partType={part.partType}
                partId={part.partId}
                additionalValues={part.additionalValues}
                isAdditionalValue={part.isAdditionalValue}
                addAdditionalValueCallback={addAdditionalValueCallback}
                removeAdditionalValueCallback={removeAdditionalValueCallback}
                updateAdditionalValueCallback={updateAdditionalValueCallback}
              />
            ))}
        </div>

        <div className="container">
          <button
            type="button"
            className="big-button"
            onClick={() => saveUrlCallback(makeUrlString(this.addToUrl()))}
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
  saveUrlCallback: PropTypes.func.isRequired,
};

UrlComponent.defaultProps = {};
