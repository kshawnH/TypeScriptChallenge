// 正常判断类型的时候 可以通过 A extends B   A是B的子类型
// 条件分发 （分发特性是默认开启的）

// 1.A类型是通过泛型传入的
// 2.A类型如果是联合类型会进行分发
// 3.泛型参数A 必须是完全裸露的, 才具备分发的能力 (只要让A 不是裸类型就会丧失这种分发机制)
// 裸类型就是只有自己，自己没和别人发生关系

interface Bird {
  name: "鸟";
}
interface Sky {
  name: "天";
}
interface Fish {
  name: "鱼";
}
interface Water {
  name: "水";
}
type Conditional1 = Fish | Bird extends Fish ? Water : Sky; // 此情况并没有产生分发
type Conditional2<T> = T extends Fish ? Water : Sky;

// Conditional2<Fish>  -> Water
// Conditional2<Bird>  -> Sky
type R1 = Conditional2<Fish | Bird>; // 将联合类型中的每一项单独的进行比较

// 默认情况下 有些时候我们需要关闭这种分发能力，会造成判断不准确

type Conditional3<T, U> = T extends U ? true : false;

// true | false -> boolean
type R2 = Conditional3<1 | 2, 1>;

// 分发就是挨个比较，不想分发就是将结果运算后再比较

// 禁用分发
type NoDistribute<T> = T & {}; // 只是为了让这个T 产生一个类型而已
type Conditional4<T, U> = NoDistribute<T> extends U ? true : false;
type R3 = Conditional4<1 | 2, 1>;

type Conditional5<T, U> = [T] extends [U] ? true : false;
type R4 = Conditional5<1 | 2, 1>;

// 条件判断还有一些注意事项
type IsNever<T> = NoDistribute<T> extends never ? true : false;

type R5 = IsNever<never>; // never直接比较的时候无法返回正确的结果

// 我们在进行类型父子关系的比较时，默认情况下都应该关闭分发

// 通过条件类型，ts自己实现了一些常见的内置类型
// 我们在使用ts的时候需要安装typescript模块 （包含了很多的内置类型）

// 内置1： Extract
// type MyExtract<T, U> = T extends U ? T : never;
// T 和 U 没有硬性的关系
type R6 = Extract<1 | 2 | 3, 1 | 2 | 4>; // 求差集  用第一个和第二个类型的公共部分

// type MyExclude<T, U> = T extends U ? never : T;
type R7 = Exclude<1 | 2 | 3 | 4 | 5, 2 | 4>;

// type MyExtract<T, U> = T extends null | undefined ? never : T;

type NonNullable<T> = T & {};
type R8 = NonNullable<1 | 2 | null | undefined>;

// 可以求联合类型的交集和差集  Extract, Exclude  后续可以求对象的属性的交集和差集

// infer 类型推断
// infer 可以在条件类型中提取类型的某一个部分， 在使用的时候想获取什么类型就将他写在什么“地方”加一个变量可以自动的来推导.类型推导都是基于位置的

// 1.获取函数的返回值类型
function getObj(name: string, age: number) {
  return { name, age };
}

// type ReturnType<T extends (...args: any[]) => any> = T extends (
//   ...args: any[]
// ) => infer R
//   ? R
//   : never;

// 泛型约束的目的是限制泛型传入的，后面的条件是逻辑
type R9 = ReturnType<typeof getObj>; // 使用infer 需要先创造一个条件才可以

type Parameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

//   // 泛型约束的目的是限制泛型传入的，后面的条件是逻辑
type R10 = Parameters<typeof getObj>; // 使用infer 需要先创造一个条件才可以

class A {
  constructor(name: string, age: number) {}
}

// type ConstructorParameters<T extends abstract new (...args: any[]) => any> =
//   T extends abstract new (...args: infer P) => any ? P : never;

type R11 = ConstructorParameters<typeof A>; // 取类本身的类型判断构造函数的参数

// type InstanceType<T extends abstract new (...args: any[]) => any> =
//   T extends abstract new (...args: any[]) => infer P ? P : never;
type R12 = InstanceType<typeof A>;

function createInstance<T extends new (...args: any[]) => any>(
  target: T,
  ...args: ConstructorParameters<T>
): InstanceType<T> {
  return new target(...args);
}

