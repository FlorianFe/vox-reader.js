export declare type PACK = {
    numModels: number;
};
export declare type SIZE = {
    x: number;
    y: number;
    z: number;
};
export declare type XYZI = {
    numVoxels: number;
    values: Array<{
        x: number;
        y: number;
        z: number;
        i: number;
    }>;
};
export declare type RGBA = {
    values: Array<{
        r: number;
        g: number;
        b: number;
        a: number;
    }>;
};
export declare type frameAttributes = {
    _r: string;
    _t: string;
    _f: string;
};
export declare type nodeAttributes = {
    _name: string;
    _hidden?: string;
};
export declare type nTRN = {
    nodeId: number;
    nodeAttributes: nodeAttributes;
    child: number;
    reserved: number;
    layer: number;
    numFrames: number;
    frames: frameAttributes[];
};
export declare type nGRP = {
    nodeId: number;
    nodeAttributes: nodeAttributes;
    child: number;
    children: number[];
};
export declare type modelAttributes = [
    number,
    {
        _f: string;
    }
];
export declare type nSHP = {
    nodeId: number;
    nodeAttributes: any;
    numModels: number;
    models: modelAttributes[];
};
export declare type MATL = {
    materialId: number;
    materialProperties: any;
};
export declare type layerAttributes = {
    _name: string;
    _hidden?: string;
};
export declare type LAYR = {
    layerId: number;
    layerAttributes: layerAttributes;
    reservedId: -1;
};
export declare type rOBJ = {
    renderAttributes: any;
};
export declare type cameraAttributes = {
    _mode: string;
    _focus: string;
    _angle: string;
    _radius: string;
    _frustum: string;
    _fov: string;
};
export declare type rCAM = {
    cameraId: number;
    cameraAttributes: cameraAttributes;
};
export declare type NOTE = {
    numColorNames: number;
    colorNames: string[];
};
export declare type IMAP = {
    size: number;
    indexAssociations: number[];
};
export declare type VoxNode = {
    id: string;
    data: any;
    children: Array<VoxNode>;
    index?: number;
};
export declare type VoxStructure = {
    PACK?: PACK[];
    SIZE: SIZE[];
    XYZI: XYZI[];
    RGBA: RGBA[];
    nTRN?: nTRN[];
    nGRP?: nGRP[];
    nSHP?: nSHP[];
    MATL?: MATL[];
    LAYR?: LAYR[];
    rOBJ?: rOBJ[];
    rCAM?: rCAM[];
    NOTE?: NOTE[];
    IMAP?: IMAP[];
};
