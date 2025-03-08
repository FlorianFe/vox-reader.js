"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const readString_1 = __importDefault(require("../../shared/readString/readString"));
const readInt_1 = __importDefault(require("../../shared/readInt/readInt"));
const groupArray_1 = __importDefault(require("../../shared/groupArray/groupArray"));
const BLOCK_SIZE = 4;
const HEADER_SIZE = 12;
const readChunks = (data, parser) => {
    let chunks = [];
    while (data.length != 0) {
        const headerData = data.slice(0, HEADER_SIZE);
        const header = (0, groupArray_1.default)(headerData, BLOCK_SIZE);
        const chunkId = (0, readString_1.default)(header[0]);
        const contentBytes = (0, readInt_1.default)(header[1]);
        const childrenBytes = (0, readInt_1.default)(header[2]);
        chunks.push(createChunk(data, chunkId, contentBytes, childrenBytes, parser));
        data = data.slice(HEADER_SIZE + contentBytes);
    }
    return chunks;
};
const createChunk = (data, id, contentBytes, childrenBytes, parser) => {
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
module.exports = readChunks;
//# sourceMappingURL=readChunks.js.map