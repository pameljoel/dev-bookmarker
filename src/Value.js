import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Value extends PureComponent {
  render() {
    const { partValue } = this.props;

    return (
      <div key={partValue} className="url-part__value">
        <input
          type="text"
          value={partValue}
        />
      </div>
    );
  }
}

Value.propTypes = {
  partValue: PropTypes.string,
};

Value.defaultProps = {
  partValue: '',
};
