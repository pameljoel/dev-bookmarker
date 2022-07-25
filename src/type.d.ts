/* atomic types */

import {URL_PARTS} from "./url/partials/createChunks";
import React from "react";

enum ChunkType {
  STRING= 'string',
  OBJECT= 'object'
}

type ChunkValueType = {
  valueId: number,
  value: string;
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

type SavedUrlPart = string;
type SavedUrlWithParts = SavedUrlPart[];

type AddAdditionaValue = (chunkId: number) => void
type RemoveAdditionalValue = (chunkId: number, valueId: number) => void;
type UpdateAdditionalValue = (input: string, chunkId: number, valueId: number) => void;
type SaveUrls = (chunks: [SavedUrlWithParts]) => void;
type HandleOnKeyPress = (key: number) => void;
type UpdateUrl = (url: string) => void;
type SetUrl = React.Dispatch<React.SetStateAction<string>>;

/* group of atomic types */

type Chunks = Chunk[];
type ChunkValues = ChunkValueType[];
type ArrayOfChunkValues = ValueOfAChunk[];

