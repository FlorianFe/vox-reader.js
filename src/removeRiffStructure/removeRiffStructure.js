"use strict";
const removeRiffStructure = (riffObject) => {
    let result = {};
    riffObject.children.forEach((child) => {
        result[child.id.toLowerCase()] = removeRiffStructure(child);
    });
    Object.entries(riffObject.data).forEach(([key, value]) => {
        result[key] = value;
    });
    return result;
};
module.exports = removeRiffStructure;
//# sourceMappingURL=removeRiffStructure.js.map