// 获取字符串字面量中的第一个字符;

export type FirstChar<T extends string> = T extends `${infer L}${infer R}`
  ? R
  : never;

type A = FirstChar<"BFE">; // 'B'
type B = FirstChar<"dev">; // 'd'
type C = FirstChar<"">; // never
type D = FirstChar<"A">; //  A + ""
export {};
