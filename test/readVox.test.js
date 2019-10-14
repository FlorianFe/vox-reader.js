
const fs = require('fs');
const util = require('util');
const readVox = require('../index');

fs.readFile('test/deer.vox', (error, buffer) =>
{
 if (error) throw error;

 console.log(util.inspect(readVox(buffer), false, null, true))
});