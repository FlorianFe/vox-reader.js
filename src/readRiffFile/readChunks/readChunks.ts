import readString from "../../shared/readString/readString";
import readInt from "../../shared/readInt/readInt";
import groupArray from "../../shared/groupArray/groupArray";
import { VoxNode } from "../../../types/types";

const BLOCK_SIZE = 4;
const HEADER_SIZE = 12;

const readChunks = (data: Array<number>, parser: Function) => {
  let chunks = [];

  while (data.length != 0) {
    const headerData = data.slice(0, HEADER_SIZE);
    const header = groupArray(headerData, BLOCK_SIZE);

    const chunkId = readString(header[0]);
    const contentBytes = readInt(header[1]);
    const childrenBytes = readInt(header[2]);

    chunks.push(
      createChunk(data, chunkId, contentBytes, childrenBytes, parser)
    );

    data = data.slice(HEADER_SIZE + contentBytes);
  }

  return chunks;
};

const createChunk = (
  data: Array<number>,
  id: string,
  contentBytes: number,
  childrenBytes: number,
  parser: Function
): VoxNode => {
  const contentDataEndIndex = HEADER_SIZE + contentBytes;
  const childrenDataEndIndex = contentDataEndIndex + childrenBytes;

  const contentData = data.slice(HEADER_SIZE, contentDataEndIndex);
  const childrenData = data.slice(contentDataEndIndex, childrenDataEndIndex);

  return {
    id: id,
    data: parser(id, contentData),
    children: readChunks(childrenData, parser),
  };
};

export = readChunks;
