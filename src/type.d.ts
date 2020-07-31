/* atomic types */

enum PartType {
  STRING= 'string',
  OBJECT= 'object'
}

type Chunk = {
  chunkClass: string,
  name: string,
  chunkId: number,
  chunkType: PartType,
  values: ChunkValues,
};

type ChunkId = number;

type ValueOfAChunk = string;

type ChunkValue = {
  valueId: number,
  value: ValueOfAChunk,
  isAdditionalValue: boolean,
};

type AddAdditionaValue = (chunkId: ChunkId) => void
type RemoveAdditionalValue = (chunkId: ChunkId, valueId: number) => void;
type UpdateAdditionalValue = (chunkId: ChunkId) => void;

/* group of atomic types */

type Chunks = Chunk[];
type ChunkValues = ChunkValue[];
type ArrayOfChunkValues = ValueOfAChunk[];

