"use strict";
const readInt = (data) => {
    const out = (data.map((num, index) => (num * Math.pow(2, (8 * index))))
        .reduce((sum, summand) => sum + summand, 0) << 32) >> 32;
    return out;
};
module.exports = readInt;
//# sourceMappingURL=readInt.js.map