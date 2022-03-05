
import readChunks from './readChunks/readChunks';

const readRiffFile = (buffer : Array<number>, offset : number, parser : Function) =>
{
    const dataWithoutOffset = buffer.slice(offset);
    const chunks = readChunks(dataWithoutOffset, parser);

    return chunks[0];
}

export = readRiffFile;
