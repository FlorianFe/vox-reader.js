"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const readString_1 = __importDefault(require("../shared/readString/readString"));
const readInt_1 = __importDefault(require("../shared/readInt/readInt"));
const groupArray_1 = __importDefault(require("../shared/groupArray/groupArray"));
const BLOCK_SIZE = 4;
const flatten = (array) => [].concat.apply([], array);
const readDict = (contentData) => {
    const dict = {};
    let i = 0;
    const amount = (0, readInt_1.default)(contentData.splice(0, 4));
    while (i < amount) {
        const keyLength = (0, readInt_1.default)(contentData.splice(0, 4));
        const key = (0, readString_1.default)(flatten(contentData.splice(0, keyLength)));
        const valueLength = (0, readInt_1.default)(contentData.splice(0, 4));
        const value = (0, readString_1.default)(contentData.splice(0, valueLength));
        i++;
        dict[key] = value;
    }
    return dict;
};
const parseVoxChunk = (id, contentData) => {
    const tokens = (0, groupArray_1.default)(contentData, BLOCK_SIZE);
    // base https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt
    if (id === 'PACK')
        return {
            numModels: (0, readInt_1.default)(tokens[0])
        };
    if (id === 'SIZE') {
        if (!tokens[0]) {
            console.log('SIZE chunk has no data');
        }
        return {
            x: (0, readInt_1.default)(tokens[0]),
            y: (0, readInt_1.default)(tokens[1]),
            z: (0, readInt_1.default)(tokens[2])
        };
    }
    if (id === 'XYZI')
        return {
            numVoxels: (0, readInt_1.default)(tokens[0]),
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
        const obj = {
            nodeId: (0, readInt_1.default)(contentData.splice(0, 4)),
            nodeAttributes: readDict(contentData),
            child: (0, readInt_1.default)(contentData.splice(0, 4)),
            reserved: (0, readInt_1.default)(contentData.splice(0, 4)),
            layer: (0, readInt_1.default)(contentData.splice(0, 4)),
            numFrames: (0, readInt_1.default)(contentData.splice(0, 4)),
            frames: [],
        };
        for (let i = 0; i < obj.numFrames; i++) {
            obj.frames.push(readDict(contentData));
        }
        return obj;
    }
    if (id === 'nGRP') {
        const obj = {
            nodeId: (0, readInt_1.default)(contentData.splice(0, 4)),
            nodeAttributes: readDict(contentData),
            child: (0, readInt_1.default)(contentData.splice(0, 4)),
            children: [],
        };
        for (let i = 0; i < obj.child; i++) {
            obj.children.push((0, readInt_1.default)(contentData.splice(0, 4)));
        }
        return obj;
    }
    if (id === 'nSHP') {
        const obj = {
            nodeId: (0, readInt_1.default)(contentData.splice(0, 4)),
            nodeAttributes: readDict(contentData),
            numModels: (0, readInt_1.default)(contentData.splice(0, 4)),
            models: [],
        };
        for (let i = 0; i < obj.numModels; i++) {
            obj.models.push([(0, readInt_1.default)(contentData.splice(0, 4)), readDict(contentData)]);
        }
        return obj;
    }
    if (id === 'MATL')
        return {
            materialId: (0, readInt_1.default)(contentData.splice(0, 4)),
            materialProperties: readDict(contentData),
        };
    if (id === 'LAYR')
        return {
            layerId: (0, readInt_1.default)(contentData.splice(0, 4)),
            layerAttributes: readDict(contentData),
            reservedId: (0, readInt_1.default)(contentData.splice(0, 4)),
        };
    if (id === 'rOBJ')
        return {
            renderAttributes: readDict(contentData),
        };
    if (id === 'rCAM')
        return {
            cameraId: (0, readInt_1.default)(contentData.splice(0, 4)),
            cameraAttributes: readDict(contentData),
        };
    if (id === 'NOTE') {
        const obj = {
            numColorNames: (0, readInt_1.default)(contentData.splice(0, 4)),
            colorNames: [],
        };
        for (let i = 0; i < obj.numColorNames; i++) {
            const stringLength = (0, readInt_1.default)(contentData.splice(0, 4));
            obj.colorNames.push((0, readString_1.default)(flatten(contentData.splice(0, stringLength))));
        }
        return obj;
    }
    if (id === 'IMAP') {
        return {
            indexAssociations: contentData.splice(0, 256),
        };
    }
    return {};
};
module.exports = parseVoxChunk;
//# sourceMappingURL=parseVoxChunk.js.map