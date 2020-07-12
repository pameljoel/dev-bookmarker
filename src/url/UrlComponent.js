import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { UrlParts } from './partials/UrlParts';

function extractValues(parts) {
  let string = '';
  string = parts.map(part => part.values[0].value);
  return string;
}

const addToUrl = parts => extractValues(parts);

const makeArrayOfValues = (parts) => {
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
};


const UrlComponent = ({
  parts, saveUrls,
  addAdditionalValue,
  removeAdditionalValue,
  updateAdditionalValue,
}) => {
  useEffect(() => {
    addToUrl(parts);
  }, [parts]);

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
          onClick={() => saveUrls(makeArrayOfValues(parts))}
        >
          save this url
        </button>
      </div>
    </div>
  );
};

export default UrlComponent;

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
