
const fs = require('fs')
const util = require('util')
const test = require('ava');
const readVox = require('../index')
const writeVox = require('vox-saver')
const { diff } = require("json-diff")

test('test deer.vox', (t : any) => 
{
    const buffer = fs.readFileSync('./test/deer.vox')

    console.log(util.inspect(readVox(buffer), false, null, true))

    const vox = readVox(buffer)

    t.assert(diff(vox, readVox(writeVox(vox))) === undefined, "vox-reader and vox-writer should be the same");
    
    t.pass();
});