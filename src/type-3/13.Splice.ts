// @ts-nocheck
// 删除并且替换部分元素

// [].includes
// some
// every
// ....
// startWith
// endsWith
// ...
export type Splice<
  T extends any[],
  S extends number,
  E extends number,
  I extends any[] = [],
  SA extends any[] = [],
  SE extends any[] = [],
  F extends any[] = []
> = T extends [infer L, ...infer R]
  ? SA["length"] extends S
    ? SE["length"] extends E
      ? [...F, ...I, ...T] // 之前收集的需要 + 插入的 + 最后的
      : Splice<R, S, E, I, SA, [...SE, "aaa"], F>
    : Splice<R, S, E, I, [...SA, "aaa"], [...SE, "aaa"], [...F, L]>
  : any;

type A1 = Splice<[string, number, boolean, null, undefined, never], 0, 2>; // [boolean,null,undefined,never]               从第0开始删除，删除2个元素
type A2 = Splice<[string, number, boolean, null, undefined, never], 1, 3>; // [string,undefined,never]                     从第1开始删除，删除3个元素
type A3 = Splice<
  [string, number, boolean, null, undefined, never],
  1,
  2,
  [1, 2, 3]
>; // [string,1,2,3,undefined,never]          从第1开始删除，删除2个元素，替换为另外三个元素1,2,3                            从第0个位置开始，保留后面所有元素类型

export {};
