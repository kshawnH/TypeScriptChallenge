// @ts-nocheck
// ----------------------

// 1.可以将unknown 赋予给any

// type IsAny<T> = unknown extends T
//   ? [T] extends ["abc"]
//     ? true
//     : false
//   : false;

type IsAny<T> = 0 extends 1 & T ? true : false;
type A = IsAny<string>; // false
type B = IsAny<any>; // true
type C = IsAny<unknown>; // false
type D = IsAny<never>; // false

export {};
