declare type Size = {
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
declare type VoxStructure = {
    size: Size;
    xyzi: XYZI;
    rgba: RGBA;
};
