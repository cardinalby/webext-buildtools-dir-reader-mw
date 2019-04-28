import { ArchiverOptions } from 'archiver';

export interface IZipOptions {
    globPattern?: string;
    ignore?: string[];
    archiverOptions?: ArchiverOptions;
}