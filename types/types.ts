type PACK = {
    numModels: number;
}

type SIZE = {
    x: number,
    y: number,
    z: number,
}

type XYZI = {
    numVoxels: number,
    values: Array<{
        x: number,
        y: number,
        z: number,
        i: number,
    }>,
}

type RGBA = {
    values: Array<{
        r: number,
        g: number,
        b: number,
        a: number,
    }>,
}
type frameAttributes = {
    _r: string,
    _t: string,
    _f: string,
}

type nodeAttributes = {
    _name: string,
    _hidden?: string,
}
type nTRN = {
    nodeId: number,
    nodeAttributes: nodeAttributes,
    child: number,
    reserved: number,
    layer: number,
    numFrames: number,
    frames: frameAttributes[],
}
type nGRP = {
    nodeId: number,
    nodeAttributes: nodeAttributes,
    child: number,
    children: number[],
}
type modelAttributes = [number,{
    _f: string,
}]
type nSHP = {
    nodeId: number,
    nodeAttributes: any,
    numModels: number,
    models: modelAttributes[],
}
type MATL = {
    materialId: number,
    materialProperties: any,
}
type layerAttributes = {
    _name: string,
    _hidden?: string,
}
type LAYR = {
    layerId: number,
    layerAttributes: layerAttributes,
    reservedId: -1,
}
type rOBJ = {
    renderAttributes: any,
}
type cameraAttributes = {
    _mode: string,
    _focus: string,
    _angle: string,
    _radius: string,
    _frustum: string,
    _fov: string,
}
type rCAM = {
    cameraId: number,
    cameraAttributes: cameraAttributes,
}
type NOTE = {
    numColorNames: number;
    colorNames: string[];
}
type IMAP = {
    size: number,
    indexAssociations: number[],
}

type VoxStructure = {
    PACK?: PACK[],
    SIZE: SIZE[],
    XYZI: XYZI[],
    RGBA: RGBA[],
    nTRN?: nTRN[],
    nGRP?: nGRP[],
    nSHP?: nSHP[],
    MATL?: MATL[],
    LAYR?: LAYR[],
    rOBJ?: rOBJ[],
    rCAM?: rCAM[],
    NOTE?: NOTE[],
    IMAP?: IMAP[],
}