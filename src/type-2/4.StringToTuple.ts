// 字符串转换为元组类型

// 不停的取字符串的每一项，将其放在数组中，最终返回结果
export type StringToTuple<
  T,
  F extends any[] = []
> = T extends `${infer L}${infer R}` ? StringToTuple<R, [...F, L]> : F;

type A = StringToTuple<"BFE.dev">; // ['B', 'F', 'E', '.', 'd', 'e','v']
type B = StringToTuple<"">; // []
export {};
