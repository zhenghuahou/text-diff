declare type TextItem = string | number | undefined;
interface DiffPatchResult {
    before: string;
    after: string;
}
interface DiffResult {
    diffPatchBySeparator(oldText: TextItem, newText: TextItem, separator: TextItem): DiffPatchResult;
    diffPatch(oldText: string, newText: string): DiffPatchResult;
}
declare const _default: DiffResult;
export default _default;
