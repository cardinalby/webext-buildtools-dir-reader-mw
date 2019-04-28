import * as arc from 'archiver';
import { Archiver, ArchiverOptions } from 'archiver';
import * as streamBuffers from 'stream-buffers';
import { IZipOptions } from '../declarations/zipOptions';

// noinspection JSUnusedGlobalSymbols
export class ZipPacker {
    public static readonly DEFAULT_GLOB_PATTERN = '**';
    public static readonly DEFAULT_IGNORE = ['*.pem', '.git', '*.crx'];

    public readonly srcDirectory: string;
    public readonly globPattern: string;
    public readonly ignore: string[];
    public readonly archiverOptions?: ArchiverOptions;

    public constructor(srcDirectory: string, options?: IZipOptions) {
        this.srcDirectory = srcDirectory;
        this.globPattern = (options && options.globPattern) || ZipPacker.DEFAULT_GLOB_PATTERN;
        this.ignore = (options && options.ignore) || ZipPacker.DEFAULT_IGNORE;
        this.archiverOptions = options && options.archiverOptions;
    }

    public pack(): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const archive = arc('zip', this.archiverOptions);
            const outputStreamBuffer = new streamBuffers.WritableStreamBuffer({ initialSize: 2048 });

            archive.on('error', reject);
            archive.on('finish', () => resolve(outputStreamBuffer.getContents()));
            archive.pipe(outputStreamBuffer);

            this.appendToArchive(archive);

            archive.finalize();
        });
    }

    protected appendToArchive(archive: Archiver) {
        archive.glob(this.globPattern, {
            cwd: this.srcDirectory,
            matchBase: true,
            ignore: this.ignore,
        });
    }
}
