![npm-publish](https://github.com/cardinalby/webext-buildtools-dir-reader-mw/workflows/npm-publish/badge.svg)
### Introduction
*webext-buildtools* middleware builder for reading manifest file and packing Web Extension directory to zip file.
Expected to be used to provide inputs for further builders. 

If you need a **complete solution** for Web Extension build/deploy, go to 
[webext-buildtools-integrated-builder](https://github.com/cardinalby/webext-buildtools-integrated-builder) repo.  

To read what are *webext-buildtools* and *builders* go to 
[webext-buildtools-builder-types](https://github.com/cardinalby/webext-buildtools-builder-types) repo.

### Installation
`npm install webext-buildtools-dir-reader-mw`

### Usage example
```js
const DirReaderBuilder = require('webext-buildtools-dir-reader-mw').default;

const options = { zipOutPath: './out/ext.zip' };
const logMethod = console.log;
const builder = new DirReaderBuilder(options, logMethod);

builder.setInputDirPath('./ext_dir');

builder.requireZipFile();
builder.requireManifest();

const buildResult = await builder.build();
```

### Options
Options object described in [declarations/options.d.ts](declarations/options.d.ts)

[See](https://github.com/cardinalby/webext-buildtools-integrated-builder/blob/master/logMethod.md) how to get `logMethod` for pretty output.

### Inputs
* **`setInputDirPath(...)`**. Path to Web Extension directory 

### Outputs
#### zip
directory packed to zip <br>

*Required options:* `zipOutPath` (for not temporary file) <br>
*Require methods:* `requireZipFile()`, `requireZipBuffer()` <br>
*Assets:* <br> 
`const buffer = buildResult.getAssets().zipBuffer.getValue()`<br>
`const zipFilePath = buildResult.getAssets().zipFile.getValue()`

#### manifest 
Object with parsed manifest file       

*Require methods:* `requireManifest()` <br>
*Assets:* <br>
`const manifestObj = buildResult.getAssets().manifest.getValue()`    