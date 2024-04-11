// 1.接口不能有具体的实现， 可以用于描述 函数、 混合类型 、 对象 、 类

// type IFullname = {
//   firstname: string;
//   lastname: string;
// };
// interface IFullname {
//   firstname: string;
//   lastname: string;
// }
// type IFn = (obj: IFullname) => string;
// const fullname: IFn = ({ firstname, lastname }: IFullname): string => {
//   return firstname + lastname;
// };
// fullname({ firstname: "jiangwen", lastname: "wen" });
//  type 和 interface的区别
// 1.如果只是用来描述结构我们采用interface
// 2.如果涉及到联合类型，则只能使用type来进行声明
// 3.type 不能被扩展， interface 是可以扩展
// 4.type 不能重名， interface 重名可以合并
// 5.type 在后续的学习中可以使用循环和条件， interface 不行。
// 其他情况下无所谓，可以互换 （函数类型一般采用type来声明）

// 可以通过接口来声明混合类型
interface IFn {
  (): number; // 函数
  count: number; // 属性
}
const click: IFn = () => {
  return click.count++; // 自定义属性
};
// 为了防止这个click函数 被重新赋值，let 是可以修改的，如果用const就不一样了
click.count = 0;

// 一般情况下 使用接口大概率都是描述对象了
/*
interface IVeg {
  // 接口中声明的都是抽象的，而且必须要实现
  readonly color: string;
  size: number;
  taste?: "sweet" | "sour"; // 可选属性
}
const tomato: IVeg = {
  color: "red",
  size: 20,
  //   taste: "sour",
};
// tomato.color = "green"; // 仅读属性不能被随意修改
*/

interface IVeg {
  readonly color: string;
  size: number;
  taste: "sweet" | "sour"; // 可选属性
  [key: string]: any; // 任意属性，key类型为string时， 可以赋予number ， string ， symbol
}
// interface IVeg {
//     a?: 1;
// }
// interface IV extends IVeg {
//   a?: 1;
// }

const tomato: IVeg = {
  color: "red",
  size: 20,
  taste: "sour",
  a: 1, // 如何解决多的属性，让他可以赋予给IVeg
  1: 199,
  [Symbol()]: "abc",
};
// 1.如果对象中的属性 多于接口可以直接采用断言的方式来赋值
// 2.可以基于接口的特性写一个同名的接口
// 3.产生新类型, 通过继承原有属性的方式
// 4.通过任意类型来扩展 （常用的用于一部分格式固定，一部分不固定）
// 5.类型兼容
// 6.交叉类型& 。。。

interface Person {
  name: string;
  [key: string]: any; // 值只能是string
  company: {
    n: 100;
  };
}
let p: Person = {
  name: "jiangwen",
  age: 30,
  company: {
    n: 100,
  },
};
// 数字索引
interface IArr {
  [key: number]: any; // 值只能是string
}
let arr1: IArr = {
  // 限制索引只能是数字
  0: 1,
  1: 2,
  2: 3,
};
let arr2: IArr = [1, 2, 3];

// 通过索引访问符，可以取值的类型
type PersonNameType = Person["name"];
type PersonAnyType = Person[string];
type PersonNType = Person["company"]["n"];

// keyof 取一个对象中key的集合     valueOf （自己实现） 取值的类型集合

interface ICar {
  color: string;
  a: 1;
  b: 2;
}
type ValueOf = ICar[keyof ICar]; // 通过索引操作符获取值的集合

// 接口 readonly ?  任意类型 [k:string]:any   接口[属性key]

interface ChineseSpeakable {
  speakChinese(): void;
}
interface EnglishSpeakable {
  speakEnglish(): void;
}
class Speak implements ChineseSpeakable, EnglishSpeakable {
  speakEnglish(): void {
    throw new Error("Method not implemented.");
  }
  speakChinese(): void {
    throw new Error("Method not implemented.");
  }
}

// 可以被类实现多个接口， 描述类中的原型方法 和 实例属性

// interface MySpeak extends Speak {
//   // 可以通过接口基于类来进行扩展
// }

export {};
