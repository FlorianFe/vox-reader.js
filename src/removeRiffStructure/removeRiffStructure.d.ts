declare type Node = {
    id: string;
    data: any;
    children: Array<Node>;
};
declare type Result = {
    [key: string]: any;
};
declare const removeRiffStructure: (riffObject: Node) => Result;
export = removeRiffStructure;
