enum PartType {
  STRING= 'string',
  OBJECT= 'object'
}

type Chunks = Chunk[];

type Chunk = {
  cssClass: string,
  name: string,
  partId: number,
  partType: PartType,
  values: ChunkValues,
  additionalValues?: any[],
};

type ChunkValues = ChunkValue[];

type ChunkValue = {
  valueId: number,
  value: ValueOfAChunk,
  isAdditionalValue: boolean,
};

type ValueOfAChunk = string;

type ArrayOfChunkValues = ValueOfAChunk[];
