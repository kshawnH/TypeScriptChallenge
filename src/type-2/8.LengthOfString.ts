// @ts-nocheck
// 计算字符串字面量类型的长度

type LengthOfString<
  T extends string,
  A extends any[] = []
> = T extends `${infer L}${infer R}`
  ? LengthOfString<R, [...A, L]>
  : A["length"];
type A = LengthOfString<"BFE.dev">; // 7
type B = LengthOfString<"">; // 0

export {};
