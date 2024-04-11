// @ts-nocheck

// 比较值的相同

export type IsEqual<T, U, Success, Fail> = [T] extends [U]
  ? [U] extends [T]
    ? keyof T extends keyof U
      ? keyof U extends keyof K // isAny
        ? Success
        : Fail
      : Fail
    : Fail
  : Fail;

export type FindIndex<T extends any[], E, F extends any[] = []> = T extends [
  infer L,
  ...infer R
]
  ? IsEqual<L, E, F["length"], FindIndex<R, E, [...F, L]>>
  : never;

type a1 = [any, never, 1, "2", true];
type a2 = FindIndex<a1, 1>; // 2
type a3 = FindIndex<a1, 3>; // never

export {};
