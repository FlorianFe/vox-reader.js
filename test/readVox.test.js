"use strict";
const fs = require('fs');
const util = require('util');
const test = require('ava');
const readVox = require('../index');
const writeVox = require('vox-saver');
const { diff } = require("json-diff");
// test('test deer.vox', (t : any) => 
// {
//     const buffer = fs.readFileSync('./test/deer.vox')
//     console.log(util.inspect(readVox(buffer), false, null, true))
//     const vox = readVox(buffer)
//     t.assert(diff(vox, readVox(writeVox(vox))) === undefined, "vox-reader and vox-writer should be the same");
//     t.pass();
// });
test('test extended.vox', (t) => {
    const buffer = fs.readFileSync('./test/extended.vox');
    console.log(util.inspect(readVox(buffer), false, null, true));
    const vox = readVox(buffer);
    const writtenVox = readVox(writeVox(vox));
    fs.writeFileSync('./test/extended-out.vox', Buffer.from(writeVox(vox)));
    t.assert(diff(vox, writtenVox) === undefined, "vox-reader and vox-writer should be the same (handling extended files)");
    t.pass();
});
//# sourceMappingURL=readVox.test.js.map