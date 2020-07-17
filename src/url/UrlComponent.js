import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import UrlParts from './partials/UrlParts';
import SaveUrlButton from './partials/SaveUrlButton';

function extractValues(parts) {
  let string = '';
  string = parts.map(part => part.values[0].value);
  return string;
}

const addToUrl = parts => extractValues(parts);

const makeArrayOfValues = (parts) => {
  const arrayOfParts = [];

  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    const valuesArray = [];

    for (let j = 0; j < part.values.length; j++) {
      const { value } = part.values[j];
      valuesArray.push(value);
    }

    arrayOfParts.push(valuesArray);
  }
  return arrayOfParts;
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

      <SaveUrlButton onClick={() => saveUrls(makeArrayOfValues(parts))} />
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
