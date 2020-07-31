/* atomic types */

enum PartType {
  STRING= 'string',
  OBJECT= 'object'
}

type Chunk = {
  cssClass: string,
  name: string,
  partId: number,
  partType: PartType,
  values: ChunkValues,
  isAdditionalValue: boolean,
};

type ChunkId = number;

type ValueOfAChunk = string;

type ChunkValue = {
  valueId: number,
  value: ValueOfAChunk,
  isAdditionalValue: boolean,
};

type AdditionalValue = {
  key: number;
  name: string;
  cssClass: string;
  values: ChunkValues;
  partType: string;
  partId: string;
  additionalValues: any;
  isAdditionalValue: any;
  addAdditionalValue: () => void;
  removeAdditionalValue: () => void;
  updateAdditionalValue: () => void;
}

/* group of atomic types */

type Chunks = Chunk[];
type ChunkValues = ChunkValue[];
type ArrayOfChunkValues = ValueOfAChunk[];

