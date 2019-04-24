import * as fs from 'fs-extra';
import * as path from "path";
import { assertType } from 'typescript-is';
import { ISimpleBuilder } from 'webext-buildtools-builder-types';
import {
    AbstractSimpleBuilder,
    BufferBuildAsset,
    FileBuildAsset
} from 'webext-buildtools-utils';
import { IDirReaderOptions } from '../declarations/options';
import { DirReaderBuildResult, ManifestBuildAsset } from './buildResult';
import { IManifestObject } from './manifest';
import { ZipPacker } from './zipPacker';

// noinspection JSUnusedGlobalSymbols
export class DirReaderBuilder
    extends AbstractSimpleBuilder<IDirReaderOptions, DirReaderBuildResult>
    implements ISimpleBuilder<DirReaderBuildResult>
{
    public static readonly TARGET_NAME = 'webext-dir-reader';
    public static readonly MANIFEST_FILE_NAME = 'manifest.json';
    
    protected _inputDirPath?: string;
    protected _zipFileRequirement?: boolean;
    protected _zipBufferRequired: boolean = false;
    protected _manifestRequired?: boolean = false;

    // noinspection JSMethodCanBeStatic
    public getTargetName(): string {
        return DirReaderBuilder.TARGET_NAME;
    }

    // noinspection JSUnusedGlobalSymbols
    public setInputDirPath(dirPath: string): this {
        this._inputDirPath = dirPath;
        return this;
    }

    // noinspection JSUnusedGlobalSymbols
    public requireZipFile(temporary: boolean = false): this {
        this._zipFileRequirement = !!temporary;
        return this;
    }

    // noinspection JSUnusedGlobalSymbols
    public requireZipBuffer(): this {
        this._zipBufferRequired = true;
        return this;
    }

    // noinspection JSUnusedGlobalSymbols
    public requireManifest(): this {
        this._manifestRequired = true;
        return this;
    }

    public async build(): Promise<DirReaderBuildResult> {
        if (this._zipFileRequirement === false && !this._options.zipOutPath) {
            throw new Error("Not temporary zip file was required, but zipOutPath options isn't set");
        }

        if (!this._inputDirPath) {
            throw new Error("input dir path is not set");
        }

        const result = new DirReaderBuildResult();
        if (this._zipFileRequirement === undefined && !this._manifestRequired && !this._zipBufferRequired) {
            this._logWrapper.warn('No outputs required, do nothing');
            return result;
        }

        if (this._manifestRequired) {
            const manifestFilePath = path.join(this._inputDirPath, DirReaderBuilder.MANIFEST_FILE_NAME);
            this._logWrapper.info(`Reading '${manifestFilePath}'...`);
            const data = await fs.readJSON(manifestFilePath);
            try {
                assertType<IManifestObject>(data);
            }
            catch (err) {
                throw new Error(`Manifest validation error. ${err.message}`);
            }

            this._logWrapper.info(`Manifest asset added to result`);
            result.getAssets().manifest = new ManifestBuildAsset(data);
        }

        if (this._zipBufferRequired || this._zipFileRequirement !== undefined) {
            const packer = new ZipPacker(this._inputDirPath, this._options.zipOptions);
            this._logWrapper.info(`Packing '${this._inputDirPath}'...`);
            const buffer = await packer.pack();

            if (this._zipBufferRequired) {
                result.getAssets().zipBuffer = new BufferBuildAsset(buffer);
                this._logWrapper.info(`Buffer asset added to result`);
            }

            if (this._zipFileRequirement === true) {
                result.getAssets().zipFile = await FileBuildAsset.writeAndCreateTemporary(
                    'webext',
                    'tmp_packed.zip',
                    buffer
                );
                this._logWrapper.info(`File asset added to result`);
            }
            else if (this._zipFileRequirement === false) {
                result.getAssets().zipFile = await FileBuildAsset.writeAndCreatePersistent(
                    this._options.zipOutPath as string,
                    buffer
                );
                this._logWrapper.info(`Temporary file asset added to result`);
            }
        }

        return result;
    }
}
