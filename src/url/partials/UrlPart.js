import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Value from './ChunkValue';

export default class UrlPart extends Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(key, partId, valueId) {
    const { addAdditionalValue, removeAdditionalValue } = this.props;
    if (key === 13) {
      if (valueId) {
        removeAdditionalValue(partId, valueId);
      } else {
        addAdditionalValue(partId);
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
      addAdditionalValue,
      removeAdditionalValue,
      updateAdditionalValue,
    } = this.props;
    return (
      <div className={`url-part ${cssClass}`}>
        <div className="url-part__main">
          <div className="url-part__header">
            <div className="url-part__header-name">

              {partName}
            </div>
            <div className="url-part__header-button">
              <div
                role="button"
                tabIndex="0"
                className="add-value"
                onClick={() => addAdditionalValue(partId)}
                onKeyDown={e => this.onKeyDown(e.keyCode, partId)}
              >
                +
              </div>
            </div>
          </div>
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
                    updateAdditionalValue={
                      updateAdditionalValue
                    }
                  />
                  {value.isAdditionalValue && (
                  <button
                    role="button"
                    tabIndex="-1"
                    className="remove-value"
                    onClick={() => removeAdditionalValue(partId, value.valueId)}
                    onKeyDown={e => this.onKeyDown(e.keyCode, partId, value.valueId)}
                  >
                    -
                  </button>
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
                    updateAdditionalValue={
                      updateAdditionalValue
                    }
                    isAdditionalValue={value.isAdditionalValue}
                  />
                  {value.isAdditionalValue && (
                    <div
                      role="button"
                      tabIndex="0"
                      className="remove-value"
                      onClick={() => removeAdditionalValue(partId, value.valueId)}
                      onKeyDown={e => this.onKeyDown(e.keyCode, partId, value.valueId)}
                    >
                      -
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
  addAdditionalValue: PropTypes.func.isRequired,
  removeAdditionalValue: PropTypes.func.isRequired,
  updateAdditionalValue: PropTypes.func.isRequired,
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
