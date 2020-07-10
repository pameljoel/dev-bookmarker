export function createRandomId() {
  return Math.round(Math.random() * 10000000000);
}

function makeParamsString(params) {
  let string = '';
  for (const p of params) {
    const paramName = p[0];
    const paramValue = p[1];
    if (paramName) {
      string += `&${paramName}`;
    }
    if (paramValue) {
      string += `=${paramValue}`;
    }
  }
  return string;
}

export function makeUrlString(urlArray) {
  const string = urlArray.join('');
  return string;
}

function createPart(name, newValue, type) {
  const object = {
    name,
    values: [],
    cssClass: `url-part--${name}`,
    partType: type,
    partId: createRandomId(),
  };

  const valueObject = {
    valueId: createRandomId(),
    value: '',
    isAdditionalValue: false,
  };

  if (type === 'string') {
    if (name === 'port') valueObject.value += ':';
    valueObject.value += newValue;
    if (name === 'protocol') valueObject.value += '//';
  } else {
    valueObject.value = makeParamsString(newValue);
  }

  object.values.push(valueObject);

  return object;
}

function matchRegExp(input, regex) {
  if (!input) {
    return false;
  }
  if (!regex) {
    return false;
  }

  const result = input.match(regex);

  if (typeof result === 'object' && result !== null) {
    return result[0];
  }
  return result;
}

function updatePart(parts, name, newValue, type) {
  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (part.name === name) {
      if (type === 'string') {
        part.values[0].value = newValue;
      } else if (typeof newValue === 'object') {
        part.values[0].value = makeParamsString(newValue);
      }
    }
  }
}

function addPartToArray(parts, newObject) {
  parts.push(newObject);
  return parts;
}

function isPartCreated(parts, name) {
  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (part.name === name) {
      return true;
    }
  }
  return false;
}

export function addPart(array, name, newValue, regExp, type) {
  if (isPartCreated(array, name)) {
    updatePart(
      array,
      name,
      regExp ? matchRegExp(newValue, regExp) : newValue,
      type,
    );
  } else {
    addPartToArray(
      array,
      createPart(name, regExp ? matchRegExp(newValue, regExp) : newValue, type),
    );
  }
}
