"use strict";
const { floor } = Math;
const groupArray = (array, groupSize) => {
    return array.reduce((result, item, index) => {
        const i1 = floor(index / groupSize);
        const i2 = index % groupSize;
        if (i2 == 0)
            result.push([]);
        result[i1].push(item);
        return result;
    }, []);
};
module.exports = groupArray;
//# sourceMappingURL=groupArray.js.map