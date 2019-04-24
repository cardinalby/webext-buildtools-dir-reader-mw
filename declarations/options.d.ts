import { IZipOptions } from '../src/zipPacker';

export interface IDirReaderOptions {
    /** Target path for built unsigned zip file */
    zipOutPath?: string;
    zipOptions?: IZipOptions;
}
