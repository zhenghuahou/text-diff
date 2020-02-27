interface DiffType {
    INSERT: number;
    EQUAL: number;
    DELETE: number;
    [propName: string]: any;
}
declare type ArrItem = Array<string>;
declare type TextItem = string | number | undefined;
interface DataParams {
    revisionArr: ArrItem;
    intersectArr: ArrItem;
    isBefore?: boolean;
}
interface DiffPatchResult {
    before: string;
    after: string;
}
interface CollectionType {
    originalArr: ArrItem;
    compareArr: ArrItem;
    intersectArr: ArrItem;
}
declare const Diff: any;
declare const INSERT: number, EQUAL: number, DELETE: number;
declare function format(operation: number, txt?: string): string;
/**
 * 单个字符比较,得到`before`,`after`格式化文本
 * @param oldText
 * @param newText
 */
declare function diffPatch(oldText?: string, newText?: string): DiffPatchResult;
declare function getCollection(oldText: string, newText: string, separator: string): CollectionType;
/**
 *
 * 返回处理过的格式化文本
 */
declare function getPatchText({ revisionArr, intersectArr, isBefore }: DataParams): string;
/**
 * 通过指定分隔符比较文本,得到`before`,`after`格式化文本
 * @param oldText
 * @param newText
 * @param separator
 */
declare function diffPatchBySeparator(oldText?: TextItem, newText?: TextItem, separator?: TextItem): DiffPatchResult;
