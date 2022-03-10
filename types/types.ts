export type PACK = {
    numModels: number,
    index?: number,
}

export type SIZE = {
    x: number,
    y: number,
    z: number,
    index?: number,
}

export type XYZI = {
    numVoxels: number,
    values: Array<{
        x: number,
        y: number,
        z: number,
        i: number,
    }>,
    index?: number,
}

export type RGBA = {
    values: Array<{
        r: number,
        g: number,
        b: number,
        a: number,
    }>,
    index?: number,
}
export type frameAttributes = {
    _r: string,
    _t: string,
    _f: string,
}

export type nodeAttributes = {
    _name: string,
    _hidden?: string,
}
export type nTRN = {
    nodeId: number,
    nodeAttributes: nodeAttributes,
    child: number,
    reserved: number,
    layer: number,
    numFrames: number,
    frames: frameAttributes[],
    index?: number,
}
export type nGRP = {
    nodeId: number,
    nodeAttributes: nodeAttributes,
    child: number,
    children: number[],
    index?: number,
}
export type modelAttributes = [number,{
    _f: string,
}]
export type nSHP = {
    nodeId: number,
    nodeAttributes: any,
    numModels: number,
    models: modelAttributes[],
    index?: number,
}
export type MATL = {
    materialId: number,
    materialProperties: any,
    index?: number,
}
export type layerAttributes = {
    _name: string,
    _hidden?: string,
}
export type LAYR = {
    layerId: number,
    layerAttributes: layerAttributes,
    reservedId: -1,
    index?: number,
}
export type rOBJ = {
    renderAttributes: any,
    index?: number,
}
export type cameraAttributes = {
    _mode: string,
    _focus: string,
    _angle: string,
    _radius: string,
    _frustum: string,
    _fov: string,
}
export type rCAM = {
    cameraId: number,
    cameraAttributes: cameraAttributes,
    index?: number,
}
export type NOTE = {
    numColorNames: number,
    colorNames: string[],
    index?: number,
}
export type IMAP = {
    size: number,
    indexAssociations: number[],
    index?: number,
}

export type VoxNode = {
    id: string,
    data: any,
    children: Array<VoxNode>,
    index?: number,
}

export type VoxStructure = {
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
