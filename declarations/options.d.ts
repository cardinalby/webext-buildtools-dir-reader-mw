import { IZipOptions } from './zipOptions';

export interface IDirReaderOptions {
    /** Target path for built unsigned zip file */
    zipOutPath?: string;
    /**
     * Optional, use to specify which files will be included
     * to the archive and pass options to archiver
     */
    zipOptions?: IZipOptions;
}
