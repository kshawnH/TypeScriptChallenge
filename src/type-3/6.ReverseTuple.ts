// @ts-nocheck
// 反转元组 ， 反转链表

// E -》 D-》 C-》 B -》A ->

export type ReverseTuple<T extends any[], F extends any[] = []> = T extends [
  infer L,
  ...infer R
]
  ? ReverseTuple<R, [L, ...F]>
  : F;

type A = ReverseTuple<[string, number, boolean]>; // [boolean, number, string]
type B = ReverseTuple<[1, 2, 3]>; // [3,2,1]
type C = ReverseTuple<[]>; // []
export {};
