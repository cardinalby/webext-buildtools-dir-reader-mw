import {
    BaseBuildResult,
    BasicTypeBuildAsset,
    BufferBuildAsset,
    FileBuildAsset,
    IManifestObject
} from 'webext-buildtools-utils';

export class ManifestBuildAsset extends BasicTypeBuildAsset<IManifestObject> {}

export class DirReaderBuildResult extends BaseBuildResult<{
    zipBuffer?: BufferBuildAsset;
    zipFile?: FileBuildAsset;
    manifest?: ManifestBuildAsset;
}> {
}
