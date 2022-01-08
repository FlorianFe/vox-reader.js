
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
        result[child.id.toLowerCase()] = removeRiffStructure(child);
    });

    Object.entries(riffObject.data).forEach(([key, value]) => 
    {
        result[key] = value;
    });

    return result;
}

export = removeRiffStructure;