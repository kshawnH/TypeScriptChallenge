// 判断是否为没有属性的对象类型{}

type IsEmptyType<T> = keyof T extends never
  ? "123" extends T
    ? unknown extends T // unknown 也不是空
      ? false
      : true
    : false // 排除对象object的情况
  : false;
type A = IsEmptyType<string>; // false
type B = IsEmptyType<{ a: 3 }>; // false
type C = IsEmptyType<{}>; // true
type D = IsEmptyType<any>; // false

type E = IsEmptyType<object>; // false
type F = IsEmptyType<Object>; // false

type G = IsEmptyType<unknown>; // false

export {};
