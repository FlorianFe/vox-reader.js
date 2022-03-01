const readString = require("../shared/readString/readString");
const read4ByteInteger = require('../shared/read4ByteInteger/read4ByteInteger');
const read4ByteFloat = require('../shared/read4ByteFloat/read4ByteFloat');
const groupArray = require('../shared/groupArray/groupArray');

const BLOCK_SIZE = 4;
// var haxe_ds_StringMap = function() {
// 	this.h = { };
// };
// haxe_ds_StringMap.__name__ = true;
// haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
// haxe_ds_StringMap.prototype = {
// 	setReserved: function(key,value) {
// 		if(this.rh == null) {
// 			this.rh = { };
// 		}
// 		this.rh["$" + key] = value;
// 	}
// 	,getReserved: function(key) {
// 		if(this.rh == null) {
// 			return null;
// 		} else {
// 			return this.rh["$" + key];
// 		}
// 	}
// };
// format_vox_VoxReader.readDict = function(input) {
// 	var _g = new haxe_ds_StringMap();
// 	var _g2 = 0;
// 	var _g1 = input.readInt32();
// 	while(_g2 < _g1) {
// 		++_g2;
// 		var key = input.read(input.readInt32()).toString();
// 		var value = input.read(input.readInt32()).toString();
// 		if(__map_reserved[key] != null) {
// 			_g.setReserved(key,value);
// 		} else {
// 			_g.h[key] = value;
// 		}
// 	}
// 	return _g;
// };
const flatten = (array : Array<any>) =>
  [].concat.apply([], array);
const readDict = (tokens: any[]) => {
  const dict: any = {};
  let i = 0
  const amount = read4ByteInteger(tokens[i])
  while(i < amount) {
    const keyLength = read4ByteInteger(tokens[++i]);
    const key = readString(flatten(tokens.slice(i, i + keyLength)));
    i += keyLength;
    const valueLength = read4ByteInteger(tokens[++i]);
    const value = readString(flatten(tokens.slice(i, i + valueLength)));
    i += valueLength;
    dict[key] = value;
  }
  const test = tokens.map((token: number[]) => readString(token));
  console.log(dict);
  return dict
}  

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
  if(id === 'nTRN') {
    const test = tokens.map((token: number[]) => read4ByteInteger(token));
    return {
    nodeId: read4ByteInteger(tokens[0]),
    attributes: readDict(tokens)
  }}

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
