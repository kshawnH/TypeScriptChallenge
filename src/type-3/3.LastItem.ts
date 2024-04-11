// @ts-nocheck
// 得到元组类型中的最后一个元素

type LastItem<T extends any[]> = T extends [...infer L, infer R] ? R : never;
type A = LastItem<[string, number, boolean]>; // boolean
type B = LastItem<["B", "F", "E"]>; // 'E'
type C = LastItem<[]>; // never
export {};
