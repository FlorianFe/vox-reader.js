# vox-reader
npm module for reading .vox files

 ```bash
npm install --save vox-reader
```

 ```js
const readVox = require('vox-reader');

fs.readFile('my-voxel-art.vox', (error, buffer) =>
{
  if (error) throw error;

  console.log(readVox(buffer));
});
```
