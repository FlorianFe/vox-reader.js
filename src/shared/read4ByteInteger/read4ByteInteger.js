"use strict";
const read4ByteInteger = (data) => (data.map((num, index) => (num * Math.pow(2, (8 * index))))
    .reduce((sum, summand) => sum + summand, 0) << 32) >> 32;
module.exports = read4ByteInteger;
//# sourceMappingURL=read4ByteInteger.js.map