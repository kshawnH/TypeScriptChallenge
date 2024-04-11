// @ts-nocheck

export type Repeat<
  T,
  C extends number,
  F extends any[] = []
> = C extends F["length"] ? F : Repeat<T, C, [...F, T]>;
type A = Repeat<number, 3>; // [number, number, number]
type B = Repeat<string, 2>; // [string, string]
type C = Repeat<1, 1>; // [1]
type D = Repeat<0, 0>; // []

export {};
