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
  return urlArray.join('');
}

export function createChunk(name, newValue, type) {
  const chunk = {
    name,
    values: [],
    chunkClass: `url-chunk--${name}`,
    chunkType: type,
    chunkId: createRandomId(),
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

  chunk.values.push(valueObject);

  return chunk;
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

function updatePart(chunks, name, newValue, type) {
  for (let i = 0; i < chunks.length; i += 1) {
    const chunk = chunks[i];
    if (chunk.name === name) {
      if (type === 'string') {
        chunk.values[0].value = newValue;
      } else if (typeof newValue === 'object') {
        chunk.values[0].value = makeParamsString(newValue);
      }
    }
  }
}

function addPartToArray(chunks, newObject) {
  chunks.push(newObject);
  return chunks;
}

function isPartCreated(chunks, name) {
  for (let i = 0; i < chunks.length; i += 1) {
    const chunk = chunks[i];
    if (chunk.name === name) {
      return true;
    }
  }
  return false;
}

export function appendChunk(array, name, newValue, regExp, type) {
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
      createChunk(name, regExp ? matchRegExp(newValue, regExp) : newValue, type),
    );
  }
}
