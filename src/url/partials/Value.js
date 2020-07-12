import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Value extends PureComponent {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focus = this.focus.bind(this);
  }

  componentDidMount() {
    if (this.textInput && this.textInput.current) {
      this.focus();
    }
  }

  focus() {
    this.textInput.current.focus();
  }

  render() {
    const {
      partValue, isAdditionalValue, partId, valueId, updateAdditionalValue,
    } = this.props;

    return (
      isAdditionalValue ? (
        <input
          type="text"
          value={partValue}
          placeholder="Add value"
          onChange={e => updateAdditionalValue(e.target.value, partId, valueId)}
          ref={this.textInput}
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
  updateAdditionalValue: PropTypes.func.isRequired,
  isAdditionalValue: PropTypes.bool,
  partId: PropTypes.number.isRequired,
  valueId: PropTypes.number.isRequired,
  partValue: PropTypes.string,
};

Value.defaultProps = {
  isAdditionalValue: false,
  partValue: '',
};
