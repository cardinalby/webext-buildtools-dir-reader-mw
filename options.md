### Options
Options object definition (from [declarations/options.d.ts](declarations/options.d.ts)):
```ts
interface IDirReaderOptions {
    /** Target path for built unsigned zip file */
    zipOutPath?: string;
    zipOptions?: IZipOptions;
}
```
* **zipOutPath** is required to specify output path for not temporary zip file if you need one. 
To require it call `builder.requireZipFile(false)`
* **zipOptions** is optional, use to specify which files will be included to the 
*archive* and pass options to *archiver*. Declaration of it's structure 
(from [declarations/zipOptions.d.ts](declarations/zipOptions.d.ts)):
```ts
interface IZipOptions {
    globPattern?: string;
    ignore?: string[];
    archiverOptions?: ArchiverOptions;
}
```
* **globPattern**. Include files according to the pattern. 
If not specified, default value will be used: `'**'`
* **ignore**. Patterns of files which will be excluded from the zip.
If not specified, default value will be used: `['*.pem', '.git', '*.crx']`
* **archiverOptions**. Optional additional options for archiver package, see 
[definition](https://www.archiverjs.com/module-plugins_zip-zip).