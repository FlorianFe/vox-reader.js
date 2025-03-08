"use strict";
const lodash_1 = require("lodash");
const removeRiffStructure = (riffObject) => {
    let result = {};
    riffObject.children.forEach((child) => {
        const key = child.id.toLowerCase();
        if (result[key] != undefined) {
            if ((0, lodash_1.isArray)(result[key])) {
                result[key].push(removeRiffStructure(child));
            }
            else {
                result[key] = [result[key], removeRiffStructure(child)];
            }
        }
        else {
            result[key] = removeRiffStructure(child);
        }
    });
    Object.entries(riffObject.data).forEach(([key, value]) => {
        result[key] = value;
    });
    return result;
};
module.exports = removeRiffStructure;
//# sourceMappingURL=removeRiffStructure.js.map