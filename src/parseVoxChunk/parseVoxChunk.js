
const read4ByteInteger = require('../shared/read4ByteInteger/read4ByteInteger');
const read4ByteFloat = require('../shared/read4ByteFloat/read4ByteFloat');
const groupArray = require('../shared/groupArray/groupArray');

const BLOCK_SIZE = 4;


const parseVoxChunk = (id, contentData) =>
{
  const tokens = groupArray(contentData, BLOCK_SIZE);

  if(id === 'PACK') return {
    numModels: read4ByteInteger(tokens[0])
  };

  if(id === 'SIZE') return {
    x: read4ByteInteger(tokens[0]),
    y: read4ByteInteger(tokens[1]),
    z: read4ByteInteger(tokens[2])
  }

  if(id === 'XYZI') return {
    numVoxels: read4ByteInteger(tokens[0]),
    values: tokens
      .slice(1)
      .map((c) => ({ x: c[0], y: c[1], z: c[2], i: c[3] }))
  }

  if(id === 'RGBA') return {
    values: tokens
      .map((c) => ({ r: c[0], g: c[1], b: c[2], a: c[3] }))
  }

  if(id === 'MATT') return {
    id: read4ByteInteger(tokens[0]),
    materialType: read4ByteInteger(tokens[1]),
    materialWeight: read4ByteFloat(tokens[2]),
    propertyBits: read4ByteInteger(tokens[3]),
    normalizedPropertyValues: tokens
      .slice(4)
      .map((token) => read4ByteFloat(token))
  }

  return {};
}

module.exports = parseVoxChunk;
