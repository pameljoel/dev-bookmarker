import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export default class Part extends PureComponent {
  render() {
    const {
      cssClass, partType, partValue, partName,
    } = this.props;
    return (
      <div className={`url-part ${cssClass}`}>
        <div className="url-part__name">{partName}</div>

        <div className="url-part__value-container">
          {partType === 'string' && (
            <div className="url-part__value">{partValue}</div>
          )}

          {partType
          && partType === 'object'
          && partValue.map(parameter => (
            <div className="url-part__value" key={parameter}>
              <div className="url-part__value__name">{parameter.paramName}</div>
              <div className="url-part__value__sub">{parameter.paramValue}</div>
            </div>
          ))}
        </div>
        <div className="add-value">+</div>
      </div>
    );
  }
}

Part.propTypes = {
  cssClass: PropTypes.string.isRequired,
  partType: PropTypes.string.isRequired,
  partName: PropTypes.string.isRequired,
  partValue: PropTypes.string,
};
