
type Node = {
    id: string,
    data: any,
    children: Array<Node>,
}

type Result = {
    [key: string]: any
}

const removeRiffStructure = (riffObject : Node) =>
{
    let result : Result = {};

    riffObject.children.forEach((child : Node) => 
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

    return result;
}

export = removeRiffStructure;