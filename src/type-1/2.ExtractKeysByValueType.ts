// 2.根据值类型（挑选/忽略）对象类型的属性

interface Person {
  name: string;
  age: number;
  address: string;
}

// 如何通过值拿到对应的key （先找到所有的值是string）
// 将类型相同的进行映射 {name:"name",age:"never",address:"address"}
// name | never | address  -> name | address
// Pick 这个属性即可

// 如何判断两个类型是否相同 （类型层级，结构）

type isEuqal<T, K, Success, Fail> = [T] extends [K]
  ? [K] extends [T] // 从类型的角度触发，两个类型完全一致 互相可以extends 才可以
    ? Success
    : Fail
  : Fail;

type ExtractKeys<T extends object, U, O = false> = {
  // 通过公共的方法来进行判断
  [K in keyof T]: isEuqal<
    T[K],
    U,
    isEuqal<O, true, never, K>,
    isEuqal<O, true, K, never>
  >;
}[keyof T];

type PickKeysByValue<T extends Object, U> = Pick<T, ExtractKeys<T, U>>;

// 根据ExtractKeys传递一个参数来看是否是忽略的
type OmitKeysByValue<T extends Object, U> = Pick<T, ExtractKeys<T, U, true>>;

type p2 = OmitKeysByValue<Person, string>;

// 模板字符串 里面有一个很重要的功能， 重映射
type PickKeysByValue2<T, U> = {
  // 直接将对象的属性就给忽略掉了

  // 循环对象的key ，看值的类型是否相同，如果相同留下这个key
  [K in keyof T as isEuqal<T[K], U, K, never>]: T[K];
};
type p3 = PickKeysByValue2<Person, string>;

export {};