class MyPerson {
  constructor(public name: string, public age: number) {}
}
let r = createInstance(MyPerson, "jiagwen", 30);

// infer中实现了很多的内置类型 （ReturnType, Paramaters, ConstructorParameters,InstanceType）

// swap

type Swap<T> = T extends [infer A1, infer A2] ? [A2, A1] : never;
type R13 = Swap<["jw", 30]>; // 30 , 'jw'

// 头尾交换

type SwapHeadTail<T> = T extends [infer H, ...infer N, infer T]
  ? [T, ...N, H]
  : never;
type R14 = SwapHeadTail<[1, 2, 3, 4, 5, 6, 7]>;

// promise 如果返回的是一个promise 会不停地解析这个promsie

type PromiseReturnValue<T> = T extends Promise<infer P>
  ? PromiseReturnValue<P>
  : T;

type R15 = PromiseReturnValue<Promise<Promise<Promise<100>>>>;

// 通过infer来实现递归推导

// 将元组转化成联合类型 [number,boolean,string] => number | boolean | string

type ElementToUnion<T> = T extends Array<infer E> ? E : never;
// 根据位置推导 [number, boolean, string]  -> [E]
type TupleToArray = ElementToUnion<[number, boolean, string]>;

// 重构类型的结构  T & K

interface IAddress {
  n: 501;
  x: 100;
  y: 100;
}
interface Person {
  name: string;
  age: number;
  address: IAddress;
}
// type Partial<T> = {
//   // for key in name | age
//   [K in keyof T]?: T[K]; // 通过索引查询拿到值
// };

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
// for key in name | age
type PartialPerson = DeepPartial<Person>; // 循环所有的属性 增加可选参数
let person1: PartialPerson = {
  name: "jiangwen",
  address: {
    n: 501,
  },
};

// Required 只有第一层, 就是将可选属性去掉
type Required<T> = {
  [K in keyof T]-?: T[K];
};
let person2: Required<PartialPerson> = {
  name: "jiangwen",
  age: 30,
  address: {},
};

type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};
type Mutate<T> = {
  -readonly [K in keyof T]: T[K];
};
let person3: Mutate<Readonly<Required<PartialPerson>>> = {
  name: "jiangwen",
  age: 30,
  address: {},
};

person3.name = "abc";
// 内置类型有： 基于循环（映射类型  xxx  in  key）
// Partial Required Readonly 属性修饰符    ？  readonly
// Pick Omit Record

// Pick Omit  重构对象的结构 可以采用这两个类型

type Pick<T, K extends keyof T> = {
  [Key in K]: T[Key];
};
type PickPerson = Pick<Person, "name" | "age">;
let person4: PickPerson;

// 在很多属性中挑选需要的， 在很多属性中排出不需要的

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type OmitPerson = Omit<Person, "address" | 0 | 1>;
let person5: OmitPerson;
// 映射类型 Pick + Omit 配合 Extract 和 Exclude 可以实现各种各样的类型

// 针对这种情况 应该将B 有的属性 在A 里面移除掉
function mixin<T extends object, K extends object>(
  a: T,
  b: K
): Omit<T, keyof K> & K {
  return { ...a, ...b };
}
let x = mixin(
  { name: "jiangwen", age: 30, c: 3 },
  { name: 123, age: 30, b: 2 }
);
type Computed<T> = {
  // 通过这种创建一个新对象的方式更直观的看结果
  [K in keyof T]: T[K];
};
type nameType = Computed<typeof x>;

// keyof 取key
// typeof 取类型的
// 索引查询 []
// in 循环的
// extends 条件

// 只想要key -> value的格式 可以采用 Record类型

// 一些映射类型可以采用record 会合理一些
type Record<K extends keyof any, V> = { [P in K]: V }; // 就是普通的对象接口可以传入key的类型以及值的类型
// === 任意接口
let person6: Record<string, any> = { abc: 123 };

function map<R, K, T extends keyof any>(
  obj: Record<T, K>,
  callback: (value: K, key: T) => R
) {
  let result = {} as Record<T, R>;
  for (let key in obj) {
    result[key] = callback(obj[key], key);
  }
  return result;
}
let mapResult = map({ name: "jiangwen", age: 30 }, (value, key) => {
  return value; // name-> 'abc' , age:'abc'
});

// 逆变 -》 协变

export {};
