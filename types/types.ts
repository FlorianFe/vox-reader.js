
type Size = {
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

type VoxStructure = {
    size: Size,
    xyzi: XYZI,
    rgba: RGBA,
}