# vox-reader
npm module for reading [.vox](https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt) files which can be exported in [MagickaVoxel](https://ephtracy.github.io/). It's the inverse function to [vox-saver.js](https://github.com/FlorianFe/vox-saver.js)

## 💾 Installation

 ```bash
npm install --save vox-reader
```

## 🚀 Usage

 ```js
const fs = require('fs');
const readVox = require('vox-reader');

fs.readFile('my-voxel-art.vox', (error, buffer) =>
{
  if (error) throw error;

  console.log(readVox(buffer));
});
```

## 📖 License

(c) 2019 Florian Fechner. [MIT License](https://github.com/FlorianFe/vox-reader.js/blob/master/LICENSE)
