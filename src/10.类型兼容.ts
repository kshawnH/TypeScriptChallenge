// 我们知道了 条件运算符 就可以掌握ts中的兼容性 以及类型的层级
// 兼容性 ： 就是可以将一个值赋予给某个值
// 类型层级： 低的层级可以赋予给高的层级

// 上面是理论
type R1 = "abc" extends string ? true : false;
type R2 = 123 extends number ? true : false;
type R3 = true extends boolean ? true : false;

// 下面是实战
let r1: string = "abc";
let r2: number = 123;

type R4 = "a" extends "a" | "b" | "c" ? true : false;
type R5 = 1 extends 1 | 2 | 3 ? true : false;
type R6 = true extends true | false ? true : false;

let r4: "a" | "b" | "c" = "a";

type R7 = string extends String ? true : false;
type R8 = number extends Number ? true : false;
type R9 = boolean extends Boolean ? true : false;
type R10 = boolean extends Object ? true : false;

type R11 = Object extends any ? true : false;
type R12 = Object extends unknown ? true : false;

type R13 = never extends "abc" ? true : false;
// never 是最新的类型
// 字面类型可以赋予给字面量的联合类型
// 字面量类型可以赋予给基础类型
// 基础类型是包装类型的子类型
// any unknwon 是最大类型

// never < 字面量 < 字面量联合类型 | 字面量类型 < 基础数据类型 < 包装类型 < Object < any | unknown

type R14 = any extends 1 ? true : false; // true | false -> boolean
// 针对any 来说 永远返回的结果是成功和失败的联合类型
type R15 = unknown extends "abc" ? true : false; // false
type R16 = any extends any ? true : false; // 自己和自己比不会出错

// 类型层面上的，低类型 可以赋予高类型
// 从结构上考虑的   交叉类型 可以赋予 交叉前的类型
// {} (字面量，也是一个空对象)  object（只能赋予对象）  Object （万物皆对象）
type R17 = {} extends object ? true : false;
type R18 = {} extends Object ? true : false;

// 结构上考虑
type R19 = object extends {} ? true : false;
type R20 = Object extends {} ? true : false;

// ts 默认 小的object 和 Object 都可以相互赋值
type R21 = Object extends object ? true : false;
type R22 = object extends Object ? true : false;

// 结构上是不是比你多，比你多的就兼容
// 看级别， 我的级别比你低就可以赋予给你
export {};
