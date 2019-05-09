import { ArchiverOptions } from 'archiver';

export interface IZipOptions {
    /**
     * Include files according to the pattern.
     * If not specified, default value will be used:
     *  '**'
     */
    globPattern?: string;
    /**
     * Patterns of files which will be excluded from the zip
     * If not specified, default value will be used:
     * ['*.pem', '.git', '*.crx']
     */
    ignore?: string[];
    /**
     * Optional additional options for archiver package
     * @see https://www.archiverjs.com/module-plugins_zip-zip
     */
    archiverOptions?: ArchiverOptions;
}