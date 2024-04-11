// 5.模式匹配类型，推断函数类型中参数的最后一个参数类型

function sum(a: string, b: string, c: number) {}

// 约束参数是一个函数, 只有约束的作用
// 构建推断的位置即可
type LastParamater<T extends (...args: any[]) => any> = T extends (
  ...args: [...infer X, infer Last]
) => any
  ? Last
  : never;

// 直接取出参数，
// type LastParamater<T extends (...args: any[]) => any> = Parameters<T> extends [
//   ...infer X,
//   infer Last
// ]
//   ? Last
//   : never;

type X = LastParamater<typeof sum>;

export {};
