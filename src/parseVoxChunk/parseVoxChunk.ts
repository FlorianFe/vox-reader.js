
const read4ByteInteger = require('../shared/read4ByteInteger/read4ByteInteger');
const read4ByteFloat = require('../shared/read4ByteFloat/read4ByteFloat');
const groupArray = require('../shared/groupArray/groupArray');

const BLOCK_SIZE = 4;


const parseVoxChunk = (id : string, contentData : Array<number>) =>
{
  const tokens = groupArray(contentData, BLOCK_SIZE);

  // base https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt
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
      .map((c : Array<number>) => ({ x: c[0], y: c[1], z: c[2], i: c[3] }))
  }

  if(id === 'RGBA') return {
    values: tokens
      .map((c : Array<number>) => ({ r: c[0], g: c[1], b: c[2], a: c[3] }))
  }

  // extended https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox-extension.txt
  // if(id === 'nTRN') return {
  //   nodeId: read4ByteInteger(tokens[0]),
  //   attributes: readDict()
  // }

  if(id === 'MATT') {
    console.warn('MATT is deprecated, use MATL instead');
    return {
      id: read4ByteInteger(tokens[0]),
      materialType: read4ByteInteger(tokens[1]),
      materialWeight: read4ByteFloat(tokens[2]),
      propertyBits: read4ByteInteger(tokens[3]),
      normalizedPropertyValues: tokens
        .slice(4)
        .map((token : number) => read4ByteFloat(token))
    }
  }




  
  return {id,values:contentData};
}

export = parseVoxChunk;
