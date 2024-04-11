// 鸭子类型检测 结构化类型检测
// 子类型可以赋予给父类型 ， 从结构角度出发。 ts比较的不是类型的名称，而是这个结构上的属性和方法

// 将一个值赋予给另一个值可以产生兼容性
// 1)基础类型的兼容性问题
let obj: {
  toString(): string;
};
let str: string = "jw";
obj = str;
// 从安全的角度出发，你要的属性我都满足. 只能访问已经存在的属性，不存在的无法方法

// 2) 接口的兼容性
interface IPerson {
  name: string;
  age: string;
}
interface IAnimal {
  name: string;
  age: string;
  address: string;
}
let person!: IPerson;
let animal!: IAnimal;
person = animal; // 在后台返回的数据中我们可以预先定义好接口类型。 多的属性也可以赋值给这个类型

// 3) 函数的兼容性
let s1 = (a: string, b: string): string | number => a;
let s2 = (a: string): 100 => 100; // ts 基于位置来推导的
// 要赋予的函数的参数个数只能少不能多。 针对返回值而言赋予的函数的返回值只要是被赋值的子类型即可

s1 = s2;
// function forEach<T>(
//   arr: T[],
//   callback: (item: T, index: number, array: T[]) => void
// ) {
//   for (let i = 0; i < arr.length; i++) {
//     callback(arr[i], i, arr);
//   }
// }
// forEach([1, 2, 3], (item, index) => {});

// 函数的逆变与协变  函数的参数是逆变了，返回值是协变

class Parent {
  house() {}
}
class Child extends Parent {
  car() {}
}
class Grandson extends Child {
  money() {}
}
function fn(callback: (instance: Child) => Child) {
  let child = new Child();
  let ins: Child = callback(child);
  return ins;
}

// 为什么赋予的函数 可以写Parent 但是不能写Grandson. 内部调用的时候传递的是Child，在拿到这个实例的时候不能访问Child访问不到的属性

fn((instance: Parent): Grandson => {
  // return new Parent();
  return new Grandson();
});

let t1: (instance: Child) => void = (instance: Parent) => ""; // 函数的参数是逆变的
// let t2: (instance: Child) => Child = (instance: Child) => new Grandson(); // 函数的返回值是协变的
// 传递的函数 （传父（参数是逆变的） 返子（返回值是协变的））

// 对于函数的兼容性而言，参数个数要少，传递的可以是父类， 返回值可以返回儿子

// 推导公式：
type Arg<T> = (arg: T) => void;
type Return<T> = (arg: any) => T;
type ArgType = Arg<Parent> extends Arg<Child> ? true : false; // 逆变
type ReturnType = Return<Grandson> extends Return<Child> ? true : false; // 协变

interface MyArray<T> {
  concat(...args: T[]): T[]; // 不会对参数进行逆变检测
  //   concat: (...args: T[]) => void; // 这种方式会检测逆变, 这种方式不推荐
}

let arr1!: MyArray<Parent>;
let arr2!: MyArray<Child>;
// arr1 -> (...args: Parent[]): Parent[];
// arr2 -> (...args: Child[]): Child[];

arr1 = arr2;

// 对于类而言，有子类可以重写父类
// strictFunctionTypes 开启后就变成了双向协变，参数和返回值都是协变的

// ts 比较的是结构，结构一致即可
interface TT<T> {}

let o1!: TT<string>;
let o2!: TT<number>;
o2 = o1;

//  枚举不具备兼容性问题
enum E1 {}
enum E2 {}

let e1!: E1;
let e2!: E2;

// e2 = e1;

// 类的兼容性
class A {
  public name!: string;
}
class B {
  public name!: string;
  public age!: string;
}
let b: A = new B(); // 比较的是属性， 不符合就不兼容. 如果类中存在私有属性或者受保护的属性，则不能兼容

// ts 比较类型结构的时候比较的是属性和方法
// 如果属性和方法都满足则兼容，有一些比较特殊

// 基础类型和对象类型的兼容，  接口的兼容， 泛型的兼容，枚举的兼容， 类的兼容

// 在其他语言中存在标称类型 （根据名称来区分类型） ，通过交叉类型实现标称类型

type Nominal<T, K extends string> = T & { __tag: K };
type BTC = Nominal<number, "btc">;
type USDT = Nominal<number, "usdt">;
let btc: BTC = 1000 as BTC;
let usdt: USDT = 1000 as USDT;
function getVal(val: BTC) {
  return val;
}
getVal(btc);

export {};
