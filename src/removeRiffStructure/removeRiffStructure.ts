import { VoxNode } from "../../types/types";

const removeRiffStructure = (riffObject : VoxNode) =>
{
    let result : any = {};

    riffObject.children.forEach((child : VoxNode) => 
    {
        let list = result[child.id];
        if(!list) list = [];
        list.push(removeRiffStructure(child));
        result[child.id] = list;
    });

    Object.entries(riffObject.data).forEach(([key, value]) => 
    {
        result[key] = value;
    });
    result.index = riffObject.index;
    return result;
}

export = removeRiffStructure;