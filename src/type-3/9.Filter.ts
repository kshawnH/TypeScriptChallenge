// @ts-nocheck

// 这里比较 只是比较两个类型 ，是不是我要的子类型

export type Filter<T extends any[], U, F extends any[] = []> = T extends [
  infer L,
  ...infer R
]
  ? // 如果需要则放到数组里，不需要返回原来的
    Filter<R, U, [L] extends [U] ? [...F, L] : F>
  : F;

type A = Filter<[1, "BFE", 2, true, "dev"], number>; // [1, 2]
type B = Filter<[1, "BFE", 2, true, "dev"], string>; // ['BFE', 'dev']
type C = Filter<[1, "BFE", 2, any, "dev"], string>; // ['BFE', any, 'dev']

export {};
