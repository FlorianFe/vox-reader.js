import readString from "./shared/readString/readString";
import readInt from "./shared/readInt/readInt";
import groupArray from "./shared/groupArray/groupArray";
import readRiffFile from "./readRiffFile/readRiffFile";
import parseVoxChunk from "./parseVoxChunk/parseVoxChunk";
import removeRiffStructure from "./removeRiffStructure/removeRiffStructure";
import { VoxStructure } from "../types/types";

const readVox = (buffer: Array<number> | Uint8Array): VoxStructure => {
  const BLOCK_SIZE = 4;
  const OFFSET = 8; // VOX <space> 150 0 0 0

  const data = [...buffer]; // convert buffer to array
  const tokens = groupArray(data, BLOCK_SIZE);

  const id = readString(tokens[0]);
  const version = readInt(tokens[1]);

  if (id != "VOX ")
    throw Error(`Id of .vox-file should be "VOX ", found "${id}".`);

  const riffData = readRiffFile(data, OFFSET, parseVoxChunk);
  riffData.children = riffData.children.map((chunk: any, index: number) => ({
    ...chunk,
    index,
  }));

  return removeRiffStructure(riffData);
};

export = readVox;
