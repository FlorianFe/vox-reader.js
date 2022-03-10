"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const readString_1 = __importDefault(require("./shared/readString/readString"));
const readInt_1 = __importDefault(require("./shared/readInt/readInt"));
const groupArray_1 = __importDefault(require("./shared/groupArray/groupArray"));
const readRiffFile_1 = __importDefault(require("./readRiffFile/readRiffFile"));
const parseVoxChunk_1 = __importDefault(require("./parseVoxChunk/parseVoxChunk"));
const removeRiffStructure_1 = __importDefault(require("./removeRiffStructure/removeRiffStructure"));
const readVox = (buffer) => {
    const BLOCK_SIZE = 4;
    const OFFSET = 8; // VOX <space> 150 0 0 0
    const data = [...buffer]; // convert buffer to array
    const tokens = (0, groupArray_1.default)(data, BLOCK_SIZE);
    const id = (0, readString_1.default)(tokens[0]);
    const version = (0, readInt_1.default)(tokens[1]);
    if (id != 'VOX ')
        throw Error(`Id of .vox-file should be "VOX ", found "${id}".`);
    if (version != 150)
        throw Error(`Version of .vox-file structure should be 150, found "${version}".`);
    const riffData = (0, readRiffFile_1.default)(data, OFFSET, parseVoxChunk_1.default);
    riffData.children = riffData.children.map((chunk, index) => (Object.assign(Object.assign({}, chunk), { index })));
    return (0, removeRiffStructure_1.default)(riffData);
};
module.exports = readVox;
//# sourceMappingURL=readVox.js.map