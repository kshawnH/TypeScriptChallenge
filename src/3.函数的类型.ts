// 函数类型
// 函数function 关键字来定义函数
// 表达式定义 (可以描述变量的类型)
// 函数有入参 和 返回值 （针对这个部分，掌握类型）
// 函数本身的类型

// function sum(a: string, b: string): string {
//   return a + b;
// }

// type ISum = (x: string, y: string) => string;
// let sum: ISum = (a, b) => {
//   return a + b;
// };
// let r = sum("a", "b");

// 1）常见的类型推导的方式
// let name = "jiangwen"; // 根据赋值来进行推导
// let age = 30;

// 2）根据返回值来进行类型推导， 自动推导返回值类型
// function sum(a: string, b: string) {
//   return a + b;
// }

// type ISum = (x: string, y: string) => string;
// let sum: ISum = (a, b) => {
//   return a + b;
// };
// 3）会根据上下文来推导赋予值的类型 (根据位置来进行推导的)
// type ICallback = (a: string, b: number, c: boolean) => void;

// void 表示不关心返回的具体类型
// function fn(callback: ICallback) {}
// fn((x, y, z) => {
//   return {};
// });

// 函数中的可选参数  (增加？ 表示可选 这个只能放到最后)  (增加 = 表示默认值)
let sum = (a: string = "b", b: string): string => {
  b;
  return a + b;
};
sum("a", "c");

// 函数的剩余参数 (剩余运算符 类型是数组)
let total = (...rest: number[]): number => {
  return rest.reduce((memo, current) => ((memo += current), memo));
};

let person = {
  name: "jiangwen",
  age: 30,
};
// 可以采用ts 中的typeof 来获取变量的类型 (ts中this类型需要手动指定。默认是函数的第一个参数)
type IThis = typeof person;
function getVal(this: IThis, key: keyof IThis) {
  // keyof 索引类型插叙 只能查询类型
  return this[key];
}
let r = getVal.call(person, "name");

// 重载 (一般是有限的操作) ts中的重载是伪重载 （类型的重载 而不是逻辑的重载）
function toArray(value: string): string[];
function toArray(value: number): number[];
function toArray(value: number | string): string[] | number[] {
  // 123  [1,2,3] ,  '123' ['1','2','3']
  if (typeof value === "string") {
    return value.split("");
  } else {
    return value.toString().split("").map(Number);
  }
}
let arr = toArray("123");

// 函数中 参数类型，返回值类型，类型推导方式，可选、默认值、this、剩余运算符、 重载
export {};
