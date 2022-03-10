"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const readChunks_1 = __importDefault(require("./readChunks/readChunks"));
const readRiffFile = (buffer, offset, parser) => {
    const dataWithoutOffset = buffer.slice(offset);
    const chunks = (0, readChunks_1.default)(dataWithoutOffset, parser);
    return chunks[0];
};
module.exports = readRiffFile;
//# sourceMappingURL=readRiffFile.js.map