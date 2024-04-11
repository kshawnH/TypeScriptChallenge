// 联合类型转换为元组类型

// 这是一道，体验题

// 我们需要将 联合类型转化成 函数的联合类型 函数的联合类型变成函数的交叉类型

type Transform<T> = boolean extends T
  ? boolean // 因为boolean 类型也会进行分发， 遇到联合类型中包含boolean 直接返回
  : (T extends any ? (a: (p: T) => any) => any : never) extends (
      a: infer R
    ) => any
  ? R extends (a: infer R2) => any
    ? R2
    : never
  : never;

// 1.先搞成联合类型 a =>  (p:1)=>any | (p:2)=> any | (p:3)=>any
// 2.在推断成交叉类型  R =>  ((p: 1) => any) & ((p: 3) => any) & ((p: 2) => any)

type UnionToTuple<T, A = Transform<T>> = [T] extends [never]
  ? []
  : [...UnionToTuple<Exclude<T, A>>, A]; // 我们先拿出了一个来， 拿出后排除掉拿出来的，继续转化，直到没有

type a1 = UnionToTuple<1 | 2 | 3>; // [1,2,3]
type a2 = UnionToTuple<1 | 2 | boolean | string>; // [1,2,boolean,string]

// type x = ((p: 1) => any) & ((p: boolean) => any) & ((p: 3) => any);

// type Paramater<T> = T extends (p: infer P) => any ? P : never;

// type R = Paramater<x>;

// 不停的去函数的交叉类型中获取，将结果存入到元组中

export {};
