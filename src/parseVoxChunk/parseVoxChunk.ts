import readString from "../shared/readString/readString";
import readInt from '../shared/readInt/readInt';
import groupArray from '../shared/groupArray/groupArray';

const BLOCK_SIZE = 4;
const flatten = (array : Array<any>) =>
  [].concat.apply([], array);
const readDict = (contentData: number[]) => {
  const dict: any = {};
  let i = 0
  
  const amount = readInt(contentData.splice(0,4))
  while(i < amount) {
    const keyLength = readInt(contentData.splice(0,4));
    const key = readString(flatten(contentData.splice(0,keyLength)));
    
    const valueLength = readInt(contentData.splice(0,4));
    const value = readString(contentData.splice(0,valueLength));
    i++;
    dict[key] = value;
  }
  return dict
}

const parseVoxChunk = (id : string, contentData : Array<number>) =>
{
  const tokens = groupArray(contentData, BLOCK_SIZE);

  // base https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt
  if(id === 'PACK') return {
    numModels: readInt(tokens[0])
  };

  if(id === 'SIZE'){
    if(!tokens[0]){
      console.log('SIZE chunk has no data')
    }
    return {
      x: readInt(tokens[0]),
      y: readInt(tokens[1]),
      z: readInt(tokens[2])
    }
  } 

  if(id === 'XYZI') return {
    numVoxels: readInt(tokens[0]),
    values: tokens
      .slice(1)
      .map((c : Array<number>) => ({ x: c[0], y: c[1], z: c[2], i: c[3] }))
  }

  if(id === 'RGBA') return {
    values: tokens
      .map((c : Array<number>) => ({ r: c[0], g: c[1], b: c[2], a: c[3] }))
  }
  type frameAttributes = {
      _t: string,
  }
  type nodeAttributes = {
      _name: string,
      _hidden?: 0 | 1,
  }
  // extended https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox-extension.txt
  if(id === 'nTRN') {
    const obj: {
      nodeId: number,
      nodeAttributes: nodeAttributes,
      child: number,
      reserved: number,
      layer: number,
      numFrames: number,
      frames: frameAttributes[],
    } = {
    nodeId: readInt(contentData.splice(0,4)),
    nodeAttributes: readDict(contentData),
    child: readInt(contentData.splice(0,4)),
    reserved: readInt(contentData.splice(0,4)),
    layer: readInt(contentData.splice(0,4)),
    numFrames: readInt(contentData.splice(0,4)),
    frames: [],
  }
  for(let i = 0; i < obj.numFrames; i++) {
    obj.frames.push(readDict(contentData));
  }
  return obj;
  }
  if (id === 'nGRP') {
    const obj: {
      nodeId: number,
      nodeAttributes: nodeAttributes,
      child: number,
      children: number[],
    } = {
    nodeId: readInt(contentData.splice(0,4)),
    nodeAttributes: readDict(contentData),
    child: readInt(contentData.splice(0,4)),
    children: [],
  }
    for(let i = 0; i < obj.child; i++) {
      obj.children.push(readInt(contentData.splice(0,4)));
    }
    return obj;
  }
  if (id === 'nSHP') {
    const obj: {
      nodeId: number,
      nodeAttributes: any,
      numModels: number,
      models: any[],
    } = {
    nodeId: readInt(contentData.splice(0,4)),
    nodeAttributes: readDict(contentData),
    numModels: readInt(contentData.splice(0,4)),
    models: [],
  }
    for(let i = 0; i < obj.numModels; i++) {
      obj.models.push([readInt(contentData.splice(0,4)),readDict(contentData)]);
    }
    return obj;
  }
  if (id === 'MATL') return {
      materialId: readInt(contentData.splice(0,4)),
      materialProperties: readDict(contentData),
    }
  if(id === 'LAYR') return {
    layerId: readInt(contentData.splice(0,4)),
    layerAttributes: readDict(contentData),
    reservedId: readInt(contentData.splice(0,4)),
  }
  
  if(id === 'rOBJ') return {
    renderAttributes: readDict(contentData),
  }
	if (id === 'rCAM') return {
    cameraId: readInt(contentData.splice(0,4)),
    cameraAttributes: readDict(contentData),
  }
	if (id === 'NOTE') {
    const obj: {
      numColorNames: number,
      colorNames: string[],
    } = {
    numColorNames: readInt(contentData.splice(0,4)),
    colorNames: [],
    }
    for(let i = 0; i < obj.numColorNames; i++) {
      const stringLength = readInt(contentData.splice(0,4));
      obj.colorNames.push(readString(flatten(contentData.splice(0,stringLength))));
    }
    return obj;
  }
  if (id === 'IMAP') {
    
    return {
    indexAssociations: contentData.splice(0,256),
  }}

  return {};
}

export = parseVoxChunk;
