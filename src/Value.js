import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Value extends PureComponent {
  render() {
    const {
      partValue, isAdditionalValue, partId, valueId,updateAdditionalValueCallback
    } = this.props;

    return (
      isAdditionalValue ? (
        <input
          type="text"
          value={partValue}
          onChange={e => updateAdditionalValueCallback(e.target.value, partId, valueId)}
        />
      ) : (
        <div className="url-part__value">
          {partValue}
        </div>
      )
    );
  }
}

Value.propTypes = {
  isAdditionalValue: PropTypes.bool,
  partId: PropTypes.number.isRequired,
  valueId: PropTypes.number.isRequired,
  partValue: PropTypes.string,
};

Value.defaultProps = {
  isAdditionalValue: false,
  partValue: '',
};
