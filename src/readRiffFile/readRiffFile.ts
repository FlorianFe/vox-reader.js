
const readChunks = require('./readChunks/readChunks');

const readRiffFile = (buffer : Array<number> | Buffer, offset : number, parser : Function) =>
{
    const dataWithoutOffset = buffer.slice(offset);
    const chunks = readChunks(dataWithoutOffset, parser);

    return chunks[0];
}

export = readRiffFile;
