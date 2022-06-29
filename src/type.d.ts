/* atomic types */

import {URL_PARTS} from "./url/partials/generateUrlChunks";

enum ChunkType {
  STRING= 'string',
  OBJECT= 'object'
}

type ChunkValueType = {
  valueId: number,
  value: string,
  isAdditionalValue: boolean,
};

type ChunkValues = ChunkValueType[];

type Chunk = {
  chunkClass: string;
  chunkId: number;
  chunkType: ChunkType;
  name: URL_PARTS;
  values: ChunkValues;
}
type SavedUrl = string;

type SavedUrls = SavedUrl[];

type AddAdditionaValue = (chunkId: ChunkId) => void
type RemoveAdditionalValue = (chunkId: ChunkId, valueId: number) => void;
type UpdateAdditionalValue = (chunkId: ChunkId) => void;

/* group of atomic types */

type Chunks = Chunk[];
type ChunkValues = ChunkValueType[];
type ArrayOfChunkValues = ValueOfAChunk[];

