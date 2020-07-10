import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Value from './Value';

export default class UrlPart extends Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(key, partId, valueId) {
    const { addAdditionalValueCallback, removeAdditionalValueCallback } = this.props;
    if (key === 13) {
      if (valueId) {
        removeAdditionalValueCallback(partId, valueId);
      } else {
        addAdditionalValueCallback(partId);
      }
    }
  }

  render() {
    const {
      cssClass,
      partType,
      values,
      partName,
      partId,
      addAdditionalValueCallback,
      removeAdditionalValueCallback,
      updateAdditionalValueCallback,
    } = this.props;
    return (
      <div className={`url-part ${cssClass}`}>
        <div className="url-part__main">
          <div className="url-part__name">{partName}</div>
          <div className="url-part__value-container">
            {partType === 'string'
              && values.map(value => (
                <div
                  key={value.valueId}
                  className={`${
                    value.isAdditionalValue ? 'url-part__additional-value' : ''
                  }`}
                >
                  <Value
                    partValue={value.value}
                    partId={partId}
                    valueId={value.valueId}
                    isAdditionalValue={value.isAdditionalValue}
                    updateAdditionalValueCallback={
                      updateAdditionalValueCallback
                    }
                  />
                  {value.isAdditionalValue ? (
                    <div
                      role="button"
                      tabIndex="-1"
                      className="remove-value"
                      onClick={() => removeAdditionalValueCallback(partId, value.valueId)}
                      onKeyDown={e => this.onKeyDown(e.keyCode, partId, value.valueId)}
                    >
                      -
                    </div>
                  ) : (
                    <div
                      role="button"
                      tabIndex="0"
                      className="add-value"
                      onClick={() => addAdditionalValueCallback(partId)}
                      onKeyDown={e => this.onKeyDown(e.keyCode, partId)}
                    >
                      +
                    </div>
                  )}
                </div>
              ))}

            {partType
              && partType === 'object'
              && values.map(value => (
                <div
                  key={value.valueId}
                  className={`${
                    value.isAdditionalValue ? 'url-part__additional-value' : ''
                  }`}
                >
                  <Value
                    partValue={value.value}
                    partId={partId}
                    valueId={value.valueId}
                    updateAdditionalValueCallback={
                      updateAdditionalValueCallback
                    }
                    isAdditionalValue={value.isAdditionalValue}
                  />
                  {value.isAdditionalValue ? (
                    <div
                      role="button"
                      tabIndex="0"
                      className="remove-value"
                      onClick={() => removeAdditionalValueCallback(partId, value.valueId)}
                      onKeyDown={e => this.onKeyDown(e.keyCode, partId, value.valueId)}
                    >
                      -
                    </div>
                  ) : (
                    <div
                      role="button"
                      tabIndex="0"
                      className="add-value"
                      onClick={() => addAdditionalValueCallback(partId)}
                      onKeyDown={e => this.onKeyDown(e.keyCode, partId)}
                    >
                      +
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

UrlPart.propTypes = {
  cssClass: PropTypes.string.isRequired,
  partType: PropTypes.string.isRequired,
  partName: PropTypes.string.isRequired,
  addAdditionalValueCallback: PropTypes.func.isRequired,
  removeAdditionalValueCallback: PropTypes.func.isRequired,
  updateAdditionalValueCallback: PropTypes.func.isRequired,
  partId: PropTypes.number.isRequired,
  values: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        paramName: PropTypes.string,
        paramValue: PropTypes.string,
      }),
    ),
  ]),
};

UrlPart.defaultProps = {
  values: [],
};
