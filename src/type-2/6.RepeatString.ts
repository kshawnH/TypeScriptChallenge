export type RepeatString<
  T extends string,
  C extends number,
  A extends any[] = [],
  F extends string = ""
  //    元组使用null 来撑开的记录循环次数
> = C extends A["length"]
  ? F
  : RepeatString<T, C, [...A, undefined], `${F}${T}`>;

type A = RepeatString<"a", 3>; // 'aaa'
type B = RepeatString<"a", 0>; // ''
export {};
