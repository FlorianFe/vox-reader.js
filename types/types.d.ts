declare type PACK = {
    numModels: number;
};
declare type SIZE = {
    x: number;
    y: number;
    z: number;
};
declare type XYZI = {
    numVoxels: number;
    values: Array<{
        x: number;
        y: number;
        z: number;
        i: number;
    }>;
};
declare type RGBA = {
    values: Array<{
        r: number;
        g: number;
        b: number;
        a: number;
    }>;
};
declare type frameAttributes = {
    _r: string;
    _t: string;
    _f: string;
};
declare type nodeAttributes = {
    _name: string;
    _hidden?: string;
};
declare type nTRN = {
    nodeId: number;
    nodeAttributes: nodeAttributes;
    child: number;
    reserved: number;
    layer: number;
    numFrames: number;
    frames: frameAttributes[];
};
declare type nGRP = {
    nodeId: number;
    nodeAttributes: nodeAttributes;
    child: number;
    children: number[];
};
declare type modelAttributes = [
    number,
    {
        _f: string;
    }
];
declare type nSHP = {
    nodeId: number;
    nodeAttributes: any;
    numModels: number;
    models: modelAttributes[];
};
declare type MATL = {
    materialId: number;
    materialProperties: any;
};
declare type layerAttributes = {
    _name: string;
    _hidden?: string;
};
declare type LAYR = {
    layerId: number;
    layerAttributes: layerAttributes;
    reservedId: -1;
};
declare type rOBJ = {
    renderAttributes: any;
};
declare type cameraAttributes = {
    _mode: string;
    _focus: string;
    _angle: string;
    _radius: string;
    _frustum: string;
    _fov: string;
};
declare type rCAM = {
    cameraId: number;
    cameraAttributes: cameraAttributes;
};
declare type NOTE = {
    numColorNames: number;
    colorNames: string[];
};
declare type IMAP = {
    size: number;
    indexAssociations: number[];
};
declare type VoxNode = {
    id: string;
    data: any;
    children: Array<VoxNode>;
    index?: number;
};
declare type VoxStructure = {
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
