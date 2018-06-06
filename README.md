# vox-reader
npm module for reading [.vox](https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt) files which can be exported in [MagickaVoxel](https://ephtracy.github.io/). 

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
