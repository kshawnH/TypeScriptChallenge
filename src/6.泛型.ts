class Animal {
  constructor(public name: string, public age: number) {}
}

class Person {
  constructor(public name: string, public age: number) {}
}
// type IClazz = new (name: string, age: number) => any;

interface IClazz<T> {
  new (name: string, age: number): T;
}

// ts 没有执行呢
function createInstance<T, A, M, B>(
  target: IClazz<T>,
  name: string,
  age: number
) {
  return new target(name, age);
}

// ts 中在使用的时候确定类型 可以通过泛型（传递的是类型）  T K U M N O P
const animal = createInstance(Animal, "Cat", 18);

// 根据提供的数据生成对应长度的数组
function createArray<U>(len: number, val: U) {
  let result = [] as U[]; // 限制了一下

  for (let i = 0; i < len; i++) {
    result.push(val);
  }
  return result;
}
let r1 = createArray(3, 100); // ['abc','abc','abc']
// 2个泛型

// type ISwap = <T, K>(tuple: [T, K]) => [K, T]; // 此类型可以服用

interface ISwap {
  <T, K>(tuple: [T, K]): [K, T];
}

let swap: ISwap = (tuple) => {
  return [tuple[1], tuple[0]];
};
let r2 = swap(["abc", 123]); // -> [123,'abc']

// 泛型使用的时候传递类型，可以直接推导，但是内部调用的时候没有确定类型
type ICallback<T> = (item: T, index: number) => void;
type IforEach = <T>(arr: T[], callback: ICallback<T>) => void;
const forEach: IforEach = (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i); // 这个地方没有执行啊
  }
};
forEach([1, 2, 3, "a", "b", "c"], function (item, index) {});

// 写在前面 就是表示使用类型的时候传参，写到函数的前面意味着调用函数的时候传递参数

//  泛型是有默认值的
// 在使用一些联合类型的时候 会使用泛型

type Union<T = boolean> = T | number | string;
let union: Union<boolean> = true;

// 泛型约束  要求传递的参数必须符合要求， A extends B 要求  A 是 B 的子类型或者同类型

function handle1<T extends string | number>(val: T): T {
  return val;
}
let r = handle1("abc");

interface IWithLen {
  length: number;
}
// 什么叫子， 什么叫父。 对于对象而言儿子的类型结构是比父亲多的

function handle2<T extends IWithLen>(val: T) {
  // 只要泛型中有length 属性即可
  return val.length;
}
handle2({ a: 1, b: 2, length: 123 });

function getVal<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
getVal({ name: "jw", age: 30 }, "name");

// 通过泛型坑位 来占位置

interface IResponse<T> {
  code: number;
  message?: string;
  data: T;
}
interface ILoginData {
  token: string;
  roles: number[];
}
function toLogin(): IResponse<ILoginData> {
  return {
    code: 200,
    data: {
      token: "token",
      roles: [1, 2, 3],
    },
  };
}

// 获取最大值

class MyArray<T> {
  private arr: T[] = [];
  set(val: T) {
    this.arr.push(val);
  }
  getMax(): T {
    let arr = this.arr;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      let current = arr[i];
      current > max ? (max = current) : void 0;
    }
    return max;
  }
}
let myArr = new MyArray<number>();
myArr.set(200);
myArr.set(100);
myArr.set(300);
console.log(myArr.getMax());
export {};
