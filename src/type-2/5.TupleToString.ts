// 将字符串类型的元素转换为字符串字面量类型
export type TupleToString<T extends any[], F extends string = ""> = T extends [
  infer L,
  ...infer R
]
  ? TupleToString<R, `${F}${L & string}`>
  : F;
type A = TupleToString<["a", "b", "c"]>; // 'abc'
type B = TupleToString<["a"]>; // 'a'
type C = TupleToString<[]>; // ''
export {};
