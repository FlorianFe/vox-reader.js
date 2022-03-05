"use strict";
const readInt = (data) => (data.map((num, index) => (num * Math.pow(2, (8 * index))))
    .reduce((sum, summand) => sum + summand, 0) << 32) >> 32;
module.exports = readInt;
//# sourceMappingURL=readInt.js.map