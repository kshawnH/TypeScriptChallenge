// @ts-nocheck
// 移除元组类型中的第一个类型

export type Shift<T extends any[]> = T extends [infer L, ...infer R] ? R : [];
type A = Shift<[1, 2, 3]>; // [2,3]
type B = Shift<[1]>; // []
type C = Shift<[]>; // []
export {};
