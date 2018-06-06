
const fs = require('fs');
const util = require('util')

const readVoxFile = require('./src/readVox');

fs.readFile('test.vox', (error, buffer) =>
{
  if (error) throw error;

  const voxData = readVoxFile(buffer);

  console.log(util.inspect(voxData, { showHidden: false, depth: null }))
});
