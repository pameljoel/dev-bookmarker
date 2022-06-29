import {Chunk, Chunks, ChunkType, ChunkValueType} from "../../type";
import {URL_PARTS} from "./createChunks";

export function createRandomId() {
  return Math.round(Math.random() * 10000000000);
}

function makeParamsString(params: string) {
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

export function makeUrlString(urlArray: string[]) {
  return urlArray.join('');
}

export function createChunk(name: URL_PARTS, type: ChunkType, newValue: string | null): Chunk {
  const chunk: Chunk = {
    name,
    values: [],
    chunkClass: `url-chunk--${name}`,
    chunkType: type,
    chunkId: createRandomId(),
  };

  const valueObject: ChunkValueType = {
    valueId: createRandomId(),
    value: '',
    isAdditionalValue: false,
  };

  if (type === 'string') {
    if (name === 'port') valueObject.value += ':';
    valueObject.value += newValue;
    if (name === 'protocol') valueObject.value += '//';
  } else {
    valueObject.value = newValue ? makeParamsString(newValue) : '';
  }

  chunk.values.push(valueObject);

  return chunk;
}

function getRegExpMatchedValue(input: string, regex: RegExp): string | null {
  if (!input) {
    return null;
  }
  if (!regex) {
    return null;
  }

  const result = input.match(regex);

  if (typeof result === 'object' && result !== null) {
    return result[0];
  }

  return result;
}

function updateChunk(chunks: Chunks, name: string, newValue: string | null, type: ChunkType) {

  chunks.map(chunk => {
    if (chunk.name === name) {
      if (type === 'string') {
        chunk.values[0].value = newValue || '';
      } else if (typeof newValue === 'object') {
        chunk.values[0].value = makeParamsString(newValue || '');
      }
    }
  })
}

function addChunkToNewArray(chunks: Chunks, newObject: Chunk) {
  chunks.push(newObject);
  return chunks;
}

export function appendChunk(chunks: Chunks, name: URL_PARTS, newValue: string, regExp: RegExp, type: ChunkType) {
  const value = regExp ? getRegExpMatchedValue(newValue, regExp) : newValue;
  const chunkExists = chunks.filter(chunk => chunk.name === name).length > 0;

  if (chunkExists) {
    updateChunk(chunks, name, value, type);
  } else {
    addChunkToNewArray(chunks, createChunk(name, type, value));
  }
}
