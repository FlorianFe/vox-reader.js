/// <reference types="node" />
import { VoxStructure } from '../types/types';
declare const readVox: (buffer: Array<number> | Buffer) => VoxStructure;
export = readVox;
