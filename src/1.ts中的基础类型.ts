// ts 学习的就是类型 类型是核心
// ts 中的类型分类: 内置类型 (DOM、Promise 原始方法) 基础类型、 高级类型、 自定义类型

// ts中 ：后面的都是类型   = 后面的都是值 （在js语法中）

// 1.ts 一切从安全的角度来触发， 看能不能赋值 就看安全不安全
// 2.ts 在编写的时候 代码是没有执行的
// 3.ts 还有自动的类型推导，不用见到变量就写类型，而是推断的不正确，我们才需要自己来编写

let name: string = "jiangwen";
let age: number = 30;
let handsome: boolean = true;

// 大写的类型都是装箱类型， 包装类

let arr1: number[] = [1, 2, 3];
let arr2: string[] = ["1", "2", "3"];
let arr3: (number | string)[] = [1, "2", 3];
let arr4: Array<number | string> = [1, "2", 3];

// 元组 规定长度和存储的类型
let tuple1: [string, number, boolean] = ["jiangwen", 30, true];

// 添加只能添加元组中已经存在的类型
// tuple1.push("abc"); // 为了安全，因为不确定这个值是否存在
// tuple1[3]

// 枚举类型 , 自带类型的对象, 自动增长. 数字类型的枚举 可以反举
const enum USER_ROLE {
  USER,
  ADMIN = 6,
  MANAGER,
  OTHER = "ABC", // 异构枚举
}
// 如果不需要对象，如果只是使用值，可以直接采用常量枚举，否则用普通枚举
console.log(USER_ROLE.USER);

// null 和 undefiend
// 任何类型的子类型， 一般情况下 都是严格模式 null和undefiend 只能赋予给 null 和 undefind

// void  代表函数的返回值为空，只在函数中使用

function fn(): void {}

// never 类型
// 任何类型的子类型
function fn1(): never {
  //   throw new Error();
  while (true) {}
}

// 类型保护，保障程序的不缺失  完整性保护（保护代码的完整性）

// 针对不同的类型做不同处理
function validate(val: never) {}
function getResult(strgOrNumOrBool: string | number | boolean) {
  // typeof 可以有收窄的功能 js
  if (typeof strgOrNumOrBool === "string") {
    // 对string处理的逻辑
    return strgOrNumOrBool;
  }
  if (typeof strgOrNumOrBool === "number") {
    // 对number处理的逻辑
    return strgOrNumOrBool;
  }
  if (typeof strgOrNumOrBool === "boolean") {
    // 对number处理的逻辑
    return strgOrNumOrBool;
  }
  // js...
  validate(strgOrNumOrBool);
}

let union: string | number | boolean | never; // never 和其他类型做联合类型最终是不显示的

// object 对象类型
// {} , Object 不采用，偶尔会使用 {} 表示对象上无任何属性。 都可以将任何值赋予给 {} 或者 Object
// object 非基础类型
const create = (target: object) => {};
create(function () {});
create({});
create([]);

// Symbol BigInt es6 新增的
let s1: symbol = Symbol.for("1");
let s2: symbol = Symbol.for("1");

console.log(s1 === s2);
// let b1: bigint = BigInt(Number.MAX_SAFE_INTEGER + 100);

// any 任何类型  anyScript 有的时候我们要对类型做转化，无法直接转化，你认为这个值可以赋予给任何类型了。
// 出问题自己管

let name2; // 声明一个变量 不给类型默认就是any类型
//  ts 会根据你赋予的值来进行类型提导

// string number boolean null undefined array tuple never object symbol bigint any void
export {};
