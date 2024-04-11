// @ts-nocheck

export type Push<T extends any[], C> = [...T, C];
type A = Push<[1, 2, 3], 4>; // [1,2,3,4]
type B = Push<[1], 2>; // [1, 2]
export {};
