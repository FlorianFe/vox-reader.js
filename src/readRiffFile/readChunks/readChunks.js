
const read4ByteString = require('../../shared/read4ByteString/read4ByteString');
const read4ByteInteger = require('../../shared/read4ByteInteger/read4ByteInteger');
const groupArray = require('../../shared/groupArray/groupArray');

const BLOCK_SIZE = 4;
const HEADER_SIZE = 12;


const readChunks = (data, parser) =>
{
  let chunks = [];

  while(data.length != 0)
  {
    const headerData = data.slice(0, HEADER_SIZE);
    const header = groupArray(headerData, BLOCK_SIZE);

    const chunkId = read4ByteString(header[0]);
    const contentBytes = read4ByteInteger(header[1]);
    const childrenBytes = read4ByteInteger(header[2]);

    chunks.push(createChunk(data, chunkId, contentBytes, childrenBytes, parser));

    data = data.slice(HEADER_SIZE + contentBytes);
  }

  return chunks;
}

const createChunk = (data, id, contentBytes, childrenBytes, parser) =>
{
  const contentDataEndIndex = HEADER_SIZE + contentBytes;
  const childrenDataEndIndex = contentDataEndIndex + childrenBytes;

  const contentData = data.slice(HEADER_SIZE, contentDataEndIndex);
  const childrenData = data.slice(contentDataEndIndex, childrenDataEndIndex);

  return {
    id: id,
    data: parser(id, contentData),
    children: readChunks(childrenData, parser)
  }
}

module.exports = readChunks;
