"use strict";
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
const flatten = (array) => [].concat.apply([], array);
const readDict = (contentData) => {
    const dict = {};
    let i = 0;
    const amount = read4ByteInteger(contentData.splice(0, 4)); // amount of key-value pairs
    while (i < amount) {
        const keyLength = read4ByteInteger(contentData.splice(0, 4));
        const key = readString(flatten(contentData.splice(0, keyLength))); // wrong calculation, has to be done using bytes and not 'tokens'
        const valueLength = read4ByteInteger(contentData.splice(0, 4));
        const value = readString(contentData.splice(0, valueLength));
        i++;
        dict[key] = value;
    }
    return dict;
};
const parseVoxChunk = (id, contentData) => {
    const tokens = groupArray(contentData, BLOCK_SIZE);
    // base https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt
    if (id === 'PACK')
        return {
            numModels: read4ByteInteger(tokens[0])
        };
    if (id === 'SIZE')
        return {
            x: read4ByteInteger(tokens[0]),
            y: read4ByteInteger(tokens[1]),
            z: read4ByteInteger(tokens[2])
        };
    if (id === 'XYZI')
        return {
            numVoxels: read4ByteInteger(tokens[0]),
            values: tokens
                .slice(1)
                .map((c) => ({ x: c[0], y: c[1], z: c[2], i: c[3] }))
        };
    if (id === 'RGBA')
        return {
            values: tokens
                .map((c) => ({ r: c[0], g: c[1], b: c[2], a: c[3] }))
        };
    // extended https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox-extension.txt
    if (id === 'nTRN') {
        const test = tokens.map((token) => read4ByteInteger(token));
        const obj = {
            nodeId: read4ByteInteger(contentData.splice(0, 4)),
            nodeAttributes: readDict(contentData),
            child: read4ByteInteger(contentData.splice(0, 4)),
            reserved: read4ByteInteger(contentData.splice(0, 4)),
            layer: read4ByteInteger(contentData.splice(0, 4)),
            numFrames: read4ByteInteger(contentData.splice(0, 4)),
            frameAttributes: [],
        };
        for (let i = 0; i < obj.numFrames; i++) {
            obj.frameAttributes.push(readDict(contentData));
        }
        return obj;
    }
    if (id === 'nGRP') {
        const obj = {
            nodeId: read4ByteInteger(contentData.splice(0, 4)),
            nodeAttributes: readDict(contentData),
            child: read4ByteInteger(contentData.splice(0, 4)),
            children: [],
        };
        for (let i = 0; i < obj.child; i++) {
            obj.children.push(read4ByteInteger(contentData.splice(0, 4)));
        }
        return obj;
    }
    if (id === 'nSHP') {
        const obj = {
            nodeId: read4ByteInteger(contentData.splice(0, 4)),
            nodeAttributes: readDict(contentData),
            numModels: read4ByteInteger(contentData.splice(0, 4)),
            models: [],
        };
        for (let i = 0; i < obj.numModels; i++) {
            obj.models.push(readDict(contentData));
        }
        return obj;
    }
    if (id === 'MATL')
        return {
            materialId: read4ByteInteger(contentData.splice(0, 4)),
            materialProperties: readDict(contentData),
        };
    if (id === 'LAYR')
        return {
            layerId: read4ByteInteger(contentData.splice(0, 4)),
            layerAttributes: readDict(contentData),
            reservedId: read4ByteInteger(contentData.splice(0, 4)),
        };
    if (id === 'rOBJ')
        return {
            renderAttributes: readDict(contentData),
        };
    if (id === 'rCAM')
        return {
            cameraId: read4ByteInteger(contentData.splice(0, 4)),
            cameraAttributes: readDict(contentData),
        };
    if (id === 'NOTE') {
        const obj = {
            numColorNames: read4ByteInteger(contentData.splice(0, 4)),
            colorNames: [],
        };
        for (let i = 0; i < obj.numColorNames; i++) {
            obj.colorNames.push(readString(contentData));
        }
        return obj;
    }
    if (id === 'IMAP')
        return {
            size: read4ByteInteger(contentData.splice(0, 4)),
            indexAssociations: contentData.splice(0, 256).map((c) => read4ByteInteger(c)),
        };
    if (id === 'MATT') {
        console.warn('MATT is deprecated, use MATL instead');
        return {
            id: read4ByteInteger(tokens[0]),
            materialType: read4ByteInteger(tokens[1]),
            materialWeight: read4ByteFloat(tokens[2]),
            propertyBits: read4ByteInteger(tokens[3]),
            normalizedPropertyValues: tokens
                .slice(4)
                .map((token) => read4ByteFloat(token))
        };
    }
    return {};
};
module.exports = parseVoxChunk;
//# sourceMappingURL=parseVoxChunk.js.map