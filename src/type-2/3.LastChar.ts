// 获取字符串字面量中的最后一个字符

// 特点就是不停的去右边的部分，取出第一个，而且每次取之前保存上一次的，最终不满足条件返回上一次的Left即可
export type LastChar<T, F = never> = T extends `${infer L}${infer R}`
  ? LastChar<R, L>
  : F;
type A = LastChar<"BFE">; // 'E'
type B = LastChar<"dev">; // 'v'
type C = LastChar<"">; // never
export {};
