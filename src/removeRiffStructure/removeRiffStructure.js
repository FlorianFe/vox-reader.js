"use strict";
const removeRiffStructure = (riffObject) => {
    let result = {};
    riffObject.children.forEach((child) => {
        let list = result[child.id];
        if (!list)
            list = [];
        list.push(removeRiffStructure(child));
        result[child.id] = list;
    });
    Object.entries(riffObject.data).forEach(([key, value]) => {
        result[key] = value;
    });
    return result;
};
module.exports = removeRiffStructure;
//# sourceMappingURL=removeRiffStructure.js.map