import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Value from './Value';

export default class Part extends Component {
  constructor(props) {
    super(props);
    const { additionalValues } = this.props;
    this.state = {
      additionalValues,
    };
    this.addAdditionalValue = this.addAdditionalValue.bind(this);
    this.updateAdditionalValues = this.updateAdditionalValues.bind(this);
  }

  updateAdditionalValues(input, i) {
    this.setState((prevState) => {
      const additionalValuesCopy = prevState.additionalValues;
      const object = {
        value: input,
      };
      additionalValuesCopy.splice(i, 1, object);

      return {
        additionalValues: additionalValuesCopy,
      };
    });
  }

  addAdditionalValue(newAdditionalValue) {
    const { additionalValues } = this.state;
    const additionalValuesCopy = additionalValues;
    additionalValuesCopy.push(newAdditionalValue);
    this.setState({ additionalValues: additionalValuesCopy });
  }

  render() {
    const {
      cssClass, partType, partValues, partName,
    } = this.props;
    const { additionalValues } = this.state;
    return (
      <div className={`url-part ${cssClass}`}>
        <div className="url-part__main">
          <div className="url-part__name">{partName}</div>

          <div className="url-part__value-container">
            {partType === 'string'
              && partValues.map(value => <Value key={value} partValue={value} />)}

            {partType
              && partType === 'object'
              && partValues.map(value => <Value key={value} partValue={value} />)}

            {additionalValues
              && additionalValues.map((additional, i) => (
                <div
                  className="url-part__additional-value"
                  key={`additional-value-${i}`}
                >
                  <input
                    type="text"
                    value={additional.value}
                    onChange={e => this.updateAdditionalValues(e.target.value, i)
                    }
                  />
                </div>
              ))}
          </div>
          <div
            className="add-value"
            onClick={() => this.addAdditionalValue({ value: '' })}
          >
            +
          </div>
        </div>
      </div>
    );
  }
}

Part.propTypes = {
  cssClass: PropTypes.string.isRequired,
  partType: PropTypes.string.isRequired,
  partName: PropTypes.string.isRequired,
  partValues: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        paramName: PropTypes.string,
        paramValue: PropTypes.string,
      }),
    ),
  ]),
  additionalValues: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
    }),
  ),
};

Part.defaultProps = {
  partValues: [],
  additionalValues: [],
};
