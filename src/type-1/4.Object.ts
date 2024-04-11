// 4.对象的交、差、并、补

type A = {
  name: string;
  age: number;
  address: number;
};

type B = {
  name: number;
  male: boolean;
  address: boolean;
};

// **交集**
type ObjectInter<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U>
>;
type R1 = ObjectInter<B, A>;

// **差集**
type ObjectDiff<T extends object, U extends object> = Pick<
  T,
  Exclude<keyof T, keyof U>
>;
type R2 = ObjectDiff<B, A>;

// **补集, 补级就是差集，要求有父子关系**
type ObjectCom<T extends U, U extends object> = Pick<
  T,
  Exclude<keyof T, keyof U>
>;
// type R3 = ObjectCom<B, A>;
// **重写**
// 以后面的类型为准，在加上以前比现在多的类型 mixin

// 有后面存在的类型，覆盖掉之前的类型，之前多的还是要保留的
type Overwrite<T extends object, U extends object> = ObjectInter<U, T> &
  ObjectDiff<T, U> &
  ObjectDiff<U, T>; // 看意愿保留需要的属性

type Computed<T> = {
  [K in keyof T]: T[K];
};
type R4 = Computed<Overwrite<A, B>>;
export {};
