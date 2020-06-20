import { BaseBuildResult, BasicTypeBuildAsset, BufferBuildAsset, FileBuildAsset } from 'webext-buildtools-utils';
import { IManifestObject } from '../declarations/manifest';

export class ManifestBuildAsset extends BasicTypeBuildAsset<IManifestObject> {}

export class DirReaderBuildResult extends BaseBuildResult<{
    zipBuffer?: BufferBuildAsset;
    zipFile?: FileBuildAsset;
    manifest?: ManifestBuildAsset;
}> {
}
