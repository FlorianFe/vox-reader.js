declare type Node = {
    id: string;
    data: any;
    children: Array<Node>;
};
declare const readChunks: (data: Array<number>, parser: Function) => Node[];
export = readChunks;
