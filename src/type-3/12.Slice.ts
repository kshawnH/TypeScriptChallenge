// @ts-nocheck

// 如果没有达到开头的长度 就要记录找到了多少个元素
// 始终要计算结束位置，是否达到

// 记录递归次数 只能通过元组没有其他方式
export type Slice<
  T extends any[],
  S extends number,
  E extends number = T["length"], // S E 用户传递的
  SA extends any[] = [], // 记录当前遍历到的个数，达到开始索引后长度不在变化
  SE extends any[] = [], // 结束数组会一直累加
  F extends any[] = []
> = T extends [infer L, ...infer R]
  ? SA["length"] extends S
    ? SE["length"] extends E
      ? [...F, L]
      : Slice<R, S, E, SA, [...SE, "aaa"], [...F, L]>
    : Slice<R, S, E, [...SA, "aaa"], [...SE, "aaa"], F> // 有没有达到要截取的部分 Slice<T,1,3, [1],[1,2,3], [never,1,'2']>
  : F;

type A1 = Slice<[any, never, 1, "2", true, boolean], 2, 2>; // [any,never,1]                    从第0个位置开始，保留到第2个位置的元素类型
type A2 = Slice<[any, never, 1, "2", true, boolean], 1, 3>; // [never,1,'2']                    从第1个位置开始，保留到第3个位置的元素类型
type A3 = Slice<[any, never, 1, "2", true, boolean], 1, 2>; // [never,1]                        从第1个位置开始，保留到第2个位置的元素类型
type A4 = Slice<[any, never, 1, "2", true, boolean], 2>; // [1,'2',true,boolean]             从第2个位置开始，保留后面所有元素类型
type A5 = Slice<[any], 2>; // []                               从第2个位置开始，保留后面所有元素类型
type A6 = Slice<[], 0>; // []                               从第0个位置开始，保留后面所有元素类型

export {};
